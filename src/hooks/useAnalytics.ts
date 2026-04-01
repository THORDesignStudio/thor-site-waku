'use client';

type GtagEvent = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | undefined;
};

type GtagFunction = (
  command: 'event',
  eventName: string,
  eventParams?: GtagEvent
) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer: unknown[];
  }
}

export const useAnalytics = () => {
  const trackEvent = (eventName: string, params?: GtagEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    }
  };

  return { trackEvent };
};
