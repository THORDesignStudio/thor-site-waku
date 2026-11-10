'use client';

import { useSetAtom } from 'jotai';
import { isContactModalOpenAtom } from '../atoms/contactAtoms';

export function ChallengeCta() {
  const setIsContactOpen = useSetAtom(isContactModalOpenAtom);

  return (
    <section className="bg-white px-fluid-6 lg:px-fluid-12 py-fluid-16">
      <div className="mx-auto max-w-[1600px] flex flex-col gap-fluid-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="type-cta-headline text-navy">
            Have a <span className="text-magenta">challenge?</span>
          </h2>
          <p className="type-page-lede text-navy mt-fluid-3">
            Talk with the principals
            <br />
            who do the work.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="btn btn-primary"
          >
            Work with us
          </button>
        </div>
      </div>
    </section>
  );
}
