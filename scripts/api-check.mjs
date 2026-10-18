// Offline checks of api/enquiry.js: validation, honeypot, file limits, Turnstile set-ups, and the email it sends.
// Resend is not called: global fetch is intercepted, so the payloads sent to api.resend.com can be inspected.
// The live test with the real inbox happens on the Vercel preview (SITE-V4-PLAN.md Phase 8).
// Usage: node scripts/api-check.mjs
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

const sent = [];
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init = {}) => {
  const u = String(url);
  if (u.startsWith('https://api.resend.com')) {
    sent.push(JSON.parse(init.body));
    return new Response(JSON.stringify({ id: `test-${sent.length}` }), { status: 200, headers: { 'content-type': 'application/json' } });
  }
  if (u.startsWith('https://challenges.cloudflare.com')) {
    const body = new URLSearchParams(String(init.body));
    return new Response(JSON.stringify({ success: body.get('response') === 'good-token' }), { status: 200 });
  }
  return realFetch(url, init);
};
const env = (vars) => {
  for (const k of ['RESEND_API_KEY', 'ENQUIRY_TO', 'ENQUIRY_FROM', 'TURNSTILE_SECRET', 'VITE_TURNSTILE_SITE_KEY']) delete process.env[k];
  Object.assign(process.env, vars);
};
const { POST } = await import('../api/enquiry.js');
const form = (fields = {}, file) => {
  const f = new FormData();
  const base = { name: 'Asha Rao', phone: '+91 98765 43210', email: 'asha@example.com', consent: 'true', page: '/sculptures', code: 'IFA-SC-012', ...fields };
  for (const [k, v] of Object.entries(base)) for (const x of [].concat(v)) f.append(k, x);
  if (file) f.append('file', file);
  return f;
};
const post = async (f, headers = {}) => {
  const res = await POST(new Request('http://localhost/api/enquiry', { method: 'POST', body: f, headers }));
  return { status: res.status, body: await res.json() };
};
const silence = console.error;

env({});
let r = await post(form({ website: 'spam.example' }));
check('honeypot filled: pretends success, sends nothing', r.status === 200 && r.body.ok && sent.length === 0);
r = await post(form({ name: 'A', phone: '123', consent: 'false' }));
check('invalid fields: 400 with the field list', r.status === 400 && r.body.fields?.name && r.body.fields?.phone && r.body.fields?.consent, JSON.stringify(r.body));
r = await post(form({}, new File(['x'], 'drawing.gif', { type: 'image/gif' })));
check('wrong file type: 400', r.status === 400 && r.body.fields?.file === 'type');
r = await post(form({}, new File([new Uint8Array(4 * 1024 * 1024 + 1)], 'big.pdf', { type: 'application/pdf' })));
check('file over 4 MB: 400', r.status === 400 && r.body.fields?.file === 'size');
r = await post(form());
check('no email service configured: 503 not_configured', r.status === 503 && r.body.error === 'not_configured');

env({ TURNSTILE_SECRET: 'secret' });
console.error = () => {};
r = await post(form());
console.error = silence;
check('Turnstile secret without site key: not blocked (logs an error)', r.status === 503 && r.body.error === 'not_configured', JSON.stringify(r.body));
env({ TURNSTILE_SECRET: 'secret', VITE_TURNSTILE_SITE_KEY: 'site', RESEND_API_KEY: 're_test', ENQUIRY_TO: 'inbox@example.com' });
r = await post(form());
check('Turnstile configured, no token: 400 captcha', r.status === 400 && r.body.error === 'captcha');
r = await post(form({ 'cf-turnstile-response': 'bad-token' }));
check('Turnstile configured, bad token: 400 captcha', r.status === 400 && r.body.error === 'captcha');

sent.length = 0;
const pdf = new File([new Uint8Array([37, 80, 68, 70])], 'site-plan.pdf', { type: 'application/pdf' });
r = await post(form({ 'cf-turnstile-response': 'good-token', products: ['sculptures', 'grc-grilles', 'not-a-line'], message: 'For our garden <b>lobby</b>' }, pdf));
check('valid enquiry: 200 ok', r.status === 200 && r.body.ok, JSON.stringify(r.body));
const [mail, reply] = sent;
check('enquiry email goes to ENQUIRY_TO with the visitor as reply-to', [].concat(mail?.to)[0] === 'inbox@example.com' && [].concat(mail?.reply_to ?? mail?.replyTo)[0] === 'asha@example.com', JSON.stringify({ to: mail?.to, reply_to: mail?.reply_to }));
check('subject names the design code and the visitor', mail?.subject === 'New enquiry: IFA-SC-012 from Asha Rao', mail?.subject);
check('unknown product slugs are dropped; names come from lines.js', mail?.text?.includes('Interested in: Sculptures, GRC Grilles') && !mail?.text?.includes('not-a-line'), mail?.text);
check('HTML in the message is escaped', mail?.html?.includes('&lt;b&gt;lobby&lt;/b&gt;') && !mail?.html?.includes('<b>lobby'));
check('the attachment is included', mail?.attachments?.[0]?.filename === 'site-plan.pdf');
check('auto-reply goes to the visitor and mentions the design', [].concat(reply?.to)[0] === 'asha@example.com' && reply?.text?.includes('IFA-SC-012'), JSON.stringify(reply?.to));
check('no auto-reply when no email is given', await (async () => {
  sent.length = 0;
  await post(form({ email: '', 'cf-turnstile-response': 'good-token' }));
  return sent.length === 1;
})());

for (const x of results) console.log(`${x.ok ? 'ok  ' : 'FAIL'} ${x.name}${x.ok || !x.detail ? '' : `  (${x.detail.slice(0, 200)})`}`);
const failed = results.filter((x) => !x.ok);
console.log(`\napi-check: ${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);
