import '../styles.css';

import type { ReactNode } from 'react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../layouts/SmoothScroll';
import { JotaiProvider } from '../components/JotaiProvider';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <JotaiProvider>
      <SmoothScroll>
        <div>
          <title>{data.title}</title>
          <meta name="description" content={data.description} />
          <meta property="og:title" content={data.title} />
          <meta property="og:description" content={data.description} />
          <meta property="og:image" content={data.image} />
          <meta property="og:url" content={data.url} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={data.title} />
          <meta name="twitter:description" content={data.description} />
          <meta name="twitter:image" content={data.image} />
          <link rel="icon" type="image/png" href={data.icon} />
          <link
            rel="preconnect"
            href="https://use.typekit.net"
            crossOrigin="anonymous"
          />
          <link rel="dns-prefetch" href="https://use.typekit.net" />
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
    description:
      'THOR Studio takes organizational communications to the next level.',
    icon: '/images/favicon.png',
    title: 'THOR Studio | Discoverers of Elusive Design Solutions',
    url: 'https://www.thor-studio.com',
    image: '/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
