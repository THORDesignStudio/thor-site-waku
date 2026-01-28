'use client';

import { Drawer as VaulDrawer } from 'vaul';

interface Item {
  name: string;
  description: string;
  url: string;
  skills: string[];
}

interface DrawerProps {
  item: Item | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Drawer({ item, open, onOpenChange }: DrawerProps) {
  if (!item) return null;

  return (
    <VaulDrawer.Root open={open} onOpenChange={onOpenChange}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-night/85 z-100" />
        <VaulDrawer.Content className="fixed bottom-0 left-0 right-0 z-100 flex justify-center outline-none">
          <div className="w-full max-w-6xl bg-cream rounded-t-3xl h-[85vh] overflow-hidden flex flex-col">
            {/* Drag handle indicator */}
            <div className="flex justify-center pt-fluid-2 pb-fluid-1">
              <VaulDrawer.Handle className="w-12 h-1.5 bg-night/20 rounded-full" />
            </div>

            {/* Header with close button */}
            <div className="flex justify-end px-fluid-4 pb-fluid-1">
              <VaulDrawer.Close asChild>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-night/10 hover:bg-night/20 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    className="w-5 h-5 text-night"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </VaulDrawer.Close>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto px-fluid-6 pb-fluid-8">
              {/* Item content */}
              <div className="text-night">
                <VaulDrawer.Title className="heading-lg mb-4">
                  {item.name}
                </VaulDrawer.Title>
                <VaulDrawer.Description className="body-lg text-night/70 mb-8 max-w-2xl">
                  {item.description}
                </VaulDrawer.Description>

                {/* Items list */}
                <div className="mb-8">
                  <h2 className="heading-sm mb-4 text-night/90">What we do</h2>
                  <ul className="grid gap-3">
                    {item.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-3 body-md text-night/80"
                      >
                        <span className="w-2 h-2 rounded-full bg-pink shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <button className="px-8 py-4 bg-pink text-white rounded-full hover:bg-pink-dark transition-colors body-md font-medium">
                    Start a Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
