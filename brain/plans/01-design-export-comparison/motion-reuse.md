# Motion reuse constraints

## User direction
- Reuse the app's existing motion work and installed guidance.
- Keep current header/footer behavior and production footer effect; no shell animation redesign.
- Adapt page composition without resetting the interaction language or adding another animation library.

## Existing sources to read before implementation
- `src/layouts/SmoothScroll.tsx`: single root ReactLenis provider.
- `src/hooks/useLenisScrollTrigger.ts`: existing Lenis/ScrollTrigger synchronization and lifecycle pattern.
- `src/components/Drawer.tsx`, `CapabilityDrawer.tsx`, `ProgramDrawer.tsx`: gestures, close behavior, focus restoration and scroll locking.
- `src/hooks/useLockBodyScroll.ts`, `useEscapeKey.ts`, `useDelayedState.ts`: shared interaction hooks.
- `src/components/CaseStudyCarousel.tsx`, `ProgramsCarousel.tsx`: GSAP context/ScrollTrigger patterns and existing timing.
- `src/components/FlipbookCarousel/FlipbookCarousel.tsx` and CSS: related-work fan/overlap behavior.
- `src/components/PublicationsCarousels.tsx`, `TabbedWorkShowcase.tsx`: existing specialized carousel patterns.
- `src/components/Header.tsx`, `Footer.tsx`, `WebGLShader/`: retained shell behavior.
- Existing card interactions in `CaseStudyFilterGrid.tsx` and shared control styles in `src/styles.css`.

## Adaptation rules
- Start from the closest working interaction; adjust appearance/data while preserving useful behavior.
- Reuse GSAP for established timeline/scroll interactions, CSS for existing simple states, Lenis through its current provider/hook.
- Audit suitability and cleanup in touched code; reuse does not establish that every current effect handles every accessibility case.
- Existing `Carousel.tsx` has missing legacy imports; do not treat it as a usable foundation.
- Featured slider timing/pause logic is new functionality around existing motion patterns; exported boards supply no runtime code.
- Missing pieces such as gallery dialog should reuse shared close/scroll/focus behavior, with verified focus containment and restoration.
- Preserve interrupted/reversed interaction behavior, responsive refresh and route-unmount cleanup; avoid duplicate ScrollTriggers/listeners.
- Reduced motion must keep content reachable and disable featured auto-advance. Pointer capability gates apply to new/touched hover behavior.
- Read installed `animate` guidance for new effects; extend current patterns/tokens. Do not follow generic library suggestions over the user's explicit reuse constraint.
- Validate in the retained header/footer context, including scroll lock release and fixed/sticky offsets.

