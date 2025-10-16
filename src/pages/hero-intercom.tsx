export default function HeroIntercom() {
  return (
    <section className="relative">
      {/* Background Image - in flow to determine height */}
      <img
        src="/images/hero-intercom.webp"
        alt="hero intercom sample"
        className="w-full h-auto"
      />

      {/* Optional dark overlay for better text readability */}
      <div className="absolute inset-0 bg-night/30"></div>

      {/* Content - absolutely positioned over the image */}
      <div className="absolute inset-0 flex items-start justify-center px-6 pt-[25vh] pb-20">
        <div className="max-w-6xl w-full">
          <p className="text-fluid-sm font-light tracking-wider uppercase mb-6 text-white/80">
            Fluid Typography System
          </p>
          <h1 className="heading-xl mb-8 text-white">
            Discoverers of
            <br />
            Elusive Solutions
          </h1>
          <p className="body-lg max-w-2xl text-white/90">
            Watch how this text scales smoothly as you resize your browser. No
            breakpoints, no jumps—just beautiful, fluid typography that adapts
            to any screen size.
          </p>
          <div className="mt-12 flex gap-4">
            <button className="px-8 py-4 bg-pink text-white rounded-lg hover:bg-pink-dark transition-colors text-fluid-base font-medium">
              Explore More
            </button>
            <button className="px-8 py-4 border-2 border-white/40 rounded-lg hover:border-white/60 transition-colors text-fluid-base font-medium text-white">
              Learn How
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
