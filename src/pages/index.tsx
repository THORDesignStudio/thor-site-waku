import { HomeContent } from '../components/HomeContent';

export default async function HomePage() {
  return <HomeContent />;
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
