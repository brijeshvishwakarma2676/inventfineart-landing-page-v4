import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';

// Loaded on demand by useLightbox (keeps it out of the first page load). Graphite backdrop; an oxide
// Enquire button in the toolbar when the page passes onEnquire.
export default function LightboxImpl({ index: start, onEnquire, ...props }) {
  const [current, setCurrent] = useState(start);
  const enquire = onEnquire && (
    <button
      key="enquire"
      type="button"
      onClick={() => onEnquire(current)}
      className="mx-2 my-1.5 bg-oxide px-4 py-2 text-small font-bold uppercase tracking-label text-white hover:bg-oxide-deep"
    >
      Enquire
    </button>
  );
  return (
    <Lightbox
      plugins={[Zoom, Captions, Counter]}
      index={start}
      on={{ view: ({ index }) => setCurrent(index) }}
      carousel={{ finite: false, padding: '6%' }}
      controller={{ closeOnBackdropClick: true }}
      captions={{ descriptionTextAlign: 'center' }}
      toolbar={{ buttons: enquire ? [enquire, 'close'] : ['close'] }}
      styles={{ container: { backgroundColor: 'color-mix(in srgb, var(--color-dark) 96%, transparent)' } }}
      {...props}
    />
  );
}
