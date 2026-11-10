'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import type { CaseStudyGalleryImage } from '../data/case-study-galleries';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useEscapeKey } from '../hooks/useEscapeKey';

export function CaseStudyGallery({
  images,
  name,
}: {
  images: CaseStudyGalleryImage[];
  name: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const titleId = useId();
  const lenis = useLenis();
  const isOpen = selected !== null;
  const image = selected === null ? undefined : images[selected];
  const close = useCallback(() => setSelected(null), []);
  const move = (direction: number) =>
    setSelected((index) =>
      index === null
        ? null
        : (index + direction + images.length) % images.length
    );

  useLockBodyScroll(isOpen);
  useEscapeKey(close, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const wasStopped = lenis?.isStopped;
    lenis?.stop();
    dialog.showModal();
    return () => {
      dialog.close();
      if (!wasStopped) lenis?.start();
    };
  }, [isOpen, lenis]);

  if (!images.length) return null;

  return (
    <>
      <div className="case-gallery-grid">
        {images.map((item, index) => (
          <figure key={item.src}>
            <button
              type="button"
              className="case-gallery-image"
              onClick={() => setSelected(index)}
              aria-label={`Enlarge image ${index + 1}: ${item.alt}`}
              aria-haspopup="dialog"
            >
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
              />
              <span className="case-gallery-enlarge" aria-hidden="true">
                ↗
              </span>
            </button>
            {item.caption && (
              <figcaption className="type-caption mt-3">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="case-lightbox"
        aria-labelledby={titleId}
        data-lenis-prevent
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'Tab') {
            const controls =
              event.currentTarget.querySelectorAll<HTMLButtonElement>(
                'button:not([disabled])'
              );
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 id={titleId} className="type-nav text-white">
            {name} — Gallery
          </h2>
          <button type="button" className="chip" onClick={close} autoFocus>
            Close{' '}
            <span aria-hidden="true" className="ml-2">
              ×
            </span>
          </button>
        </div>
        {image && (
          <figure
            onTouchStart={(event) => {
              const touch = event.touches[0];
              touchStart.current =
                event.touches.length === 1 && touch
                  ? { x: touch.clientX, y: touch.clientY }
                  : null;
            }}
            onTouchEnd={(event) => {
              const touch = event.changedTouches[0];
              const start = touchStart.current;
              if (
                touch &&
                start &&
                Math.abs(touch.clientX - start.x) > 60 &&
                Math.abs(touch.clientY - start.y) < 40
              ) {
                move(touch.clientX < start.x ? 1 : -1);
              }
              touchStart.current = null;
            }}
            onTouchCancel={() => {
              touchStart.current = null;
            }}
          >
            <img
              className="case-lightbox-art"
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
            <figcaption
              className="type-caption text-on-dark mt-4"
              aria-live="polite"
            >
              {selected! + 1} / {images.length} · {image.caption ?? image.alt}
            </figcaption>
          </figure>
        )}
        {images.length > 1 && (
          <div className="flex justify-between gap-4 mt-4">
            <button type="button" className="chip" onClick={() => move(-1)}>
              Previous image
            </button>
            <button type="button" className="chip" onClick={() => move(1)}>
              Next image
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
