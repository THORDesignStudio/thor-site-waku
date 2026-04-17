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
          <link rel="icon" type="image/png" href="/images/favicon.png" />
          <link
            rel="preconnect"
            href="https://use.typekit.net"
            crossOrigin="anonymous"
          />
          <link rel="dns-prefetch" href="https://use.typekit.net" />
          <link rel="stylesheet" href="https://use.typekit.net/wmf2hcd.css" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          ></meta>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-DFHRN1W1FY"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-DFHRN1W1FY');
              `,
            }}
          />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] bg-pink text-white px-4 py-2 rounded font-medium text-sm uppercase tracking-wide transition-all duration-200"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
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
