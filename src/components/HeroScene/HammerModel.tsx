'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const HERO_HAMMER_PATH = '/3d-objects/hammer-hero-v4.glb';

export function HammerModel() {
  const groupRef = useRef<THREE.Group>(null);
  const pinkLightRef = useRef<THREE.SpotLight>(null);
  const blueLightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);
  const { scene } = useGLTF(HERO_HAMMER_PATH);
  const rotation = useRef(0);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (pinkLightRef.current && targetRef.current) {
      pinkLightRef.current.target = targetRef.current;
    }
    if (blueLightRef.current && targetRef.current) {
      blueLightRef.current.target = targetRef.current;
    }
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const clampedDelta = Math.min(delta, 0.1);
    rotation.current += clampedDelta * 0.3;
    groupRef.current.rotation.y = rotation.current;
  });

  return (
    <>
      {/* Light target at hammer center */}
      <object3D ref={targetRef} position={[0, 0, 0]} />

      {/* Minimal ambient - keep scene dark for dramatic effect */}
      <ambientLight intensity={0.08} />

      {/* Pink rim light - behind and to the left */}
      <spotLight
        ref={pinkLightRef}
        position={[-4, 3, -2]}
        angle={0.9}
        penumbra={0.4}
        intensity={150}
        color="#FC319B"
        castShadow={false}
      />

      {/* Blue key light - front and to the right */}
      <spotLight
        ref={blueLightRef}
        position={[4, 2, 4]}
        angle={0.9}
        penumbra={0.4}
        intensity={130}
        color="#269BF6"
        castShadow={false}
      />

      {/* Blue point light for right side fill - hits handle and head */}
      <pointLight position={[3, 2, 3]} intensity={80} color="#269BF6" />

      {/* Pink point light for left side fill - hits handle and head */}
      <pointLight position={[-3, 2, 0]} intensity={40} color="#FC319B" />

      {/* Upper lights to illuminate the handle better */}
      <pointLight position={[1, 4, 2]} intensity={75} color="#269BF6" />
      <pointLight position={[-1, 4, 0]} intensity={75} color="#FC319B" />

      <group ref={groupRef}>
        <primitive object={scene} scale={2.6} position={[0, -0.25, 0]} />
      </group>
    </>
  );
}

useGLTF.preload(HERO_HAMMER_PATH);
