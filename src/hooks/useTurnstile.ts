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
          action?: string;
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
  /** Widget size. `flexible` needs ≥300px of horizontal space; use `compact` on narrow mobile. */
  size?: 'normal' | 'flexible' | 'compact';
  /** Stable server-validated action for the protected form. */
  action?: string;
}

export const useTurnstile = ({
  isActive,
  containerRef,
  onTokenChange,
  attachmentKey = '',
  size = 'flexible',
  action,
}: UseTurnstileOptions) => {
  const [token, setToken] = useState<string | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const initTurnstile = useCallback(() => {
    if (!window.turnstile || !containerRef.current) return;

    // Remove existing widget if present
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
    }

    const siteKey = (
      import.meta as ImportMeta & { env?: Record<string, string> }
    ).env?.WAKU_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      console.error(
        'Turnstile site key not found (set WAKU_PUBLIC_TURNSTILE_SITE_KEY in .env.local)'
      );
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: 'dark',
      size,
      appearance: 'always',
      ...(action ? { action } : {}),
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
  }, [action, containerRef, onTokenChange, size]);

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

    let script = document.querySelector<HTMLScriptElement>(
      'script[data-turnstile]'
    );
    const isNewScript = !script;
    if (!script) {
      script = document.createElement('script');
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-turnstile', 'true');
    }
    let active = true;
    const initialize = () => {
      if (active) initTurnstile();
    };
    script.addEventListener('load', initialize);
    if (window.turnstile) initialize();
    if (isNewScript) document.head.appendChild(script);

    return () => {
      active = false;
      script.removeEventListener('load', initialize);
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
