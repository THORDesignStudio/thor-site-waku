# Fluid Typography System Guide

## 🎨 Overview

This site uses a **fluid typography system** inspired by Daylight Computer, where all text scales smoothly between viewport sizes using CSS `clamp()` - no media queries needed!

## 📝 Font Stack

### Display Font: **Rift**

- Used for: Headings, hero text, display elements
- Weight: 400 (Regular)
- Usage: `font-display`

### Body Font: **Proxima Nova**

- Used for: Body text, UI elements
- Weights: 100 (Thin), 300 (Light), 800 (Extra Bold)
- Usage: `font-sans`

## 🔤 Fluid Typography Scale

All sizes scale smoothly from **640px to 1920px viewport width**:

### Display Sizes (Headings)

```tsx
text-fluid-9xl  // 72px → 128px
text-fluid-8xl  // 64px → 104px
text-fluid-7xl  // 56px → 88px
text-fluid-6xl  // 48px → 72px
text-fluid-5xl  // 40px → 60px
text-fluid-4xl  // 36px → 48px
text-fluid-3xl  // 30px → 40px
text-fluid-2xl  // 24px → 32px
```

### Body Sizes

```tsx
text - fluid - xl; // 20px → 24px
text - fluid - lg; // 18px → 20px
text - fluid - base; // 16px → 18px (default)
text - fluid - sm; // 14px → 16px
text - fluid - xs; // 12px → 14px
```

## 📏 Fluid Letter Spacing

Letter spacing that scales with viewport - perfect for display fonts like Rift:

```tsx
tracking - fluid - tighter; // -0.02em → -0.05em (tightest, for large display)
tracking - fluid - tight; // -0.01em → -0.03em (for large headings)
tracking - fluid - normal; // 0em → -0.015em (for medium headings)
tracking - fluid - wide; // 0.01em → 0.03em (more open spacing)
```

These automatically adjust letter-spacing as the text size changes, giving display text more breathing room on smaller screens and tighter spacing on larger screens.

## 🎯 Custom Utility Classes

Pre-built typography utilities for common patterns:

### Headings

```tsx
<h1 className="heading-xl">  {/* text-fluid-8xl + display font + tight tracking */}
<h2 className="heading-lg">  {/* text-fluid-6xl + display font + tight tracking */}
<h3 className="heading-md">  {/* text-fluid-4xl + display font + snug tracking */}
<h4 className="heading-sm">  {/* text-fluid-2xl + display font + snug tracking */}
```

### Body Text

```tsx
<p className="body-lg">   {/* text-fluid-lg + sans font + relaxed leading */}
<p className="body-md">   {/* text-fluid-base + sans font + normal leading */}
<p className="body-sm">   {/* text-fluid-sm + sans font + normal leading */}
```

## 💡 Usage Examples

### Hero Section

```tsx
<section className="min-h-screen flex items-center justify-center px-6">
  <div className="max-w-6xl">
    <p className="text-fluid-sm uppercase tracking-wider mb-6 text-night/60">
      Subtitle
    </p>
    <h1 className="heading-xl mb-8">
      Your Amazing
      <br />
      Headline Here
    </h1>
    <p className="body-lg text-night/80 max-w-2xl">
      Your introductory paragraph that scales beautifully across all screen
      sizes.
    </p>
  </div>
</section>
```

### Content Section

```tsx
<section className="py-20 px-6">
  <div className="max-w-4xl mx-auto">
    <h2 className="heading-lg mb-4">Section Title</h2>
    <p className="body-lg text-night/70 mb-8">
      Lead paragraph with slightly larger text.
    </p>
    <p className="body-md">Regular body copy for detailed content.</p>
  </div>
</section>
```

### Card Component

```tsx
<div className="bg-white rounded-xl p-8">
  <h3 className="heading-sm mb-4">Card Title</h3>
  <p className="body-md text-night/80">Card description text.</p>
</div>
```

## 🎨 Color Palette

```tsx
// Backgrounds
bg - cream; // #faf5f2 (light, default)
bg - cream - dark; // #e8ded8
bg - cream - darker; // #d1c9c3
bg - night; // #18190f (dark)
bg - white; // #ffffff

// Text
text - night; // #18190f (default)
text - night / 80; // 80% opacity
text - cream; // #faf5f2 (on dark backgrounds)

// Accents (Brand Pink)
bg - pink; // #ff003b
text - pink; // #ff003b
border - pink; // #ff003b
bg - pink - light; // #ff3366
bg - pink - dark; // #cc002f
```

## 📐 Spacing Utilities

Fluid spacing that scales with viewport:

```tsx
gap - fluid - xs; // 0.5rem → 0.75rem
gap - fluid - sm; // 1rem → 1.5rem
gap - fluid - md; // 2rem → 3rem
gap - fluid - lg; // 3rem → 4.5rem
gap - fluid - xl; // 4rem → 6rem

// Works with padding, margin, gap, etc.
p - fluid - md;
my - fluid - lg;
```

## 🔧 Technical Details

### How clamp() Works

```css
font-size: clamp(minimum, preferred, maximum);

/* Example: */
font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);

/*
minimum: 1rem (16px) - never smaller
preferred: 0.95rem + 0.25vw - scales with viewport
maximum: 1.125rem (18px) - never larger
*/
```

### Benefits

✅ No media query breakpoints needed
✅ Smooth, continuous scaling
✅ Better readability at all sizes
✅ Less CSS to maintain
✅ Automatic adaptation to any screen

## 📱 Responsive Behavior

| Viewport       | Typography Behavior    |
| -------------- | ---------------------- |
| < 640px        | Minimum sizes (locked) |
| 640px - 1920px | Smooth fluid scaling   |
| > 1920px       | Maximum sizes (locked) |

## 🚀 View the Demo

Visit `/typography` to see the complete fluid typography system in action. Resize your browser window to watch the text scale smoothly!

## 🛠️ Customization

To adjust the scale, edit `tailwind.config.ts`:

```typescript
fontSize: {
  'fluid-custom': 'clamp(MIN, PREFERRED, MAX)',
  // Example:
  'fluid-hero': 'clamp(3rem, 2rem + 5vw, 8rem)',
}
```

## 💻 Development

```bash
# Start dev server
npm run dev

# Visit the typography demo
# http://localhost:3000/typography
```

---

**Built with inspiration from Daylight Computer's fluid design system** ✨
