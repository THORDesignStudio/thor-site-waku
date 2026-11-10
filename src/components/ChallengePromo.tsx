'use client';

import { useSetAtom } from 'jotai';
import { isContactModalOpenAtom } from '../atoms/contactAtoms';

export function ChallengePromo() {
  const setIsContactOpen = useSetAtom(isContactModalOpenAtom);

  return (
    <section
      className="relative overflow-hidden bg-navy bg-cover bg-center px-fluid-6 py-fluid-16"
      style={{ backgroundImage: "url('/images/promos/have-a-challenge.jpg')" }}
    >
      <div className="relative mx-auto max-w-[1600px] flex flex-col items-start">
        <h2 className="type-cta-headline text-white">
          Have a <span className="text-magenta">challenge?</span>
        </h2>
        <p className="type-page-lede text-white mt-fluid-3">
          Talk with the principals
          <br />
          who do the work.
        </p>
        <button
          type="button"
          onClick={() => setIsContactOpen(true)}
          className="btn btn-primary mt-fluid-6"
        >
          Work with us
        </button>
      </div>
    </section>
  );
}
