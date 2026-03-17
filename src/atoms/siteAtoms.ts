import { atom } from 'jotai';

// ============================================================================
// Case Study Carousel Atoms
// ============================================================================
export const activeCaseStudyIndexAtom = atom(0);

// ============================================================================
// Orbit Geometry Constants (from ProgramsCarousel)
// ============================================================================

// Radius as percentage of the square container
export const RING_RADIUS = 40;

// The arc is a HALF-ELLIPSE because the CSS renders:
// - width: RING_RADIUS * 2 = 80% (horizontal diameter)
// - height: RING_RADIUS = 40% (vertical extent, which is half the width)
// So the horizontal radius (Rx) = 40%, but vertical radius (Ry) = 40% (the height of the half-ellipse)
//
// Actually, the border-radius trick makes it a true half-circle visually,
// but the BOUNDING BOX is width:80%, height:40%, positioned so the
// arc's baseline is at Y=50% and curves upward to Y=10%.
//
// Planet keyframes must trace this same path.

// ============================================================================
// Planet Animation Atoms
// ============================================================================

// Current planet angle (270° = left, 0° = top, 90° = right)
// Travels along upper half-circle arc from left to right
export const planetAngleAtom = atom(270);
