'use client';

import { WebGLShader } from './WebGLShader/WebGLShader';
import { footerMenu } from '../data/menus';

const linkClassName =
  'inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]';

export const Footer = () => {
  return (
    <div className="relative w-full overflow-hidden h-[600px]">
      <div className="absolute inset-0 w-full h-full z-0">
        <WebGLShader
          minWidth={600}
          height={600}
          maintainHeight={0.8}
          seed={30005}
        />
      </div>

      <div className="relative z-10 container flex flex-col justify-between w-full h-full xl:flex-row gap-x-vw-12 gap-y-vw-12 lg:gap-y-vw-20 paragraph-md py-fluid-6 px-fluid-6 text-white max-w-[1600px] mx-auto">
        <div className="flex flex-col w-full gap-y-[2em] flex-1 justify-between">
          <div>
            <img
              src="/images/THOR_logo_WHITE.svg"
              alt="THOR Digital and THOR Studio"
              className="max-w-[500px] w-full"
            />
            <p className="text-fluid-xl font-sans font-extrabold uppercase mt-6 tracking-widest">
              Discoverers of elusive solutions.{' '}
              <span className="block">Purveyors of fine design.</span>
            </p>
          </div>

          <ul className="text-fluid-sm flex flex-col">
            <li>THOR Digital LLC • {new Date().getFullYear()}</li>
            <li>
              The site is{' '}
              <a
                href="https://github.com/THORDesignStudio/thor-site-waku"
                className="underline"
              >
                open source
              </a>{' '}
              and waiting for your contributions.
            </li>
          </ul>
        </div>

        <div className="xl:max-w-[max(700px,37vw)] grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[2.33em] gap-[1.25em] font-sans md:gap-y-[2em]">
          {footerMenu.sections.map((section) => (
            <div key={section.title}>
              <span className="text-fluid-sm font-sans font-extrabold">
                {section.title}
              </span>
              <ul className="paragraph-md space-y-vw-2 mt-2">
                {section.links.map((link) => (
                  <li key={link.url}>
                    <a
                      className={linkClassName}
                      id={`footer-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}-link`}
                      href={link.url}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
