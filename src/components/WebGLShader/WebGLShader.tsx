'use client';

import { useEffect, useRef } from 'react';
import { WebGLRenderer } from './WebGLRenderer';
import defaultVertexShader from '../../shaders/vertex/default';
import footerEffectShader from '../../shaders/fragment/footerEffect';
import { clamp } from '../../utils/lerp';
import { useViewportWidth } from '../../hooks/useViewportWidth';

// Constants
const DEFAULT_HEIGHT = 250;
const SKEW_DEG = 6;

// Color gradient configuration
const DEFAULT_GRADIENT = [
  'hsl(240deg 100% 20%)',
  'hsl(281deg 100% 21%)',
  'hsl(304deg 100% 23%)',
  'hsl(319deg 100% 30%)',
  'hsl(329deg 100% 36%)',
  'hsl(336deg 100% 41%)',
  'hsl(346deg 83% 51%)',
  'hsl(3deg 95% 61%)',
  'hsl(17deg 100% 59%)',
  'hsl(30deg 100% 55%)',
  'hsl(40deg 100% 50%)',
  'hsl(48deg 100% 50%)',
  'hsl(55deg 100% 50%)',
];

const THOR_GRADIENT = [
  'hsl(255deg 59.5% 14.5%)', // deep blue almost purple
  'hsl(226deg 54% 19.6%)', // flat gray-blue
  'hsl(281deg 63.4% 27.8%)', // spicy purple
  'hsl(319deg 96.4% 32.9%)', // flat pink
  'hsl(328deg 100% 40.6%)', // bold pink
  'hsl(337deg 100% 48.2%)', // kinda salmon pink
];

const colorConfiguration = {
  gradient: THOR_GRADIENT,
};

function calculateWebGLCanvasDimensions(
  props: WebGLShaderProps,
  viewportWidth: number
) {
  let { height = DEFAULT_HEIGHT } = props;

  const width = clamp(
    viewportWidth,
    props.minWidth ?? props.width ?? viewportWidth,
    props.width ?? viewportWidth
  );
  if (props.maintainHeight != null) {
    const fac = (Math.max(1, width / viewportWidth) - 1) * props.maintainHeight;
    height *= 1 + fac;
  }
  height = Math.round(height); // A fractional canvas height causes visual artifacts

  return [width, height];
}

export interface WebGLShaderProps {
  skew?: boolean;
  width?: number;
  minWidth?: number;
  maintainHeight?: number;
  height?: number;
  animate?: boolean;
  seed?: number;
}

// Adapted from Alex Harri's incredible shader tutorial:
// https://alexharri.com/blog/webgl-gradients
export const WebGLShader: React.FC<WebGLShaderProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { animate = true, skew } = props;

  const viewportWidth = useViewportWidth()!;
  const [width, height] = calculateWebGLCanvasDimensions(props, viewportWidth);

  const idealScale = Math.min(1, viewportWidth / width!);
  const canvasScale = Math.ceil(height! * idealScale) / height!;

  // Use the footer gradient shader
  const shaderResult = footerEffectShader({});
  const fragmentShader =
    typeof shaderResult === 'string' ? shaderResult : shaderResult.shader;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new WebGLRenderer(
      canvas,
      defaultVertexShader,
      fragmentShader,
      colorConfiguration,
      props.seed
    );
    if (!animate) renderer.setTimeSpeed(0, 0);

    let resized = true;
    let stop = false;

    function tick() {
      if (stop) return;
      requestAnimationFrame(tick);

      // handle resize if needed
      if (resized) {
        const [width, height] = calculateWebGLCanvasDimensions(
          props,
          window.innerWidth
        );
        renderer.setDimensions(width!, height!);
        resized = false;
      }

      // render the canvas, main function
      renderer.render();
    }
    tick();

    const resizeListener = () => (resized = true);
    window.addEventListener('resize', resizeListener);
    return () => {
      stop = true;
      window.removeEventListener('resize', resizeListener);
    };
  }, [animate]);

  return (
    <div
      className="relative max-w-full"
      style={{
        width,
        ...(skew && { transform: `skewY(-${SKEW_DEG}deg)` }),
      }}
    >
      <div style={{ paddingTop: `${(height! / width!) * 100}%` }} />
      <canvas
        ref={canvasRef}
        width={width!}
        height={height!}
        className="absolute top-0 left-0"
        style={{
          transform: `scale(${canvasScale})`,
          transformOrigin: '0 0',
        }}
      />
    </div>
  );
};
