# Daylight Computer CSS Architecture - Deep Analysis

## Overview

The Daylight Computer website uses **Tailwind CSS v3.4.17** with extensive customization, built on **Next.js** with CSS Modules. They've created a sophisticated, highly custom design system that goes far beyond standard Tailwind.

---

## 1. CSS Framework & Architecture

### **Primary Technology Stack**

- **Tailwind CSS v3.4.17** (heavily customized)
- **Next.js CSS Modules** (evident from class names like `header_header__w2BOs`)
- **CSS Custom Properties** (extensive use of CSS variables)
- **Lenis** (smooth scrolling library)

### **Build Approach**

- **Not vanilla Tailwind** - They've created extensive custom utilities
- **Hybrid approach**: Tailwind utilities + CSS Modules + custom CSS
- **CSS file size**: ~139KB (1,322 CSS rules in main stylesheet)

---

## 2. Color System

### **Custom Color Palette**

```css
--color-white: #fff --color-black: #000 --color-cream: #faf5f2
  --color-amber: #ff9d00 --color-gray: #17190f --color-gray-lighter: #262626
  --background: #faf5f2 --foreground: #17190f;
```

### **Extended Cream Variations**

They use multiple cream/neutral shades:

- `#E7DED8` - cream-dark
- `#E8DED8` - cream variations (used with opacity)
- `#E9E0DA`
- `#EEE9E5`
- `#EFE6E1`
- `#F6F0ED`
- `#FBF8F7`

### **Opacity-Based Colors**

Extensive use of opacity modifiers:

```css
.bg-moonlight/80
.border-black/10
.border-white/10
.bg-night/20
```

---

## 3. Typography System

### **Custom Fonts**

1. **ABC Room** (Sans-serif) - Body text
   - Variables: `__abcRoomFont_38b1ae`, `__abcRoomFont_Fallback_38b1ae`
   - Fallback stack: `ui-sans-serif, system-ui, sans-serif`

2. **ABC Arizona Flare** (Serif) - Headings
   - Variables: `__abcArizonaFlareFont_498f8e`, `__abcArizonaFlareFont_Fallback_498f8e`
   - Fallback stack: `ui-serif, Georgia, Cambria, Times New Roman, Times, serif`

### **Computed Typography Values**

```
Body:
  - font-size: 16px
  - font-weight: 400
  - line-height: 24px (1.5)
  - color: rgb(23, 25, 15)

H1:
  - font-size: 54px
  - font-family: ABC Arizona Flare
  - font-weight: 300
  - line-height: 54px (1)
  - letter-spacing: -3.78px (-7%)
  - color: rgb(255, 255, 255)

H2:
  - font-size: 54px
  - font-weight: 300
  - line-height: 52.38px
  - letter-spacing: -3.78px (-7%)
  - color: rgb(23, 25, 15)

H3:
  - font-size: 19.18px
  - font-family: ABC Room
  - font-weight: 500
  - line-height: 21.10px
  - letter-spacing: -0.96px (-5%)
  - color: rgb(255, 255, 255)
```

### **Fluid Typography System**

They use a sophisticated **viewport-based scaling system**:

```css
--text-scale-screen-min: 640 --text-scale-screen-max: 1920
  --text-scale-offset: calc(100vw - 640 * 1px)
  --text-scale-screen-difference: calc(1920 - 640)
  --text-scale-percentage: calc(
    var(--text-scale-offset) / var(--text-scale-screen-difference) * 16
  );
```

**Custom Font Size Variables:**

```css
--font-size-vw-xs: 0.625vw --font-size-vw-sm: 0.7291666667vw
  --font-size-vw-base: 0.8333333333vw --font-size-vw-lg: 0.9375vw
  --font-size-vw-xl: 1.0416666667vw --font-size-vw-2xl: 1.25vw
  --font-size-vw-3xl: 1.5625vw --font-size-vw-4xl: 1.875vw
  --font-size-vw-5xl: 2.5vw --font-size-vw-6xl: 3.125vw
  --font-size-vw-7xl: 3.75vw --font-size-vw-8xl: 5vw
  --font-size-vw-9xl: 6.6666666667vw --font-size-vw-10xl: 7.5vw;
```

**Clamp-based Responsive Typography:**

```css
.lg\:title-sm {
  --text-scale-min: 2.5;
  --text-scale-max: 3;
  font-size: clamp(
    var(--text-scale-min-rem),
    var(--text-scale-current-rem),
    var(--text-scale-max-rem)
  );
}
```

---

## 4. Spacing System

### **Viewport-Based Spacing**

Custom spacing units based on viewport width:

```css
--spacing-vw-1: 0.2083333333vw --spacing-vw-2: 0.4166666667vw
  --spacing-vw-3: 0.625vw --spacing-vw-4: 0.8333333333vw
  --spacing-vw-5: 1.0416666667vw --spacing-vw-6: 1.25vw
  --spacing-vw-7: 1.4583333333vw --spacing-vw-8: 1.6666666667vw
  --spacing-vw-9: 1.875vw --spacing-vw-10: 2.0833333333vw
  --spacing-vw-11: 2.2916666667vw --spacing-vw-12: 2.5vw
  --spacing-vw-14: 2.9166666667vw --spacing-vw-16: 3.3333333333vw
  --spacing-vw-18: 3.75vw --spacing-vw-20: 4.1666666667vw --spacing-vw-24: 5vw
  --spacing-vw-28: 5.8333333333vw --spacing-vw-32: 6.6666666667vw
  --spacing-vw-40: 8.3333333333vw --spacing-vw-44: 9.1666666667vw
  --spacing-vw-48: 10vw --spacing-vw-56: 11.6666666667vw
  --spacing-vw-64: 13.3333333333vw --spacing-vw-72: 15vw
  --spacing-vw-80: 16.6666666667vw --spacing-vw-96: 20vw;
```

**Usage in Tailwind:**

```css
.space-y-vw-1 > :not([hidden]) ~ :not([hidden])
.space-y-vw-2 > :not([hidden]) ~ :not([hidden])
.p-vw-4
```

### **Em-Based Spacing**

They also use **em-based utilities** for component-relative sizing:

```css
.rounded-em-[14/16]
.h-em-[58/16]
.p-em-[6/16]
.min-w-em-[132/14]
.text-em-[14/16]
```

This creates spacing that scales with the element's font size.

---

## 5. Custom Tailwind Utilities

### **Sample Custom Classes**

```css
/* Typography utilities */
.paragraph
.paragraph-uppercase
.title
.title-sm
.paragraph-md

/* Text scaling utilities */
.text-scale-xs/base
.lg:text-scale-xs/base

/* Viewport-aware utilities */
.p-vw-4
.lg:p-vw-4
.space-y-vw-8

/* Em-based utilities */
.rounded-em-[8/14]
.h-em-[54/16]
.min-w-[12.75em]

/* Complex responsive classes */
.max-lg:hero-inner-tight
.max-lg:!w-[calc(var(--header-height)*2+28px)]
```

### **Arbitrary Value Support**

Heavy use of Tailwind's arbitrary value syntax:

```css
.w-[calc(var(--header-height)*2+20px)]
.rounded-[0.2em]
.z-[calc(var(--z-index-3)+1)]
.border-[0.5px]
.bg-[#E8DED8]/70
```

---

## 6. Layout & Structure

### **Z-Index System**

```css
--z-index-1: 100 --z-index-2: 200 --z-index-3: 300 --z-index-4: 400
  --z-index-5: 500 --z-index-6: 600 --z-index-9: 999 --z-index-10: 1000;
```

### **Header Variables**

```css
--header-height: 44px --header-width: 74px;
```

### **Common Layout Classes**

```css
.flex
.inline-flex
.items-center
.justify-center
.absolute
.relative
.fixed
.inset-0
.pointer-events-auto
.pointer-events-none
```

---

## 7. Effects & Interactions

### **Transitions**

```css
.transition-opacity
.transition-colors
.transition-[width]
.duration-500
.duration-700
.ease-in
```

### **Backdrop Effects**

```css
.backdrop-blur-lg
```

### **Opacity Utilities**

```css
.opacity-0
.opacity-70
.hover:opacity-100
```

### **Custom Easing**

```css
--ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
```

---

## 8. Responsive Design

### **Breakpoint Prefixes in Use**

```css
lg: (1024px and up)
max-lg: (below 1024px)
3xl: (1920px and up - custom breakpoint)
```

### **Responsive Patterns**

```css
/* Mobile-first overrides */
.max-lg:hidden
.max-lg:!w-[calc(var(--header-height)*2+28px)]

/* Desktop enhancement */
.lg:bg-transparent
.lg:text-scale-xs/base
.lg:p-vw-4
```

---

## 9. Special Features

### **Selection Styling**

```css
::selection {
  background: var(--color-amber);
}
```

### **Reduced Motion Support**

```css
@media (prefers-reduced-motion: reduce) {
  .lg\:shadow-container {
    height: auto;
    min-height: 100vh;
  }
}
```

### **Prose Styling**

They include Tailwind's typography plugin (`@tailwindcss/typography`) with custom prose styles.

---

## 10. Key Design Patterns

### **1. Fluid Scaling**

Everything scales fluidly between 640px and 1920px using:

- CSS custom properties
- `clamp()` functions
- Viewport-based units
- Calculated values

### **2. Em-Based Components**

Components use em units for internal spacing, making them scale with font size:

```css
.button {
  rounded-[1em]
  h-em-[54/16]
  p-em-[6/16]
}
```

### **3. Layered Opacity**

Extensive use of semi-transparent overlays:

```css
.bg-moonlight/80
.border-black/10
.bg-night/20
```

### **4. Variable-Based Calculations**

Complex calculations using CSS variables:

```css
calc(var(--header-height) * 2 + 28px)
calc(var(--z-index-3) + 1)
```

---

## 11. CSS Module Pattern

**Example CSS Module Class:**

```css
header_header-wrapper__3S3ls
button_button__HOmVR
button_unstyled___LX37
header_menu-icon__qpdmJ
```

These are Next.js CSS Modules providing scoped styles alongside Tailwind utilities.

---

## 12. Notable Custom Properties

```css
/* Leva (debug UI library) variables */
--leva-sizes-checkboxSize:
  16px --leva-colors-elevation2: #181c20 --leva-fontWeights-folder: normal
    /* ... many more leva properties */ /* Inspect mode */ --inspect-color: red
    /* Font system */ --font-system: -apple-system,
  blinkmacsystemfont, ...;
```

---

## Summary & Key Takeaways

### **What Makes This Approach Special:**

1. **Hybrid Architecture**: Tailwind + CSS Modules + Custom CSS Properties
2. **Fluid Everything**: Typography and spacing scale smoothly across viewport sizes
3. **Em-Based Components**: Self-scaling components using em units
4. **Viewport Units**: Custom spacing system based on vw units
5. **Extensive Customization**: Far beyond default Tailwind
6. **Type-Scale System**: Sophisticated clamp-based responsive typography
7. **Color Opacity**: Heavy reliance on opacity variants for depth
8. **Next.js Integration**: CSS Modules for component-specific styles

### **Complexity Level:**

**Advanced** - This is not a beginner Tailwind setup. It requires:

- Deep understanding of CSS custom properties
- Complex Tailwind configuration
- Custom plugin development
- Sophisticated build tooling

### **Performance Considerations:**

- Large CSS file (~139KB)
- Many custom properties (174+ custom props)
- Extensive use of calculations (may impact paint performance)
- Well-optimized with Next.js code splitting

---

## Recommended Implementation Strategy

If you want to replicate this approach:

1. **Start with Tailwind v3.4+**
2. **Create custom spacing scale using CSS variables**
3. **Extend Tailwind config with custom utilities**
4. **Build fluid typography system with clamp()**
5. **Add em-based utilities via plugin**
6. **Set up viewport-based spacing**
7. **Configure Next.js with CSS Modules**
8. **Create custom color palette with opacity support**

This is a **production-grade, enterprise-level CSS architecture** that balances design flexibility with maintainability.
