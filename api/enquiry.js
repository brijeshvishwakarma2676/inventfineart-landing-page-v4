// Vercel Function: POST /api/enquiry (v3 spec §5, kept in v4).
// Validates the form, checks Turnstile (when it is configured), emails the enquiry with its attachment to
// ENQUIRY_TO via Resend, and sends the customer an auto-reply.
// Env: RESEND_API_KEY, ENQUIRY_TO (comma-separated), ENQUIRY_FROM (verified sender),
//      TURNSTILE_SECRET + VITE_TURNSTILE_SITE_KEY (set both or neither).
import { Resend } from 'resend';
import { lines } from '../app/data/lines.js';

const MAX_FILE = 4 * 1024 * 1024;
const FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
// slug → name, from the same data the site uses (one list to keep in step).
// Service slugs, plus the old line slugs (e.g. grc-grilles from a cached form) mapped to their service now
const PRODUCTS = Object.fromEntries(lines.flatMap((l) => [[l.slug, l.name], ...l.legacy.map((old) => [old, l.name])]));

const json = (body, status = 200) => Response.json(body, { status });
const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function validate(form) {
  const v = (k, max = 200) => String(form.get(k) ?? '').trim().slice(0, max);
  const data = {
    name: v('name'),
    phone: v('phone', 30),
    email: v('email'),
    city: v('city'),
    role: v('role', 60),
    products: form
      .getAll('products')
      .map(String)
      .filter((p) => p in PRODUCTS),
    code: v('code', 20),
    quantity: v('quantity'),
    message: v('message', 3000),
    page: v('page', 120),
    consent: v('consent', 5) === 'true',
  };
  const errors = {};
  if (data.name.length < 2) errors.name = 'required';
  const digits = data.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 13) errors.phone = 'invalid';
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'invalid';
  if (!data.consent) errors.consent = 'required';

  const file = form.get('file');
  if (file && typeof file === 'object' && file.size > 0) {
    if (!FILE_TYPES.includes(file.type)) errors.file = 'type';
    else if (file.size > MAX_FILE) errors.file = 'size';
    else data.file = file;
  }
  return { data, errors };
}

async function turnstileOk(token, ip) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // not configured: honeypot only
  if (!process.env.VITE_TURNSTILE_SITE_KEY) {
    // Without the site key the form never shows the widget, so no visitor could pass: don't block everyone.
    console.error('enquiry: TURNSTILE_SECRET is set but VITE_TURNSTILE_SITE_KEY is not; skipping the Turnstile check');
    return true;
  }
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
  });
  const out = await res.json().catch(() => ({}));
  return out.success === true;
}

function rows(data) {
  return [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email],
    ['City', data.city],
    ['I am a', data.role],
    ['Interested in', data.products.map((p) => PRODUCTS[p]).join(', ')],
    ['Design code', data.code],
    ['Quantity / size', data.quantity],
    ['Message', data.message],
    ['Sent from page', data.page],
  ].filter(([, value]) => value);
}

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  // Honeypot filled in: pretend success, send nothing.
  if (String(form.get('website') ?? '').trim()) return json({ ok: true });

  const { data, errors } = validate(form);
  if (Object.keys(errors).length) return json({ ok: false, error: 'invalid', fields: errors }, 400);

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (!(await turnstileOk(String(form.get('cf-turnstile-response') ?? ''), ip))) {
    return json({ ok: false, error: 'captcha' }, 400);
  }

  const { RESEND_API_KEY, ENQUIRY_TO } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO) return json({ ok: false, error: 'not_configured' }, 503);

  const resend = new Resend(RESEND_API_KEY);
  const from = process.env.ENQUIRY_FROM || 'Invent Fine Art <onboarding@resend.dev>';
  const table = rows(data);
  const html =
    `<h2 style="font-family:Georgia,serif">New enquiry from the website</h2>` +
    `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">` +
    table
      .map(([k, val]) => `<tr><td style="color:#5e5850;vertical-align:top"><b>${esc(k)}</b></td><td>${esc(val).replace(/\n/g, '<br>')}</td></tr>`)
      .join('') +
    `</table>`;
  const text = table.map(([k, val]) => `${k}: ${val}`).join('\n');
  const subject = `New enquiry: ${data.code || data.products.map((p) => PRODUCTS[p]).join(', ') || 'General'} from ${data.name}`;

  const attachments = data.file
    ? [{ filename: data.file.name || 'attachment', content: Buffer.from(await data.file.arrayBuffer()) }]
    : undefined;

  const { error } = await resend.emails.send({
    from,
    to: ENQUIRY_TO.split(',').map((s) => s.trim()),
    replyTo: data.email || undefined,
    subject,
    html,
    text,
    attachments,
  });
  if (error) return json({ ok: false, error: 'send_failed' }, 502);

  if (data.email) {
    // The auto-reply is a courtesy; a failure here must not fail the enquiry.
    await resend.emails
      .send({
        from,
        to: data.email,
        subject: 'We have received your enquiry | Invent Fine Art',
        text:
          `Dear ${data.name},\n\nThank you for contacting Invent Fine Art. We have received your enquiry` +
          `${data.code ? ` about design ${data.code}` : ''} and our team will get back to you shortly.\n\n` +
          `If you have drawings or photos to add, simply reply to this email.\n\nInvent Fine Art`,
      })
      .catch(() => {});
  }

  return json({ ok: true });
}
