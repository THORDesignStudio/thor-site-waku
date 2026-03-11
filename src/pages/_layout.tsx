import '../styles.css';

import type { ReactNode } from 'react';

import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { SmoothScroll } from '../layouts/SmoothScroll';
import { JotaiProvider } from '../components/JotaiProvider';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <JotaiProvider>
      <SmoothScroll>
        <div>
          <meta name="description" content={data.description} />
          <link rel="icon" type="image/png" href={data.icon} />
          <link rel="stylesheet" href="https://use.typekit.net/wmf2hcd.css" />
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </SmoothScroll>
    </JotaiProvider>
  );
}

const getData = async () => {
  const data = {
    description: 'An internet website!',
    icon: '/images/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
