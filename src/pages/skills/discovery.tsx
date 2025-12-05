// This page is a placeholder - the drawer is now handled via JS on the homepage
// Consider removing this file once routing strategy is finalized

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center text-night">
        <h1 className="heading-lg mb-4">Discovery</h1>
        <p className="body-lg text-night/70">
          This skill page is now displayed as a drawer on the homepage.
        </p>
        <a
          href="/"
          className="inline-block mt-8 px-8 py-4 bg-pink text-white rounded-full hover:bg-pink-dark transition-colors body-md font-medium"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
