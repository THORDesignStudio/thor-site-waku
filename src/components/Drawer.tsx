'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const DRAWER_ANIMATION_MS = 500;
const DRAWER_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const DRAG_CLOSE_THRESHOLD = 0.25;
const DRAG_VELOCITY_THRESHOLD = 0.45;

interface Item {
  name: string;
  description: string;
  url: string;
  skills: string[];
}

interface DrawerProps {
  item: Item | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DragState {
  pointerId: number;
  startY: number;
  lastY: number;
  lastTime: number;
  velocity: number;
  startedOnHandle: boolean;
  dragging: boolean;
}

export function Drawer({ item, open, onOpenChange }: DrawerProps) {
  const [shouldRender, setShouldRender] = useState(open);
  const [isVisible, setIsVisible] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStateRef = useRef<DragState | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const requestClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    clearCloseTimer();

    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setShouldRender(true);
      setDragOffset(0);

      const frame = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    setIsDragging(false);
    setDragOffset(0);
    closeTimerRef.current = setTimeout(() => {
      setShouldRender(false);
      closeTimerRef.current = null;
    }, DRAWER_ANIMATION_MS);

    previousFocusRef.current?.focus?.();
  }, [clearCloseTimer, open]);

  useEffect(() => {
    return clearCloseTimer;
  }, [clearCloseTimer]);

  useEffect(() => {
    if (!shouldRender) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        requestClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [requestClose, shouldRender]);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    if (event.button !== 0) return;

    const target = event.target as HTMLElement;
    const scrollContainer = target.closest('[data-drawer-scroll]');
    const startedOnHandle = Boolean(target.closest('[data-drawer-handle]'));

    if (
      scrollContainer instanceof HTMLElement &&
      scrollContainer.scrollTop > 0 &&
      !startedOnHandle
    ) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      lastY: event.clientY,
      lastTime: performance.now(),
      velocity: 0,
      startedOnHandle,
      dragging: false,
    };
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const deltaY = event.clientY - dragState.startY;
    if (deltaY <= 0) return;

    if (!dragState.dragging) {
      if (deltaY < 8) return;

      dragState.dragging = true;
      setIsDragging(true);
      panelRef.current?.setPointerCapture(event.pointerId);
    }

    event.preventDefault();

    const now = performance.now();
    const elapsed = Math.max(now - dragState.lastTime, 1);
    dragState.velocity = (event.clientY - dragState.lastY) / elapsed;
    dragState.lastY = event.clientY;
    dragState.lastTime = now;

    setDragOffset(deltaY);
  }, []);

  const handlePointerEnd = useCallback(
    (event: React.PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState || dragState.pointerId !== event.pointerId) return;

      dragStateRef.current = null;
      setIsDragging(false);

      const panelHeight = panelRef.current?.offsetHeight ?? window.innerHeight;
      const draggedEnough = dragOffset / panelHeight > DRAG_CLOSE_THRESHOLD;
      const releasedFast = dragState.velocity > DRAG_VELOCITY_THRESHOLD;

      if (dragState.dragging && (draggedEnough || releasedFast)) {
        requestClose();
      } else {
        setDragOffset(0);
      }
    },
    [dragOffset, requestClose]
  );

  const overlayOpacity = isVisible
    ? Math.max(
        0,
        1 - dragOffset / ((panelRef.current?.offsetHeight ?? 1) * 0.8)
      )
    : 0;

  if (!item || !shouldRender) return null;

  return createPortal(
    <>
      <button
        aria-label="Close drawer"
        className="fixed inset-0 bg-night/85 z-100 cursor-default"
        onClick={requestClose}
        style={{
          animation: 'none',
          opacity: overlayOpacity,
          transition: isDragging
            ? 'none'
            : `opacity ${DRAWER_ANIMATION_MS}ms ${DRAWER_EASE}`,
        }}
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-100 flex justify-center outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-describedby="drawer-description"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        ref={panelRef}
        style={{
          transform: `translate3d(0, ${
            isVisible ? dragOffset : 'var(--initial-transform, 100%)'
          }${isVisible ? 'px' : ''}, 0)`,
          transition: isDragging
            ? 'none'
            : `transform ${DRAWER_ANIMATION_MS}ms ${DRAWER_EASE}`,
          touchAction: 'none',
          willChange: 'transform',
        }}
      >
        <div className="w-full max-w-6xl bg-cream rounded-t-3xl h-[85vh] overflow-hidden flex flex-col">
          <div className="absolute left-0 right-0 top-full h-[200%] bg-cream" />

          {/* Drag handle indicator */}
          <div className="flex justify-center pt-fluid-2 pb-fluid-1">
            <div
              className="relative w-12 h-1.5 bg-night/20 rounded-full opacity-70 hover:opacity-100 active:opacity-100"
              data-drawer-handle
            >
              <span className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Header with close button */}
          <div className="flex justify-end px-fluid-4 pb-fluid-1">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-night/10 hover:bg-night/20 transition-colors"
              aria-label="Close"
              onClick={requestClose}
            >
              <svg
                className="w-5 h-5 text-night"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable content area */}
          <div
            className="flex-1 overflow-y-auto px-fluid-6 pb-fluid-8"
            data-drawer-scroll
          >
            {/* Item content */}
            <div className="text-night">
              <h2 id="drawer-title" className="heading-lg mb-4">
                {item.name}
              </h2>
              <p
                id="drawer-description"
                className="body-lg text-night/70 mb-8 max-w-2xl"
              >
                {item.description}
              </p>

              {/* Items list - only render if skills exist */}
              {item.skills.length > 0 && (
                <div className="mb-8">
                  <h2 className="heading-sm mb-4 text-night/90">What we do</h2>
                  <ul className="grid gap-3">
                    {item.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-3 body-md text-night/80"
                      >
                        <span className="w-2 h-2 rounded-full bg-pink shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="pt-4">
                <button className="px-8 py-4 bg-pink text-white rounded-full hover:bg-pink-dark transition-colors body-md font-medium">
                  Start a Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
