'use client';

import { useState } from 'react';
import { Drawer } from './Drawer';
import type { Capability } from '../data/capabilities';

interface CapabilityDrawerProps {
  capability: Capability;
  onClose?: () => void;
}

export function CapabilityDrawer({ capability, onClose }: CapabilityDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      // Small delay to allow exit animation to complete
      setTimeout(() => onClose(), 300);
    }
  };

  // Adapt Capability to the Drawer's Item interface
  const item = {
    name: capability.name,
    description: capability.description,
    url: capability.url,
    skills: [], // Capabilities don't have skills - Drawer will hide this section
  };

  return <Drawer item={item} open={isOpen} onOpenChange={handleOpenChange} />;
}
