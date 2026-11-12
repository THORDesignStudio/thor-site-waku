'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'waku/router/client';

type PendingNavigation = {
  fromPath: string;
  finish: () => void;
  transition: ViewTransition;
};

/** Keep the old snapshot until Waku has committed the destination page. */
export function PageTransitions() {
  const router = useRouter();
  const currentPath = useRef(router.path);
  const pending = useRef<PendingNavigation | null>(null);

  useLayoutEffect(() => {
    currentPath.current = router.path;
    if (pending.current && pending.current.fromPath !== router.path) {
      pending.current.finish();
    }
  }, [router.path]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let replayingHistory = false;
    let navigationVersion = 0;

    const cancel = () => {
      pending.current?.transition.skipTransition();
      pending.current?.finish();
    };

    const navigate = (update: () => Promise<void> | void) => {
      const version = ++navigationVersion;
      cancel();
      let resolveCommit!: () => void;
      const committed = new Promise<void>((resolve) => {
        resolveCommit = resolve;
      });
      // A failed or superseded route must never leave a frozen snapshot behind.
      const timeout = window.setTimeout(cancel, 3500);
      const navigation: PendingNavigation = {
        fromPath: currentPath.current,
        finish: () => {
          window.clearTimeout(timeout);
          resolveCommit();
          if (pending.current === navigation) pending.current = null;
        },
        transition: document.startViewTransition(async () => {
          try {
            if (version !== navigationVersion) return;
            await update();
            await committed;
          } finally {
            navigation.finish();
          }
        }),
      };
      pending.current = navigation;
      // Snapshot failures should not affect navigation or produce unhandled rejections.
      void navigation.transition.ready.catch(() => {});
      void navigation.transition.finished.catch(() => {});
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      )
        return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
      if (
        !anchor ||
        anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self') ||
        anchor.relList.contains('external') ||
        anchor.hasAttribute('data-native-navigation')
      )
        return;
      const url = new URL(anchor.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname === window.location.pathname ||
        /\.[a-z0-9]+$/i.test(url.pathname) ||
        url.pathname.startsWith('/api/')
      )
        return;
      event.preventDefault();
      const update = () =>
        router.push(
          `${url.pathname}${url.search}${url.hash}` as Parameters<
            typeof router.push
          >[0]
        );
      if (
        !document.startViewTransition ||
        motion.matches ||
        event.detail === 0
      ) {
        navigationVersion++;
        cancel();
        void update().catch(() => {});
        return;
      }
      navigate(update);
    };

    // Let Waku restore its own history/scroll position inside the snapshot callback.
    const onPopState = (event: PopStateEvent) => {
      if (
        replayingHistory ||
        !document.startViewTransition ||
        motion.matches ||
        window.location.pathname === currentPath.current
      )
        return;
      event.stopImmediatePropagation();
      navigate(() => {
        replayingHistory = true;
        try {
          window.dispatchEvent(
            new PopStateEvent('popstate', { state: event.state })
          );
        } finally {
          replayingHistory = false;
        }
      });
    };
    const onMotionChange = () => {
      if (motion.matches) cancel();
    };
    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPopState, true);
    motion.addEventListener('change', onMotionChange);
    return () => {
      navigationVersion++;
      cancel();
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPopState, true);
      motion.removeEventListener('change', onMotionChange);
    };
  }, [router.push]);

  return null;
}
