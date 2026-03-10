'use client';

import { Canvas } from '@react-three/fiber';
import { HammerModel } from './HammerModel';

export function HeroCanvas() {
  return (
    <Canvas
      shadows
      className="w-full h-full"
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
    >
      <HammerModel />
    </Canvas>
  );
}
