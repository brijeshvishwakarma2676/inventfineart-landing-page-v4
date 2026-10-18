import { useLocation } from 'react-router';
import { lineBySlug, inSentence } from '../../data/lines';
import { whatsappLink } from '../../data/site';

/** Floating WhatsApp button on every page; the message names the product line and page the visitor is on. */
export function FloatingWhatsApp() {
  const { pathname } = useLocation();
  const line = lineBySlug[pathname.split('/')[1]];
  const topic = line ? inSentence(line.name) : 'your products';
  const href = whatsappLink(`Hello Invent Fine Art, I'm interested in ${topic}. (Page: inventfineart.com${pathname})`);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg ring-1 ring-dark/10 transition-transform duration-300 hover:scale-105 md:right-7 md:bottom-7"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-7 fill-current">
        <path d="M16.04 3C9.4 3 4 8.33 4 14.9c0 2.3.66 4.45 1.8 6.28L4 29l8.04-1.75A12.2 12.2 0 0 0 16.04 26.8C22.68 26.8 28 21.47 28 14.9S22.68 3 16.04 3Zm0 21.6c-1.9 0-3.68-.52-5.2-1.42l-.37-.22-4.77 1.04 1.06-4.55-.24-.38a9.6 9.6 0 0 1-1.5-5.17c0-5.38 4.48-9.75 10.02-9.75 5.52 0 9.96 4.37 9.96 9.75s-4.44 9.7-9.96 9.7Zm5.47-7.27c-.3-.15-1.77-.86-2.04-.96-.28-.1-.48-.15-.68.15-.2.29-.78.96-.96 1.16-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46a8.9 8.9 0 0 1-1.66-2.03c-.17-.3-.02-.45.13-.6.13-.13.3-.34.45-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.51-.08-.15-.68-1.6-.93-2.2-.25-.57-.5-.5-.68-.5h-.58c-.2 0-.52.07-.8.37-.27.29-1.04 1-1.04 2.45 0 1.44 1.07 2.84 1.21 3.04.15.2 2.1 3.17 5.08 4.44.71.3 1.26.48 1.7.62.71.22 1.36.19 1.87.12.57-.08 1.77-.71 2.02-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
