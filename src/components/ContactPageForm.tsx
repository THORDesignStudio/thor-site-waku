'use client';

import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { isContactModalOpenAtom } from '../atoms/contactAtoms';
import { useContactForm } from '../hooks/useContactForm';
import { ContactFields } from './ContactFields';
import { useAnalytics } from '../hooks/useAnalytics';

export function ContactPageForm() {
  const overlayOpen = useAtomValue(isContactModalOpenAtom);
  const [widgetSize, setWidgetSize] = useState<'compact' | 'flexible'>(
    'compact'
  );
  const contact = useContactForm({
    isActive: !overlayOpen,
    size: widgetSize,
    attachmentKey: widgetSize,
    source: 'contact_page',
  });
  const { trackEvent } = useAnalytics();
  useEffect(() => {
    const container = contact.turnstileContainerRef.current;
    if (!container) return;
    const sync = () =>
      setWidgetSize(container.clientWidth >= 300 ? 'flexible' : 'compact');
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(container);
    return () => observer.disconnect();
  }, [contact.turnstileContainerRef]);
  return (
    <form
      aria-label="Start a project"
      onSubmit={contact.handleSubmit}
      onFocusCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          trackEvent('begin_contact', {
            event_category: 'engagement',
            event_label: 'work_with_us_page',
            method: 'contact_page',
          });
      }}
      className="relative rounded-3xl bg-white p-fluid-6 text-navy shadow-xl sm:p-fluid-8 space-y-fluid-6"
    >
      <ContactFields
        formData={contact.formData}
        isSubmitting={contact.isSubmitting}
        submitStatus={contact.submitStatus}
        turnstileToken={contact.turnstileToken}
        turnstileContainerRef={contact.turnstileContainerRef}
        idPrefix="work-contact"
        onInputChange={contact.handleInputChange}
        appearance="light"
        disabled={overlayOpen}
      />
    </form>
  );
}
