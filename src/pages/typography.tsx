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

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-pink to-pink-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-xl mb-6">Ready to Scale?</h2>
          <p className="text-fluid-xl mb-12 opacity-90">
            This fluid typography system adapts beautifully to any device, from
            the smallest phone to the largest desktop display.
          </p>
          <button className="px-12 py-5 bg-white text-night rounded-lg hover:bg-cream transition-colors text-fluid-lg font-medium">
            Start Building
          </button>
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
