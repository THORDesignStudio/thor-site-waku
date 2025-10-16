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

## 🎯 Two Ways to Use Fluid Typography

### 1. Custom Utility Classes (Recommended)

Pre-built typography utilities with all settings configured:

#### Headings

```tsx
<h1 className="heading-xl">  {/* text-fluid-8xl + Rift + tight tracking + tight leading */}
<h2 className="heading-lg">  {/* text-fluid-6xl + Rift + tight tracking + tight leading */}
<h3 className="heading-md">  {/* text-fluid-4xl + Rift + normal tracking + snug leading */}
<h4 className="heading-sm">  {/* text-fluid-2xl + Rift + normal tracking + snug leading */}
```

#### Body Text

```tsx
<p className="body-lg">   {/* text-fluid-lg + Proxima + relaxed leading */}
<p className="body-md">   {/* text-fluid-base + Proxima + normal leading */}
<p className="body-sm">   {/* text-fluid-sm + Proxima + normal leading */}
```

### 2. Tailwind Arbitrary Values (For Custom Control)

Use the fluid typography variables directly with Tailwind's arbitrary value syntax:

```tsx
// Custom font sizes
<h1 className="text-[var(--text-fluid-9xl)]">          // 4.5rem → 8rem
<h2 className="text-[var(--text-fluid-6xl)]">          // 3rem → 4.5rem
<p className="text-[var(--text-fluid-base)]">          // 1rem → 1.125rem

// Combine with other Tailwind utilities
<h1 className="font-[var(--font-family-display)] text-[var(--text-fluid-8xl)] leading-tight tracking-tight">
  Custom Heading
</h1>

// Use with responsive variants
<h1 className="text-[var(--text-fluid-4xl)] md:text-[var(--text-fluid-6xl)] lg:text-[var(--text-fluid-8xl)]">
  Responsive Heading
</h1>

// Mix fluid and standard sizing
<p className="text-[var(--text-fluid-base)] lg:text-xl">
  Fluid base, then jump to xl on large screens
</p>
```

#### Available Typography Variables

```css
/* Font Families */
--font-family-sans: 'proxima-nova' --font-family-display: 'rift'
  /* Fluid Typography Scale */ --text-fluid-xs // 0.75rem → 0.875rem
  --text-fluid-sm // 0.875rem → 1rem
  --text-fluid-base // 1rem → 1.125rem
  --text-fluid-lg // 1.125rem → 1.25rem
  --text-fluid-xl // 1.25rem → 1.5rem
  --text-fluid-2xl // 1.5rem → 2rem
  --text-fluid-3xl // 1.875rem → 2.5rem
  --text-fluid-4xl // 2.25rem → 3rem
  --text-fluid-5xl // 2.5rem → 3.75rem
  --text-fluid-6xl // 3rem → 4.5rem
  --text-fluid-7xl // 3.5rem → 5.5rem
  --text-fluid-8xl // 4rem → 6.5rem
  --text-fluid-9xl // 4.5rem → 8rem
  /* Fluid Letter Spacing */ --tracking-fluid-tighter // -0.02em → -0.05em
  --tracking-fluid-tight // -0.01em → -0.03em
  --tracking-fluid-normal // 0em → -0.015em
  --tracking-fluid-wide; // 0.01em → 0.03em
```

**Usage in Tailwind:**

```tsx
<h1 className="text-[var(--text-fluid-8xl)] tracking-[var(--tracking-fluid-tight)]">
<p className="font-[var(--font-family-sans)] text-[var(--text-fluid-lg)]">
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

## 📐 Fluid Spacing System

Like the typography, spacing now scales smoothly across all screen sizes using `clamp()`. This creates consistent, proportional spacing that adapts to the viewport.

### Usage with Tailwind Arbitrary Values

Use Tailwind's arbitrary value syntax to reference the fluid spacing variables. This gives you full access to Tailwind's responsive and state modifiers:

```tsx
// Fluid padding
<div className="p-[var(--spacing-fluid-4)]">       // 1rem → 2rem (all sides)
<div className="px-[var(--spacing-fluid-8)]">      // 2rem → 4rem (horizontal)
<div className="py-[var(--spacing-fluid-12)]">     // 3rem → 6rem (vertical)

// Fluid margins
<section className="my-[var(--spacing-fluid-16)]">  // 4rem → 8rem (vertical)
<div className="mx-auto">                            // Centered (standard Tailwind)
<div className="mt-[var(--spacing-fluid-24)]">      // 6rem → 12rem (top)

// Fluid gaps (for flex/grid)
<div className="flex gap-[var(--spacing-fluid-4)]">       // 1rem → 2rem
<div className="grid gap-[var(--spacing-fluid-8)]">       // 2rem → 4rem

// With responsive variants
<div className="p-[var(--spacing-fluid-4)] md:p-[var(--spacing-fluid-8)]">
<div className="gap-[var(--spacing-fluid-4)] lg:gap-[var(--spacing-fluid-12)]">

// With state variants
<button className="p-[var(--spacing-fluid-4)] hover:p-[var(--spacing-fluid-6)]">
```

### Available Spacing Variables

```css
/* Small spacing (0.25rem → 0.5rem up to 0.75rem → 1.5rem) */
--spacing-fluid-1, --spacing-fluid-2, --spacing-fluid-3

/* Medium spacing (1rem → 2rem up to 1.5rem → 3rem) */
--spacing-fluid-4, --spacing-fluid-5, --spacing-fluid-6

/* Large spacing (2rem → 4rem up to 4rem → 8rem) */
--spacing-fluid-8, --spacing-fluid-10, --spacing-fluid-12, --spacing-fluid-16

/* Extra large spacing (5rem → 10rem up to 8rem → 16rem) */
--spacing-fluid-20, --spacing-fluid-24, --spacing-fluid-32

/* Massive spacing (for hero sections, etc.) */
--spacing-fluid-48, --spacing-fluid-64, --spacing-fluid-96
```

**Usage in Tailwind:**

```tsx
<div className="p-[var(--spacing-fluid-4)]">
<section className="py-[var(--spacing-fluid-24)]">
<div className="gap-[var(--spacing-fluid-6)]">
```

### Why This Is Powerful

1. **Consistent proportions** - Spacing scales with screen size just like typography
2. **No breakpoint jumps** - Smooth transitions as you resize
3. **Fewer media queries** - The system handles responsive spacing automatically
4. **Better visual hierarchy** - Relationships between elements stay consistent

### Real-World Example

```tsx
<section className="py-[var(--spacing-fluid-24)] px-[var(--spacing-fluid-6)]">
  <div className="max-w-6xl mx-auto space-y-[var(--spacing-fluid-8)]">
    <h2 className="heading-lg mb-[var(--spacing-fluid-6)]">Amazing Headline</h2>
    <div className="grid grid-cols-3 gap-[var(--spacing-fluid-6)]">
      <Card className="p-[var(--spacing-fluid-6)]" />
      <Card className="p-[var(--spacing-fluid-6)]" />
      <Card className="p-[var(--spacing-fluid-6)]" />
    </div>
  </div>
</section>
```

This section will have perfect proportions at every screen size - the padding, gaps, and margins all scale together with the typography!

**With Responsive Variants:**

```tsx
<section className="py-[var(--spacing-fluid-12)] md:py-[var(--spacing-fluid-24)] px-[var(--spacing-fluid-4)] md:px-[var(--spacing-fluid-6)]">
  <div className="max-w-6xl mx-auto space-y-[var(--spacing-fluid-6)] lg:space-y-[var(--spacing-fluid-12)]">
    <h2 className="heading-md lg:heading-lg mb-[var(--spacing-fluid-4)] lg:mb-[var(--spacing-fluid-8)]">
      Responsive Headline
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-fluid-4)] lg:gap-[var(--spacing-fluid-8)]">
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</section>
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
