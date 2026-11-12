# Page transitions

- Global native View Transitions live in `src/components/PageTransitions.tsx`, mounted once in the root layout inside SmoothScroll. Installed React 19.2 does not export `<ViewTransition>`; no experimental React or animation dependency was added.
- Ordinary same-origin page links use Waku's router inside `document.startViewTransition`. Header links remain native anchors so the same handler owns navigation; their own callbacks still close the mobile/contact menus.
- Wait for the destination route's React layout effect before completing the snapshot callback. Waku's router promise / complete event can resolve before the DOM commits.
- CSS fades viewport snapshots for 300ms with existing `--ease-out-cubic`, the cubic ease-out family used by GSAP `power2.out` section reveals. The separately named header stays stationary. Viewport snapshots avoid scaling content when page heights differ.
- Browser back/forward defers Waku's popstate handling until the snapshot callback, then replays the event with its original state. Do not add another history stack or override Waku's scrolling.
- Same-page hashes/queries remain outside the click handler, preserving Lenis anchors. Modified clicks, downloads, external links, asset URLs and `/api/` links retain browser behavior. Add `data-native-navigation` to opt a link out.
- Keyboard link activation, reduced motion and unsupported APIs use immediate client navigation. Reduced motion also disables cross-document transitions in CSS.
- Superseded transitions skip safely; a 3.5-second guard releases frozen snapshots on slow/failed routes. Cross-document CSS opt-in covers navigation before hydration.
- Footer shader implementation is unchanged. Existing section GSAP/Lenis animations still run independently after navigation.
- Browser verification covers native fade timing, content/header links, back/forward, consecutive navigation, Lenis `#related`, reduced motion, unsupported API, mobile menu closing and keyboard activation.
