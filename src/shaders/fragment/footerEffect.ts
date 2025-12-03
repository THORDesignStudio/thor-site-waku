import { noiseUtils } from '../utils/noiseUtils';
import { simplex_noise } from '../utils/simplexNoise';
import {
  CreateFragmentShader,
  FragmentShaderUniforms,
} from '../../types/shader';

// Adapated from Alex Harri's incredible shader walkthrough:
// https://alexharri.com/blog/webgl-gradients
const createFragmentShader: CreateFragmentShader = () => {
  const uniforms: FragmentShaderUniforms = {};
  const shader = /* glsl */ `
    precision highp float;

    uniform float u_time;
    uniform float u_h;
    uniform sampler2D u_gradient;

    float WAVE1_HEIGHT = u_h * 0.12;
    float WAVE2_HEIGHT = u_h * 0.16;
    float WAVE1_Y = 0.80 * u_h;
    float WAVE2_Y = 0.35 * u_h;

    float PI = ${Math.PI.toFixed(10)};

    ${noiseUtils}
    ${simplex_noise}

    float smoothstep(float t)
      { return t * t * t * (t * (6.0 * t - 15.0) + 10.0); }
    
    float calc_blur(float offset) {
      const float BLUR_AMOUNT = 130.0;
      const float L = 0.0018;
      const float S = 0.1;
      const float F = 0.034;
      
      float x = gl_FragCoord.x;
      float time = u_time * 0.5 + offset;
      float blur_t = (simplex_noise(vec2(x * L + F * time, time * S)) + 1.0) / 2.0;
      blur_t = pow(blur_t, 1.8);
      
      float blur = mix(1.0, 1.0 + BLUR_AMOUNT, blur_t);
      return blur;
    }

    float noise(float x, float offset) {
      const float L = 0.0012;
      const float S = 0.04;
      const float F = 0.031;

      float t = u_time * 0.5 + offset;

      float sum = 0.0;
      sum += simplex_noise(vec2(x * (L / 1.00) + F * t, t * S * 1.00)) * 0.85;
      sum += simplex_noise(vec2(x * (L / 1.30) + F * t, t * S * 1.26)) * 1.15;
      sum += simplex_noise(vec2(x * (L / 1.86) + F * t, t * S * 1.09)) * 0.60;
      sum += simplex_noise(vec2(x * (L / 3.25) + F * t, t * S * 0.89)) * 0.40;
      return sum;
    }

    float wave_alpha(float Y, float wave_height, float offset) {
      float x = gl_FragCoord.x;
      float y = gl_FragCoord.y;

      float wave_y = Y + noise(x, offset) * wave_height;
      
      float dist = wave_y - y;
      float blur = calc_blur(offset);
      blur *= 2.5;

      float alpha = clamp(0.5 + dist / blur, 0.0, 1.0);
      alpha = smoothstep(alpha);
      return alpha;
    }
      
    float background_noise(float offset) {
      const float L = 0.0015;
      const float F = 0.11;
      const float S = 0.13;
      const float Y_SCALE = 3.0;

      float x = gl_FragCoord.x;
      float y = gl_FragCoord.y * Y_SCALE;

      float time = u_time * 0.5 + offset;
      
      float sum = 0.5;
      sum += simplex_noise(vec3(x * L + F, y * L, time * S)) * 0.35;
      sum += simplex_noise(vec3(x * L * 0.6 - F * 0.6, y * L * 0.85, time * S)) * 0.30;
      return clamp(sum, 0.0, 1.0);
    }

    float screenPattern(vec2 fragCoord) {
      
      const float SPACING = 6.0; // Distance between dot centers in pixels
      
      const float RADIUS = 2.0; // Dot radius and softness
      const float EDGE   = 1.5; // Dot edge softness
      
      vec2 cell = mod(fragCoord, SPACING) - vec2(SPACING * 0.5); // Move into a repeating grid cell
      
      float d = length(cell); // Distance from the center of the cell
      
      float dot = 1.0 - smoothstep(RADIUS, RADIUS + EDGE, d); // Soft circular dot: 1 at center, fades to 0

      return dot; // 0..1
    }

    void main() {
      float w1_alpha = wave_alpha(WAVE1_Y, WAVE1_HEIGHT, 3840.0);
      float w2_alpha = wave_alpha(WAVE2_Y, WAVE2_HEIGHT, 2240.0);
      
      float bg_lightness = background_noise(0.0);
      float w1_lightness = background_noise(200.0);
      float w2_lightness = background_noise(400.0);

      float lightness = bg_lightness;
      lightness = mix(lightness, w1_lightness, w1_alpha);
      lightness = mix(lightness, w2_lightness, w2_alpha);

      // Treat base color as the background 
      vec4 baseColor = texture2D(u_gradient, vec2(lightness, 0.5));

      // Screen pattern
      float mask = screenPattern(gl_FragCoord.xy);

      // Darken the base color to simulate the “material” of the screen
      vec3 darkLayer = baseColor.rgb * 0.45;

      // mask value will end up being 0 or 1, so we can use it to mix between the dark layer and the base color
      vec3 finalRgb = mix(darkLayer, baseColor.rgb, mask);

      gl_FragColor = vec4(finalRgb, 1.0);
    }
  `;
  return { shader, uniforms };
};

export default createFragmentShader;
