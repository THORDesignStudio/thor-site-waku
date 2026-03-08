'use client';

import { useState } from 'react';
import { Drawer } from './Drawer';
import type { Program } from '../data/programs';

interface ProgramDrawerProps {
  program: Program;
  onClose?: () => void;
}

export function ProgramDrawer({ program, onClose }: ProgramDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      // Small delay to allow exit animation to complete
      setTimeout(() => onClose(), 300);
    }
  };

  // Adapt Program to the Drawer's Item interface
  const item = {
    name: program.name,
    description: program.description,
    url: program.url,
    skills: [], // Programs don't have skills - Drawer will hide this section
  };

  return <Drawer item={item} open={isOpen} onOpenChange={handleOpenChange} />;
}
