'use client';

import { useRouter } from 'waku/router/client';
import { ProgramDrawer } from './ProgramDrawer';
import type { Program } from '../data/programs';

interface ProgramPageClientProps {
  program: Program;
}

export function ProgramPageClient({ program }: ProgramPageClientProps) {
  const router = useRouter();

  const handleClose = () => {
    // Update URL to homepage when drawer closes (keeps URL in sync)
    router.replace('/');
  };

  return <ProgramDrawer program={program} onClose={handleClose} />;
}
