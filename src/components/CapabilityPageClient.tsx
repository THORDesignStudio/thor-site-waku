'use client';

import { useRouter } from 'waku/router/client';
import { CapabilityDrawer } from './CapabilityDrawer';
import type { Capability } from '../data/capabilities';

interface CapabilityPageClientProps {
  capability: Capability;
}

export function CapabilityPageClient({ capability }: CapabilityPageClientProps) {
  const router = useRouter();

  const handleClose = () => {
    // Update URL to homepage when drawer closes (keeps URL in sync)
    router.replace('/');
  };

  return <CapabilityDrawer capability={capability} onClose={handleClose} />;
}
