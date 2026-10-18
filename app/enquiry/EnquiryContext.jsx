import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const EnquiryContext = createContext({ open: () => {}, close: () => {}, state: { isOpen: false } });

/**
 * One enquiry panel for the whole site (spec §5). Every "Get a Quote" / "Enquire" calls
 * open({ category, code, title }) so the panel knows what the visitor is asking about.
 */
export function EnquiryProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, prefill: {} });
  const open = useCallback((prefill = {}) => setState({ isOpen: true, prefill }), []);
  const close = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);
  const value = useMemo(() => ({ open, close, state }), [open, close, state]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export const useEnquiry = () => useContext(EnquiryContext);
