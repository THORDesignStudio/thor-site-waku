import { SEO } from '../components/SEO';

type Swatch = {
  name: string;
  token: string;
  hex: string;
  note: string;
  dark?: boolean;
};

const brand: Swatch[] = [
  {
    name: 'Navy',
    token: 'navy',
    hex: '#0E0A35',
    note: 'Primary surface. Headers, hero, footer, CTA fallback. Text on light backgrounds.',
    dark: true,
  },
  {
    name: 'Magenta',
    token: 'magenta',
    hex: '#ED145B',
    note: 'Brand accent. Buttons, emphasis words, eyebrows, rules. Never a large background for body text.',
    dark: true,
  },
  {
    name: 'Cool',
    token: 'cool',
    hex: '#EAEEFA',
    note: 'Secondary surface. Alternates with white for sections, callouts, tags.',
  },
  {
    name: 'Deep magenta',
    token: 'deep-magenta',
    hex: '#9B1672',
    note: 'Brief cards and footer gradient. Backgrounds only, never text.',
    dark: true,
  },
  {
    name: 'White',
    token: 'white',
    hex: '#FFFFFF',
    note: 'Primary light surface. Text on navy and magenta.',
  },
];

const text: Swatch[] = [
  {
    name: 'Body text',
    token: 'ink',
    hex: '#2B2750',
    note: 'Long-form and body copy on light surfaces.',
    dark: true,
  },
  {
    name: 'Secondary text',
    token: 'ink-secondary',
    hex: '#4A4668',
    note: 'Card summaries, descriptions.',
    dark: true,
  },
  {
    name: 'Tertiary text',
    token: 'ink-tertiary',
    hex: '#6B6788',
    note: 'Captions, metadata, helper text.',
    dark: true,
  },
  {
    name: 'On-dark body',
    token: 'on-dark',
    hex: '#D9D6F2',
    note: 'Body and meta text on navy.',
  },
  {
    name: 'On-dark tint 1',
    token: 'on-dark-tint-1',
    hex: '#A9A6CF',
    note: 'Second tone in the services statement.',
  },
  {
    name: 'On-dark tint 2',
    token: 'on-dark-tint-2',
    hex: '#8581B5',
    note: 'Third tone in the services statement.',
    dark: true,
  },
];

const lines: Swatch[] = [
  {
    name: 'Divider (light)',
    token: 'divider',
    hex: '#DAD4E3',
    note: 'Rules and card borders on white.',
  },
  {
    name: 'Divider (cool)',
    token: 'divider-cool',
    hex: '#CBD3EC',
    note: 'Rules on cool; image placeholders, input borders.',
  },
  {
    name: 'Divider (dark)',
    token: 'divider-dark',
    hex: '#3B3580',
    note: 'Rules on navy, e.g. the footer.',
    dark: true,
  },
];

const pairings: [string, string, string, string][] = [
  ['White on Navy', '18.86', 'AA / AAA', 'Standard text on navy'],
  [
    'Magenta on Navy',
    '4.36',
    'AA large only',
    'Large text, emphasis words, buttons’ surround',
  ],
  [
    'Magenta on White',
    '4.33',
    'AA large only',
    'Headings, 14px+ bold labels, links',
  ],
  [
    'White on Magenta',
    '4.33',
    'AA large only',
    'Button text (14px bold, uppercase)',
  ],
  [
    'Magenta on Cool',
    '3.73',
    'Fails AA small text',
    'Use only at 24px+; avoid for small labels on cool',
  ],
  ['Navy on Cool', '16.26', 'AA / AAA', 'Headings on cool'],
  ['Body text on White', '13.92', 'AA / AAA', 'Article copy'],
  ['Secondary text on White', '8.87', 'AA / AAA', 'Card summaries'],
  ['Tertiary text on White', '5.36', 'AA', 'Captions'],
  ['On-dark body on Navy', '13.34', 'AA / AAA', 'Meta text on navy'],
];

type Specimen = {
  label: string;
  cls: string;
  spec: string;
  dark?: boolean;
  sample: React.ReactNode;
};

const scale: Specimen[] = [
  {
    label: 'Page headline (H1)',
    cls: 'type-page-headline',
    spec: 'Rift 112 / 0.95 · uppercase · white on navy',
    dark: true,
    sample: 'Case Studies',
  },
  {
    label: 'CTA / contact headline',
    cls: 'type-cta-headline',
    spec: 'Rift 104 / 0.95 · navy or white · magenta emphasis word',
    sample: (
      <>
        Have a <span className="text-magenta">challenge?</span>
      </>
    ),
  },
  {
    label: 'Section heading (H2)',
    cls: 'type-section-heading',
    spec: 'Rift 80 / 0.95 · navy on light, white on navy',
    sample: 'More in this series',
  },
  {
    label: 'Capability title / stat numeral',
    cls: 'type-capability',
    spec: 'Rift 96 / 0.95 · white on navy · magenta for stat numerals',
    sample: <span className="text-magenta">140+</span>,
  },
  {
    label: 'Tile title',
    cls: 'type-tile-title',
    spec: 'Rift 56 / 0.95 · white on photo tiles',
    dark: true,
    sample: 'Your publication next',
  },
  {
    label: 'Article subhead (H2)',
    cls: 'type-article-subhead !my-0',
    spec: 'Rift 60 / 0.95 · navy · 64px above, 20px below',
    sample: 'Quantifying success',
  },
  {
    label: 'Feature name (H3)',
    cls: 'type-feature-name',
    spec: 'Rift 72 / 0.95 · principal names, main service titles',
    sample: 'Colby Waller',
  },
  {
    label: 'Card title (H3)',
    cls: 'type-card-title',
    spec: 'Rift 40 / 0.95 · cards, team members, previous/next',
    sample: 'Aerospace America feature+',
  },
  {
    label: 'Statement',
    cls: 'type-statement',
    spec: 'Proxima Nova 56 / 1.15 · 800 · tone steps navy → lavender',
    sample: (
      <>
        UX Experts.{' '}
        <span className="text-on-dark-tint-2">Social Media Content.</span>
      </>
    ),
  },
  {
    label: 'Page lede',
    cls: 'type-page-lede',
    spec: 'Proxima Nova 26 / 1.4 · 500 · max 820–900px',
    sample: 'See how THOR has delivered for our clients.',
  },
  {
    label: 'Article lede',
    cls: 'type-article-lede',
    spec: 'Proxima Nova 26 / 1.55 · 500 · navy',
    sample:
      'At the core of every great website is compelling content and a complementary design.',
  },
  {
    label: 'Article body',
    cls: 'type-article-body',
    spec: 'Proxima Nova 19–20 / 1.65–1.75 · #2B2750 · 24px paragraph gap',
    sample:
      'THOR prefers to begin a discovery process with an introspective look at the organization. We perform a series of interviews that include key stakeholders.',
  },
  {
    label: 'Pull quote',
    cls: 'type-pull-quote',
    spec: 'Proxima Nova 34 / 1.3 · 600 · navy · 6px magenta left rule',
    sample: '“Often this is the most revealing part of our process.”',
  },
  {
    label: 'Card summary',
    cls: 'type-card-summary',
    spec: 'Proxima Nova 16 / 1.5 · secondary text',
    sample: 'Long-running custom editorial work for an aerospace publication.',
  },
  {
    label: 'Eyebrow / label',
    cls: 'type-eyebrow',
    spec: 'Proxima Nova 13 · 700 · tracking 0.16em · uppercase · magenta',
    sample: 'Construction / Engineering',
  },
  {
    label: 'Caption',
    cls: 'type-caption',
    spec: 'Proxima Nova 14 / 1.5 · tertiary text',
    sample: 'Caption: Describe the image. Image credit',
  },
  {
    label: 'Navigation',
    cls: 'type-nav',
    spec: 'Proxima Nova 15 · 400 · white on navy',
    dark: true,
    sample: (
      <span className="flex gap-8">
        <span>Case Studies</span>
        <span>How We Work</span>
        <span>About</span>
      </span>
    ),
  },
  {
    label: 'Footer links',
    cls: 'type-footer-link',
    spec: 'Proxima Nova 15 / 2.1 · column heads 13 · magenta · 0.12em',
    dark: true,
    sample: (
      <>
        <span className="type-footer-heading block">Explore our firm</span>
        <span className="block">Home</span>
        <span className="block">About / Team</span>
      </>
    ),
  },
];

const sections = ['Color', 'Typography', 'Buttons', 'Layout'];

function SectionTitle({
  num,
  title,
  id,
}: {
  num: string;
  title: string;
  id: string;
}) {
  return (
    <div
      id={id}
      className="scroll-mt-24 border-t border-divider pt-fluid-8 mb-fluid-8"
    >
      <p className="type-eyebrow mb-3">{num}</p>
      <h2 className="type-section-heading text-navy">{title}</h2>
    </div>
  );
}

function SwatchGrid({ title, items }: { title: string; items: Swatch[] }) {
  return (
    <div className="mb-fluid-8">
      <h3 className="type-eyebrow !text-navy mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {items.map((s) => (
          <div
            key={s.token}
            className="overflow-hidden rounded-lg border border-divider bg-white"
          >
            <div className="h-24" style={{ backgroundColor: s.hex }} />
            <div className="p-3">
              <p className="font-bold text-navy">{s.name}</p>
              <p className="font-mono text-xs text-ink-secondary">
                {s.hex} · {s.token}
              </p>
              <p className="type-caption mt-2">{s.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <SEO
        title="Style Guide | THOR"
        description="Internal style guide."
        canonicalUrl="https://www.thor-studio.com/styleguide"
      />
      <meta
        name="robots"
        content="noindex, nofollow, noarchive, noai, noimageai"
      />

      <div className="w-full bg-white text-ink">
        <header className="bg-navy px-fluid-6 pb-fluid-12 pt-40 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="type-eyebrow mb-4">THOR website redesign</p>
            <h1 className="type-page-headline">
              Style <span className="text-magenta">Guide</span>
            </h1>
            <p className="type-page-lede mt-fluid-4 text-on-dark">
              Color, type, controls and layout used across the redesigned pages.
              Type sizes are fluid: they scale from mobile at 375px up to the
              design spec at 1440px.
            </p>
            <nav
              className="mt-fluid-6 flex flex-wrap gap-3"
              aria-label="Style guide sections"
            >
              {sections.map((s) => (
                <a key={s} href={`#${s.toLowerCase()}`} className="chip">
                  {s}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-fluid-6 py-fluid-12">
          <SectionTitle num="01" title="Color" id="color" />
          <SwatchGrid title="Brand & surfaces" items={brand} />
          <SwatchGrid title="Text" items={text} />
          <SwatchGrid title="Lines" items={lines} />

          <h3 className="type-eyebrow !text-navy mb-4">Contrast pairings</h3>
          <div className="mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="type-eyebrow !text-ink-tertiary">
                <tr className="border-b border-divider">
                  <th className="py-2 pr-4">Pairing</th>
                  <th className="py-2 pr-4">Ratio</th>
                  <th className="py-2 pr-4">WCAG</th>
                  <th className="py-2">Use</th>
                </tr>
              </thead>
              <tbody>
                {pairings.map(([p, r, w, u]) => (
                  <tr key={p} className="border-b border-divider">
                    <td className="py-2 pr-4 font-semibold text-navy">{p}</td>
                    <td className="py-2 pr-4 font-mono">{r}</td>
                    <td
                      className={`py-2 pr-4 ${w.startsWith('Fails') ? 'font-bold text-magenta' : ''}`}
                    >
                      {w}
                    </td>
                    <td className="py-2 text-ink-secondary">{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="type-caption mb-fluid-12 max-w-3xl">
            Magenta is for large text, emphasis words, rules and buttons. Small
            magenta labels sit just under 4.5:1 on white and navy, so keep them
            short and bold, and use navy for small labels on cool.
          </p>

          <SectionTitle num="02" title="Typography" id="typography" />
          <div className="mb-fluid-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-navy p-fluid-6 text-white">
              <p className="type-eyebrow mb-4">Display · Rift</p>
              <p className="type-page-headline">Aa Bb 123</p>
              <p className="mt-4 text-on-dark">
                Headlines and section titles. Always uppercase, weight 600,
                line-height 0.95, tracking +0.01em. Fallback: Barlow Condensed.
              </p>
            </div>
            <div className="rounded-lg bg-cool p-fluid-6 text-navy">
              <p className="type-eyebrow !text-navy mb-4">
                Text · Proxima Nova
              </p>
              <p className="font-sans text-[length:var(--text-page-headline)] font-extrabold leading-none">
                Aa Bb 123
              </p>
              <p className="mt-4 text-ink-secondary">
                Body, navigation, labels, buttons. Weights 400, 500 (ledes),
                600, 700 (labels, buttons), 800 (statements). Fallback:
                Montserrat.
              </p>
            </div>
          </div>

          <div className="mb-fluid-12 divide-y divide-divider border-y border-divider">
            {scale.map((s) => (
              <div
                key={s.label}
                className="grid gap-4 py-fluid-6 md:grid-cols-[16rem_1fr]"
              >
                <div>
                  <p className="font-bold text-navy">{s.label}</p>
                  <p className="type-caption">{s.spec}</p>
                  <code className="mt-1 block text-xs text-magenta">
                    .{s.cls.split(' ')[0]}
                  </code>
                </div>
                <div
                  className={
                    s.dark
                      ? 'rounded-lg bg-navy p-fluid-4 text-white'
                      : 'text-navy'
                  }
                >
                  <div className={s.cls}>{s.sample}</div>
                </div>
              </div>
            ))}
          </div>

          <SectionTitle num="03" title="Buttons & controls" id="buttons" />
          <div className="mb-fluid-6 grid gap-4 md:grid-cols-3">
            <Control
              label="Primary button"
              spec="14 / 0.08em · padding 18×36 · pill · magenta"
              code=".btn .btn-primary"
            >
              <button className="btn btn-primary">Work with us</button>
            </Control>
            <Control
              label="Header button"
              spec="13 / 0.08em · padding 14×24 · pill"
              code=".btn .btn-primary .btn-header"
            >
              <button className="btn btn-primary btn-header">
                Work with us
              </button>
            </Control>
            <Control
              label="Outline button (on navy)"
              spec="14 / 0.08em · 2px white border · padding 18×36"
              code=".btn .btn-outline"
              dark
            >
              <button className="btn btn-outline">Work with us</button>
            </Control>
            <Control
              label="Filter / jump chip"
              spec="13 / 0.08em · 2px border · padding 10×18 · active = magenta"
              code=".chip .chip-active"
              dark
            >
              <div className="flex gap-2">
                <button className="chip">Health care</button>
                <button className="chip chip-active">All</button>
              </div>
            </Control>
            <Control
              label="Chip on light"
              spec="#CBD3EC border, navy text"
              code=".chip .chip-light"
            >
              <div className="flex gap-2">
                <button className="chip chip-light">Health care</button>
                <button className="chip chip-light chip-active">All</button>
              </div>
            </Control>
            <Control
              label="Tag"
              spec="13 / 0.08em · cool fill · padding 10×18 · pill"
              code=".tag"
            >
              <span className="tag">Web discovery</span>
            </Control>
            <Control
              label="Text link (prose)"
              spec="Magenta · underline · 3px offset"
              code=".link-prose"
            >
              <p className="type-article-body">
                Read the{' '}
                <a href="#buttons" className="link-prose">
                  link to a related article
                </a>
                .
              </p>
            </Control>
            <Control
              label="Card link"
              spec="Magenta 13 · 0.1em · uppercase"
              code=".link-card"
            >
              <a href="#buttons" className="link-card">
                Read article
              </a>
            </Control>
            <Control
              label="Text field"
              spec="Radius 8 · 1px #CBD3EC · padding 14×16 · 16px"
              code=".text-field"
            >
              <input
                className="text-field"
                placeholder="Tell us a bit about your project"
                aria-label="Example text field"
              />
            </Control>
          </div>
          <p className="type-caption mb-fluid-12 max-w-3xl">
            Hover reduces opacity to 0.8 on all links and buttons. Focus uses a
            2px magenta outline with a 2px offset (tab through this page to see
            it).
          </p>

          <SectionTitle num="04" title="Layout & spacing" id="layout" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [
                'Page width',
                '1600px content canvas; 1350px page hero. The case-study landing is the implementation baseline.',
                '--layout-page / --layout-hero',
              ],
              [
                'Article column',
                '800px maximum reading column. Page gutters reuse the existing fluid-6 spacing.',
                '--layout-article / --layout-gutter',
              ],
              [
                'Section rhythm',
                'Fluid-12 section spacing: 48–96px. Sticky sections clear the retained header by 96px on mobile and 112px from 640px.',
                '--layout-section / --site-header-clearance',
              ],
            ].map(([title, description, token]) => (
              <div
                key={title}
                className="rounded-lg border border-divider-cool p-fluid-4"
              >
                <p className="type-eyebrow !text-navy">{title}</p>
                <p className="type-card-summary mt-3">{description}</p>
                <p className="type-caption mt-3 font-mono break-words">
                  {token}
                </p>
              </div>
            ))}
          </div>
          <p className="type-caption mt-fluid-6">
            Keep the current header, footer and motion patterns. New page bodies
            extend this baseline; the exported header and footer are not
            replacements.
          </p>
        </main>
      </div>
    </>
  );
}

function Control({
  label,
  spec,
  code,
  dark,
  children,
}: {
  label: string;
  spec: string;
  code: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-divider">
      <div
        className={`flex min-h-32 items-center justify-center p-fluid-4 ${dark ? 'bg-navy' : 'bg-white'}`}
      >
        {children}
      </div>
      <div className="border-t border-divider bg-white p-3">
        <p className="font-bold text-navy">{label}</p>
        <p className="type-caption">{spec}</p>
        <code className="text-xs text-magenta">{code}</code>
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
