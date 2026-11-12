'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useTurnstile } from './useTurnstile';
import { useAnalytics } from './useAnalytics';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
const emptyForm: ContactFormData = { name: '', email: '', message: '' };

export function useContactForm({
  isActive,
  size,
  attachmentKey,
  source,
}: {
  isActive: boolean;
  size: 'compact' | 'flexible';
  attachmentKey: string;
  source: 'header_nav' | 'contact_page';
}) {
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const { token: turnstileToken, reset: resetTurnstile } = useTurnstile({
    isActive,
    containerRef: turnstileContainerRef,
    size,
    attachmentKey,
  });
  const { trackEvent } = useAnalytics();

  useEffect(
    () => () => {
      requestRef.current?.abort();
      requestRef.current = null;
    },
    []
  );
  const clearForm = useCallback(() => {
    requestRef.current?.abort();
    requestRef.current = null;
    setFormData(emptyForm);
    setIsSubmitting(false);
    setSubmitStatus('idle');
    resetTurnstile();
  }, [resetTurnstile]);
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setSubmitStatus('idle');
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isActive || !turnstileToken || requestRef.current) return;
    const request = new AbortController();
    requestRef.current = request;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
        signal: request.signal,
      });
      if (request.signal.aborted) return;
      if (!response.ok) throw new Error('Contact submission failed');
      setSubmitStatus('success');
      setFormData(emptyForm);
      trackEvent('generate_lead', {
        event_category: 'conversion',
        event_label: 'contact_form',
        value: 1,
        method: source,
      });
    } catch {
      if (!request.signal.aborted) setSubmitStatus('error');
    } finally {
      if (requestRef.current === request) {
        requestRef.current = null;
        resetTurnstile();
        setIsSubmitting(false);
      }
    }
  };
  return {
    formData,
    isSubmitting,
    submitStatus,
    turnstileToken,
    turnstileContainerRef,
    handleInputChange,
    handleSubmit,
    clearForm,
  };
}
