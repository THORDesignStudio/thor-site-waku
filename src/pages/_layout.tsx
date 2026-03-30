import '../styles.css';

import type { ReactNode } from 'react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatButton } from '../components/ChatButton';
import { SmoothScroll } from '../layouts/SmoothScroll';
import { JotaiProvider } from '../components/JotaiProvider';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <JotaiProvider>
      <SmoothScroll>
        <div>
          {/* Global head elements only - SEO tags are handled per-page */}
          <link rel="icon" type="image/png" href="/images/favicon.png" />
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
          <ChatButton />
        </div>
      </SmoothScroll>
    </JotaiProvider>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
