import { SEO } from '../components/SEO';
import { HomeContent } from '../components/HomeContent';

export default async function HomePage() {
  return (
    <>
      <SEO
        title="THOR Studio | Discoverers of Elusive Design Solutions"
        description="THOR Studio takes organizational communications to the next level."
        url="/"
      />
      <HomeContent />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
