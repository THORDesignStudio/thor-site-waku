import { SEO } from '../components/SEO';
import { ContactPageForm } from '../components/ContactPageForm';

export default function WorkWithUsPage() {
  return (
    <>
      <SEO
        title="Work with us | THOR Digital"
        description="Contact John and Colby to talk about your next design, development or publication project."
        canonicalUrl="https://www.thor-studio.com/work-with-us"
      />
      <section className="capability-hero relative overflow-hidden bg-navy text-white">
        <div className="relative z-10 mx-auto grid max-w-[var(--layout-page)] items-start gap-fluid-10 px-fluid-6 pt-[9.6rem] pb-fluid-12 sm:pt-[10.8rem] lg:grid-cols-2">
          <div>
            <p className="type-eyebrow !text-on-dark mb-5">Start a project</p>
            <h1 className="type-page-headline">
              Work with <span className="text-magenta">us</span>
            </h1>
            <p className="type-page-lede text-white mt-fluid-6 max-w-xl">
              Contact John and Colby to talk about your new project.
            </p>
            <p className="type-article-body !text-on-dark mt-fluid-6 max-w-xl">
              You’ll talk with the principals who do the work. Tell us what you
              have in mind, what you need help with, and where you’d like to go.
            </p>
            <a
              href="/about#principals-heading"
              className="link-card mt-fluid-8 inline-block !text-white"
            >
              Meet the principals <span aria-hidden="true">→</span>
            </a>
          </div>
          <ContactPageForm />
        </div>
      </section>
    </>
  );
}
export const getConfig = async () => ({ render: 'static' }) as const;
