import { useEffect } from 'react';

export const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    // Save original styles and scroll position
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    // Apply scroll lock styles.
    // NOTE: intentionally do NOT set `touch-action: none` on body. The spec
    // intersects touch-action across the ancestor chain, so doing so would
    // disable touch scrolling inside any descendant scrollable region (e.g.
    // the contact form that mounts inside the fixed header). `position: fixed`
    // plus the restored scrollY is what actually locks the page on iOS; inner
    // scroll containers use `overscroll-contain` to prevent rubber-banding.
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      // Restore original styles
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      document.body.style.top = '';

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};
