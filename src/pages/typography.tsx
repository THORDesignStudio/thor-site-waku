export default function TypographyDemo() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-cream-dark px-6 py-20">
        <div className="max-w-6xl w-full">
          <p className="text-fluid-sm font-light tracking-wider uppercase mb-6 text-night/60">
            Fluid Typography System
          </p>
          <h1 className="heading-xl mb-8">
            Discoverers of
            <br />
            Elusive Solutions
          </h1>
          <p className="body-lg max-w-2xl text-night/80">
            Watch how this text scales smoothly as you resize your browser. No
            breakpoints, no jumps—just beautiful, fluid typography that adapts
            to any screen size.
          </p>
          <div className="mt-12 flex gap-4">
            <button className="px-8 py-4 bg-pink text-white rounded-lg hover:bg-pink-dark transition-colors text-fluid-base font-medium">
              Explore More
            </button>
            <button className="px-8 py-4 border-2 border-night/20 rounded-lg hover:border-night/40 transition-colors text-fluid-base font-medium">
              Learn How
            </button>
          </div>
        </div>
      </section>

      {/* Two Approaches Demo */}
      <section className="py-20 px-6 bg-night text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-lg mb-4">Two Ways to Use Fluid Typography</h2>
          <p className="body-lg text-white/70 mb-16 max-w-3xl">
            Choose between convenience and control based on your needs.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Approach 1: Custom Utilities */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="inline-block px-3 py-1 bg-pink/20 text-pink rounded-full text-sm mb-6">
                Recommended
              </div>
              <h3 className="heading-md mb-4 text-white">
                1. Custom Utilities
              </h3>
              <p className="body-md text-white/70 mb-8">
                Pre-configured classes for common patterns. Includes font
                family, size, line-height, and letter-spacing.
              </p>

              <div className="space-y-6">
                <div>
                  <code className="text-pink text-sm block mb-2">
                    className="heading-xl"
                  </code>
                  <p className="heading-xl text-white">Quick Setup</p>
                </div>

                <div>
                  <code className="text-pink text-sm block mb-2">
                    className="body-lg"
                  </code>
                  <p className="body-lg text-white/90">
                    Perfect for standard layouts with consistent typography.
                  </p>
                </div>
              </div>
            </div>

            {/* Approach 2: Arbitrary Values */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="inline-block px-3 py-1 bg-cream/20 text-cream rounded-full text-sm mb-6">
                Advanced
              </div>
              <h3 className="heading-md mb-4 text-white">
                2. Tailwind Arbitrary Values
              </h3>
              <p className="body-md text-white/70 mb-8">
                Use variables directly for complete control. Combine with any
                Tailwind utility or variant.
              </p>

              <div className="space-y-6">
                <div>
                  <code className="text-pink text-sm block mb-2">
                    className="text-[var(--text-fluid-8xl)]"
                  </code>
                  <p className="text-[var(--text-fluid-8xl)] font-[var(--font-family-display)] leading-tight text-white">
                    Full Control
                  </p>
                </div>

                <div>
                  <code className="text-pink text-sm block mb-2">
                    className="text-[var(--text-fluid-lg)]
                    md:text-[var(--text-fluid-xl)]"
                  </code>
                  <p className="text-[var(--text-fluid-lg)] md:text-[var(--text-fluid-xl)] text-white/90">
                    Add responsive variants for precise control.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h4 className="heading-sm mb-6 text-white">Code Examples</h4>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-white/60 mb-3">Custom Utility:</p>
                <pre className="bg-black/40 rounded-lg p-4 text-sm text-cream overflow-x-auto">
                  {`<h1 className="heading-xl">
  Amazing Title
</h1>`}
                </pre>
              </div>

              <div>
                <p className="text-sm text-white/60 mb-3">Arbitrary Value:</p>
                <pre className="bg-black/40 rounded-lg p-4 text-sm text-cream overflow-x-auto">
                  {`<h1 className="text-[var(--text-fluid-8xl)] 
     font-[var(--font-family-display)]">
  Amazing Title
</h1>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Scale Demo */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-lg mb-4">Typography Scale</h2>
          <p className="body-lg text-night/70 mb-16 max-w-3xl">
            Our fluid type system uses{' '}
            <code className="px-2 py-1 bg-cream rounded text-pink">
              clamp()
            </code>{' '}
            to scale typography smoothly between 640px and 1920px viewport
            widths. Try resizing your browser to see the magic.
          </p>

          <div className="space-y-16">
            {/* Display Sizes */}
            <div>
              <h3 className="heading-sm mb-8 text-pink">Display Sizes</h3>

              <div className="space-y-8">
                <div className="border-l-4 border-pink/30 pl-6">
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-9xl
                  </p>
                  <p className="text-fluid-9xl font-display leading-tight tracking-tighter">
                    The Future
                  </p>
                </div>

                <div className="border-l-4 border-pink/30 pl-6">
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-8xl
                  </p>
                  <p className="text-fluid-8xl font-display leading-tight tracking-tighter">
                    Design System
                  </p>
                </div>

                <div className="border-l-4 border-pink/30 pl-6">
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-7xl
                  </p>
                  <p className="text-fluid-7xl font-display leading-tight tracking-tighter">
                    Beautiful Typography
                  </p>
                </div>

                <div className="border-l-4 border-pink/30 pl-6">
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-6xl
                  </p>
                  <p className="text-fluid-6xl font-display leading-tight tracking-tighter">
                    Scales Smoothly Across
                  </p>
                </div>

                <div className="border-l-4 border-pink/30 pl-6">
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-5xl
                  </p>
                  <p className="text-fluid-5xl font-display leading-tight tracking-tighter">
                    Every Screen Size
                  </p>
                </div>
              </div>
            </div>

            {/* Heading Sizes */}
            <div>
              <h3 className="heading-sm mb-8 text-pink">Heading Sizes</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-4xl
                  </p>
                  <h4 className="text-fluid-4xl font-display leading-snug tracking-tight">
                    No Media Queries Required
                  </h4>
                </div>

                <div>
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-3xl
                  </p>
                  <h4 className="text-fluid-3xl font-display leading-snug tracking-tight">
                    Just Pure CSS Magic
                  </h4>
                </div>

                <div>
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-2xl
                  </p>
                  <h4 className="text-fluid-2xl font-display leading-snug tracking-tight">
                    Inspired by Daylight Computer
                  </h4>
                </div>
              </div>
            </div>

            {/* Body Sizes */}
            <div>
              <h3 className="heading-sm mb-8 text-pink">Body Text Sizes</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-xl
                  </p>
                  <p className="text-fluid-xl leading-relaxed">
                    The quick brown fox jumps over the lazy dog. This is
                    fluid-xl text that scales smoothly from 20px to 24px as your
                    viewport grows.
                  </p>
                </div>

                <div>
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-lg
                  </p>
                  <p className="text-fluid-lg leading-relaxed">
                    The quick brown fox jumps over the lazy dog. This is
                    fluid-lg text that scales smoothly from 18px to 20px as your
                    viewport grows.
                  </p>
                </div>

                <div>
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-base
                  </p>
                  <p className="text-fluid-base leading-normal">
                    The quick brown fox jumps over the lazy dog. This is
                    fluid-base text that scales smoothly from 16px to 18px as
                    your viewport grows. Perfect for body copy.
                  </p>
                </div>

                <div>
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-sm
                  </p>
                  <p className="text-fluid-sm leading-normal">
                    The quick brown fox jumps over the lazy dog. This is
                    fluid-sm text that scales smoothly from 14px to 16px as your
                    viewport grows.
                  </p>
                </div>

                <div>
                  <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-2">
                    text-fluid-xs
                  </p>
                  <p className="text-fluid-xs leading-normal">
                    The quick brown fox jumps over the lazy dog. This is
                    fluid-xs text that scales smoothly from 12px to 14px as your
                    viewport grows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Font Showcase */}
      <section className="py-20 px-6 bg-night text-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-lg mb-4">Font Families</h2>
          <p className="body-lg text-cream/70 mb-16 max-w-3xl">
            We're using two beautiful typefaces from Adobe Fonts: Rift for
            display text and Proxima Nova for body copy.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Rift */}
            <div className="border border-cream/20 rounded-2xl p-8">
              <p className="text-fluid-sm text-cream/60 mb-4">Display Font</p>
              <h3 className="text-fluid-6xl font-display mb-6">Rift</h3>
              <div className="space-y-4 text-cream/80">
                <p className="font-display">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="font-display">abcdefghijklmnopqrstuvwxyz</p>
                <p className="font-display">0123456789 !@#$%^&*()</p>
              </div>
              <p className="mt-6 text-fluid-sm text-cream/60">
                Used for headings and display text
              </p>
            </div>

            {/* Proxima Nova */}
            <div className="border border-cream/20 rounded-2xl p-8">
              <p className="text-fluid-sm text-cream/60 mb-4">Body Font</p>
              <h3 className="text-fluid-6xl font-sans mb-6">Proxima Nova</h3>
              <div className="space-y-4 text-cream/80">
                <p className="font-sans">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="font-sans">abcdefghijklmnopqrstuvwxyz</p>
                <p className="font-sans">0123456789 !@#$%^&*()</p>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-fluid-xs text-cream/60">
                  Available weights:
                </p>
                <div className="flex gap-4">
                  <span className="font-sans font-thin">Thin (100)</span>
                  <span className="font-sans font-light">Light (300)</span>
                  <span className="font-sans font-extrabold">Bold (800)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-lg mb-4">Color Palette</h2>
          <p className="body-lg text-night/70 mb-12 max-w-3xl">
            Our color system is built on a vibrant gradient that flows from deep
            blues through purples to energetic pinks. Each color is defined as a
            CSS variable for consistency across the entire design system.
          </p>

          {/* Gradient Showcase */}
          <div className="mb-16">
            <h3 className="heading-sm mb-6 text-pink">Brand Gradient</h3>
            <div
              style={{
                width: '100%',
                height: '180px',
                borderRadius: '12px',
                background:
                  'linear-gradient(to right, hsl(255deg 59.5% 14.5%), hsl(226deg 54% 19.6%), hsl(281deg 63.4% 27.8%), hsl(319deg 96.4% 32.9%), hsl(328deg 100% 40.6%), hsl(337deg 100% 48.2%))',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              }}
            />
            <p className="text-fluid-sm text-night/60 mt-4">
              Used in the WebGL footer shader and key brand moments
            </p>
          </div>

          {/* Color Table */}
          <div>
            <h3 className="heading-sm mb-6 text-pink">Color Reference</h3>
            <div className="bg-white rounded-2xl overflow-hidden border border-night/10">
              {/* Table Header */}
              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 bg-night text-cream text-fluid-sm font-medium border-b border-night/10">
                <div>Color</div>
                <div>Variable Name</div>
                <div>Hex</div>
                <div>HSL</div>
              </div>

              {/* Gradient Colors */}
              <div className="border-b border-night/5 bg-cream-dark/30">
                <div className="px-4 py-3 text-fluid-xs uppercase tracking-wider text-night/60 font-medium">
                  Gradient Colors
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 border-b border-night/5 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#18133e' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-night
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #18133e
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(255deg 59.5% 14.5%)
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 border-b border-night/5 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#172341' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-gray-blue
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #172341
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(226deg 54% 19.6%)
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 border-b border-night/5 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#592674' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-spicy-purple
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #592674
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(281deg 63.4% 27.8%)
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 border-b border-night/5 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#b32674' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-pink-flat
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #b32674
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(319deg 96.4% 32.9%)
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 border-b border-night/5 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#ea2b6f' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-pink
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #ea2b6f
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(328deg 100% 40.6%)
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 border-b border-night/5 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#ff568a' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-pink-dark
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #ff568a
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(337deg 100% 48.2%)
                </div>
              </div>

              {/* Accent Colors */}
              <div className="border-b border-night/5 bg-cream-dark/30">
                <div className="px-4 py-3 text-fluid-xs uppercase tracking-wider text-night/60 font-medium">
                  Accent Colors
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 border-b border-night/5 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#003d5c' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-night-light
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #003d5c
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(202deg 100% 18%)
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 border-b border-night/5 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#ef4f86' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-pink-light
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #ef4f86
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(330deg 100% 42.5%)
                </div>
              </div>

              {/* Neutral Colors */}
              <div className="border-b border-night/5 bg-cream-dark/30">
                <div className="px-4 py-3 text-fluid-xs uppercase tracking-wider text-night/60 font-medium">
                  Neutral Colors
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 border-b border-night/5 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#faf5f2' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-cream
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #faf5f2
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(22deg 56% 97%)
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 border-b border-night/5 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#e8ded8' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-cream-dark
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #e8ded8
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(22deg 34% 89%)
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr_120px_200px] gap-4 p-4 hover:bg-cream-dark/50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-night/10"
                    style={{ backgroundColor: '#d1c9c3' }}
                  />
                </div>
                <div className="flex items-center font-mono text-fluid-sm">
                  --color-cream-darker
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  #d1c9c3
                </div>
                <div className="flex items-center text-fluid-sm text-night/70">
                  hsl(22deg 18% 81%)
                </div>
              </div>
            </div>

            <div className="mt-8 bg-night/5 rounded-xl p-6">
              <p className="text-fluid-sm text-night/70">
                <span className="font-medium text-pink">Pro tip:</span> Use
                these colors with Tailwind's arbitrary value syntax:
                <code className="ml-2 px-2 py-1 bg-white rounded text-pink text-fluid-xs">
                  bg-[var(--color-pink)]
                </code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Utility Classes */}
      <section className="py-20 px-6 bg-cream-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-lg mb-4">Custom Utility Classes</h2>
          <p className="body-lg text-night/70 mb-16 max-w-3xl">
            Pre-built typography utilities for common use cases.
          </p>

          <div className="space-y-12">
            <div className="bg-white rounded-2xl p-8">
              <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-4">
                .heading-xl
              </p>
              <h3 className="heading-xl mb-4">Extra Large Heading</h3>
              <code className="text-fluid-xs bg-cream px-3 py-1 rounded">
                text-fluid-8xl font-display leading-tight tracking-tighter
              </code>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-4">
                .heading-lg
              </p>
              <h3 className="heading-lg mb-4">Large Heading</h3>
              <code className="text-fluid-xs bg-cream px-3 py-1 rounded">
                text-fluid-6xl font-display leading-tight tracking-tighter
              </code>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-4">
                .heading-md
              </p>
              <h3 className="heading-md mb-4">Medium Heading</h3>
              <code className="text-fluid-xs bg-cream px-3 py-1 rounded">
                text-fluid-4xl font-display leading-snug tracking-tight
              </code>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <p className="text-fluid-xs uppercase tracking-wider text-night/60 mb-4">
                .body-lg
              </p>
              <p className="body-lg mb-4">
                This is large body text. It's perfect for introductory
                paragraphs or emphasized content that needs a bit more presence
                than regular body copy.
              </p>
              <code className="text-fluid-xs bg-cream px-3 py-1 rounded">
                text-fluid-lg font-sans leading-relaxed
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg mb-8">How It Works</h2>

          <div className="space-y-8">
            <div className="bg-night text-cream rounded-xl p-6">
              <p className="text-fluid-sm font-bold mb-4 text-pink">
                The Magic Formula
              </p>
              <pre className="text-fluid-xs overflow-x-auto">
                {`fontSize: {
  'fluid-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
}

// Breaks down to:
// clamp(minimum, preferred, maximum)
// minimum: 1rem (16px)
// preferred: 0.95rem + 0.25vw (scales with viewport)
// maximum: 1.125rem (18px)`}
              </pre>
            </div>

            <div>
              <h3 className="heading-sm mb-4">Key Benefits</h3>
              <ul className="space-y-4 body-md">
                <li className="flex gap-3">
                  <span className="text-pink">✓</span>
                  <span>No media queries needed for typography scaling</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink">✓</span>
                  <span>
                    Smooth, continuous scaling across all viewport sizes
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink">✓</span>
                  <span>Better readability at any screen size</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink">✓</span>
                  <span>Reduced CSS complexity and maintenance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink">✓</span>
                  <span>
                    Inspired by modern design systems like Daylight Computer
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
