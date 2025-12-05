import type { ReactNode } from 'react';

export function splitTextToSpans(text: string): ReactNode[] {
  return text.split('').map((char, i) => (
    <span key={i} className="char" style={{ color: 'transparent' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}
