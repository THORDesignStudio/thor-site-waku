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
