import { Link } from 'waku';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 py-4 md:py-6">
      <div className="px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        <nav className="flex items-center justify-between bg-night/80 hover:bg-night/97 transition-colors duration-300 hover:cursor-pointer rounded-full p-2 shadow-lg max-w-6xl w-full mx-auto border-2 border-white/60 backface-visible will-change-scroll">
          <Link to="/" className="flex items-center pl-6">
            <img
              src="/images/THOR_logo_WHITE.svg"
              alt="THOR Studio"
              className="h-6 md:h-7 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8 pl-8">
            <Link
              to="/case-studies"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              Case Studies
            </Link>
            <Link
              to="/how-we-work"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              How We Work
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hidden md:block px-6 lg:px-8 py-3 lg:py-4 bg-pink text-white text-sm font-medium rounded-full transition-colors shadow-lg whitespace-nowrap"
            >
              Work With Us
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center bg-night/95 rounded-full p-2"
          aria-label="Menu"
        >
          <span className="w-4 h-0.5 bg-white transition-all"></span>
          <span className="w-4 h-0.5 bg-white transition-all"></span>
          <span className="w-4 h-0.5 bg-white transition-all"></span>
        </button>
      </div>
    </header>
  );
};
