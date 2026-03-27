import { useState, useEffect, useRef } from 'react';

/**
 * A hook that creates a derived state with a delay when the source becomes true.
 * When sourceState becomes true, derivedState becomes true after delayMs.
 * When sourceState becomes false, derivedState immediately becomes false.
 *
 * This is useful for animation sequences where you want a staggered reveal.
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 * const isVisible = useDelayedState(isOpen, 300); // 300ms delay
 *
 * // isVisible becomes true 300ms after isOpen becomes true
 * // isVisible immediately becomes false when isOpen becomes false
 */
export const useDelayedState = (sourceState: boolean, delayMs: number) => {
  const [derivedState, setDerivedState] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any pending timeout to prevent race conditions
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (sourceState) {
      // Delay setting derivedState to true
      timeoutRef.current = setTimeout(() => {
        setDerivedState(true);
      }, delayMs);
    } else {
      // Immediately set derivedState to false
      setDerivedState(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [sourceState, delayMs]);

  return derivedState;
};
