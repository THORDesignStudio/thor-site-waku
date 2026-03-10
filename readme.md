# THOR Site (Waku / React Based)

This is the main site for THOR Digital and THOR Studio (our print publication division). It's a pretty simple site based on the [Waku framework](https://waku.gg), which is a spiritual successor to the now deprecated Gatsby project.

## Inspiration

We had to pull together many teachings to make the site you're seeing a reality. Below are some of the inspirations and lessons:

## Website

- Thanks to the [Waku React framework](https://waku.gg/) for addressing the need for a static site generator in the React ecosystem.
- The [Lenis page animation framework](https://lenis.darkroom.engineering/) from darkroom engineering is powering the homepage, really good kit.

## Shaders

- There is some great introductory information about the nature of a shader available from [Making Software](https://www.makingsoftware.com/chapters/shaders)
- The depth Alex Harri went into on his [fragment gradient shader tutorial](https://alexharri.com/blog/webgl-gradients) is incredible and worth your time if you're learning how to build shaders from scratch.
- We're using some of the shaders from the open source [Lydia](https://lygia.xyz/) library. They are building blocks for more advanced animations.

## Typography

- [Daylight Computer](https://www.daylightcomputer.com) website and the [Vercel Geist Font](https://github.com/vercel/geist-font) by Basement Studio helps us build a fluid type system for this site that works with Tailwind.
- Dropbox's new font, DB Sharp Grotesk, and the accompanying [Typography Website](https://brand.dropbox.com/typography) they built gave us some ideas on how to do the capabilities section of our site.

## Fluid Typography with clamp()

Instead of:

```css
/* Old way - multiple breakpoints */
@media (min-width: 640px) {
  font-size: 16px;
}
@media (min-width: 768px) {
  font-size: 17px;
}
@media (min-width: 1024px) {
  font-size: 18px;
}
```

We use:

```css
/* New way - smooth scaling */
font-size: clamp(16px, 0.95rem + 0.25vw, 18px);
```

## 🎨 Quick Examples

### Hero Section

```tsx
<h1 className="heading-xl">
  Your Amazing Headline
</h1>
<p className="body-lg">
  Introductory paragraph with perfect scaling.
</p>
```

### Content Section

```tsx
<h2 className="heading-lg mb-6">Section Title</h2>
<p className="body-md text-night/80">
  Body copy that adapts to any screen.
</p>
```

## 🎯 Typography Scale Cheat Sheet

```
DISPLAY SIZES (Rift font, tight tracking)
heading-xl  → text-fluid-8xl  (64px → 104px)
heading-lg  → text-fluid-6xl  (48px → 72px)
heading-md  → text-fluid-4xl  (36px → 48px)
heading-sm  → text-fluid-2xl  (24px → 32px)

BODY SIZES (Proxima Nova, normal tracking)
body-lg     → text-fluid-lg   (18px → 20px)
body-md     → text-fluid-base (16px → 18px) ← default
body-sm     → text-fluid-sm   (14px → 16px)
```

## 🔧 Customization

### Add New Fluid Sizes

Edit `tailwind.config.ts`:

```typescript
fontSize: {
  'fluid-custom': 'clamp(2rem, 1.5rem + 2vw, 4rem)',
}
```

### Add New Colors

```typescript
colors: {
  brand: {
    DEFAULT: '#yourcolor',
    light: '#lighterversion',
    dark: '#darkerversion',
  }
}
```

### Create New Utilities

Edit `src/styles.css`:

```css
@layer utilities {
  .my-custom-text {
    @apply text-fluid-lg font-display tracking-tight;
  }
}
```
