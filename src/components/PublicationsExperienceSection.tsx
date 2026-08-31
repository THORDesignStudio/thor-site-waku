'use client';

import { useLayoutEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { isContactModalOpenAtom } from '../atoms/contactAtoms';
import { useLenisScrollTrigger } from '../hooks/useLenisScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const publicationServices = [
  {
    name: 'Redesign',
    description:
      'For more than 20 years, THOR has helped publications evolve through thoughtful, strategic redesign. Our award-winning work strengthens editorial hierarchy and visual identity, improves readability and pacing, and creates flexible design systems that work seamlessly across print and digital formats.',
  },
  {
    name: 'Illustration',
    description:
      'THOR creates award-winning covers, illustrations, and infographics that turn complex subjects into compelling visual stories. We combine editorial insight with conceptual thinking and technical precision, producing distinctive imagery that captures attention and communicates information with clarity.',
  },
  {
    name: 'Production',
    description:
      'THOR provides award-winning production support for publications that demand consistent quality and dependable delivery. We work closely with editorial teams to preserve the integrity of the design and manage evolving content, complex production requirements, and demanding schedules with exceptional attention to detail.',
  },
] as const;

export function PublicationsExperienceSection() {
  const setIsContactOpen = useSetAtom(isContactModalOpenAtom);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLenisScrollTrigger(sectionRef);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (reducedMotion) {
        gsap.set(headingRef.current, { opacity: 1, y: 0 });
        serviceRefs.current.forEach((service) => {
          if (!service) return;
          gsap.set(service.querySelector('.publication-service-title'), {
            color: '#faf5f2',
          });
          gsap.set(service.querySelector('.publication-service-description'), {
            opacity: 1,
          });
        });
        return;
      }

      gsap.set(headingRef.current, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(headingRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: 'power2.out',
          });
        },
      });

      serviceRefs.current.forEach((service) => {
        if (!service) return;

        const title = service.querySelector('.publication-service-title');
        const description = service.querySelector(
          '.publication-service-description'
        );

        ScrollTrigger.create({
          trigger: service,
          start: 'top 60%',
          onEnter: () => {
            gsap.to(title, {
              color: '#faf5f2',
              duration: 0.8,
              ease: 'power2.out',
            });
            gsap.to(description, {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(title, {
              color: 'transparent',
              duration: 0.5,
              ease: 'power2.out',
            });
            gsap.to(description, {
              opacity: 0.3,
              duration: 0.5,
              ease: 'power2.out',
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-fluid-16 text-cream"
      style={{
        background:
          'linear-gradient(to bottom, var(--color-night) 0%, var(--color-night-blue) 50%, var(--color-night) 100%)',
      }}
    >
      <div className="relative z-10">
        <div className="mx-auto mb-fluid-10 w-full px-fluid-6">
          <h2
            ref={headingRef}
            className="text-center font-sans text-fluid-5xl font-bold leading-tight tracking-tight sm:text-fluid-7xl md:text-fluid-8xl"
          >
            Publication Capabilities
          </h2>
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-fluid-6">
          {publicationServices.map((service, index) => {
            const titleId = `publication-service-${service.name.toLowerCase()}`;

            return (
              <div
                key={service.name}
                ref={(element) => {
                  serviceRefs.current[index] = element;
                }}
                className="border-t border-dashed border-cream/40 py-fluid-6 first:border-t-0"
                aria-labelledby={titleId}
              >
                <h3
                  id={titleId}
                  className="publication-service-title heading-lg"
                  style={{
                    WebkitTextStroke: '1px var(--color-cream)',
                    color: 'transparent',
                  }}
                >
                  {service.name}
                </h3>
                <p
                  className="publication-service-description mt-fluid-2 max-w-[1100px] font-sans text-fluid-xl font-light leading-relaxed text-cream"
                  style={{ opacity: 0.3 }}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-fluid-8 flex justify-center px-fluid-6">
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="min-h-[65px] cursor-pointer rounded-full bg-pink px-10 font-sans text-xl font-extrabold uppercase tracking-[-0.02em] text-white transition-colors hover:bg-pink-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Work With Us
          </button>
        </div>
      </div>
    </section>
  );
}
