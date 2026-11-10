'use client';

import { useSetAtom } from 'jotai';
import { isContactModalOpenAtom } from '../atoms/contactAtoms';

export function ChallengePromo() {
  const setIsContactOpen = useSetAtom(isContactModalOpenAtom);

  return (
    <section className="bg-cool px-fluid-6 py-fluid-12">
      <div
        className="mx-auto max-w-[1600px] overflow-hidden rounded-3xl bg-navy bg-cover bg-center px-fluid-8 py-fluid-8"
        style={{ backgroundImage: "url('/images/promos/have-a-challenge.jpg')" }}
      >
        <h2 className="type-cta-headline text-white">
          Have a <span className="text-magenta">challenge?</span>
        </h2>
        <div className="mt-fluid-4 flex flex-col items-start gap-fluid-6 sm:flex-row sm:items-center">
          <p className="type-page-lede text-white">
            Talk with the principals
            <br />
            who do the work.
          </p>
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
