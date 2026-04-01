import { useEffect, useRef, useCallback, useState } from 'react';

// Extend Window interface for Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: (errorCode: string) => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'flexible' | 'compact';
          /** always | execute | interaction-only — see Cloudflare Turnstile docs */
          appearance?: 'always' | 'execute' | 'interaction-only';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}

interface UseTurnstileOptions {
  isActive: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  onTokenChange?: (token: string | null) => void;
  /** Change when the ref attaches to a different DOM node (e.g. sm breakpoint) so the widget re-mounts. */
  attachmentKey?: string;
}

export const useTurnstile = ({
  isActive,
  containerRef,
  onTokenChange,
  attachmentKey = '',
}: UseTurnstileOptions) => {
  const [token, setToken] = useState<string | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const initTurnstile = useCallback(() => {
    if (!window.turnstile || !containerRef.current) return;

    // Remove existing widget if present
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
    }

    const siteKey = (import.meta as ImportMeta & { env?: Record<string, string> }).env
      ?.WAKU_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      console.error('Turnstile site key not found (set WAKU_PUBLIC_TURNSTILE_SITE_KEY in .env.local)');
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: 'dark',
      size: 'flexible',
      appearance: 'always',
      callback: (newToken: string) => {
        setToken(newToken);
        onTokenChange?.(newToken);
      },
      'error-callback': () => {
        setToken(null);
        onTokenChange?.(null);
      },
      'expired-callback': () => {
        setToken(null);
        onTokenChange?.(null);
      },
    });
  }, [containerRef, onTokenChange]);

  useEffect(() => {
    if (!isActive) {
      // Cleanup when not active
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      setToken(null);
      onTokenChange?.(null);
      return;
    }

    const existingScript = document.querySelector('script[data-turnstile]');

    if (!existingScript) {
      // Load script
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-turnstile', 'true');
      script.onload = initTurnstile;
      document.head.appendChild(script);
    } else if (window.turnstile) {
      // Script already loaded, initialize immediately
      initTurnstile();
    } else {
      // Script loading, wait for it
      const checkInterval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkInterval);
          initTurnstile();
        }
      }, 100);
      setTimeout(() => clearInterval(checkInterval), 10000);
    }

    return () => {
      // Cleanup on unmount
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [isActive, attachmentKey, initTurnstile, onTokenChange]);

  const reset = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setToken(null);
    onTokenChange?.(null);
  }, [onTokenChange]);

  return { token, reset };
};
