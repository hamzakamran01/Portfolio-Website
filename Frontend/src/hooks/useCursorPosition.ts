import { useEffect, useState } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
}

export const useCursorPosition = (enabled = true): CursorPosition => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  return position;
};
