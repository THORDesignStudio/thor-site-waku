import { Link } from 'waku';

export default async function HomePage() {
  const data = await getData();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <title>{data.title}</title>
      <h1 className="heading-xl mb-8">THOR Site Samples</h1>
      <div className="flex flex-col gap-4">
        <Link
          to="/typography"
          className="px-8 py-4 bg-night text-white rounded-lg hover:bg-night/80 transition-colors text-fluid-base font-medium text-center"
        >
          Typography
        </Link>
      </div>
      <div
        style={{
          width: '100%',
          height: '140px',
          borderRadius: '8px',
          background:
            'linear-gradient(to right, hsl(240deg 100% 20%), hsl(281deg 100% 21%), hsl(304deg 100% 23%), hsl(319deg 100% 30%), hsl(329deg 100% 36%), hsl(336deg 100% 41%), hsl(346deg 83% 51%), hsl(3deg 95% 61%), hsl(17deg 100% 59%), hsl(30deg 100% 55%), hsl(40deg 100% 50%), hsl(48deg 100% 50%), hsl(55deg 100% 50%) )',
        }}
      ></div>

      <div
        style={{
          width: '100%',
          height: '140px',
          borderRadius: '8px',
          background:
            'linear-gradient(to right, hsl(255deg 59.5% 14.5%), hsl(226deg 54% 19.6%), hsl(281deg 63.4% 27.8%), hsl(319deg 96.4% 32.9%), hsl(328deg 100% 40.6%) )',
        }}
      ></div>
    </div>
  );
}

const getData = async () => {
  const data = {
    title: 'Waku',
    headline: 'Waku',
    body: 'Hello world!',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
