import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

// ── Shaders ─────────────────────────────────────────────────────────────

const PARTICLE_VERTEX = `
attribute float aSize;
attribute float aOpacity;
varying float vOpacity;

void main() {
  vOpacity = aOpacity;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const PARTICLE_FRAGMENT = `
varying float vOpacity;
uniform vec3 uColor;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;
  // Gaussian falloff for soft glowing orb look (not hard circle)
  float alpha = exp(-dist * dist * 7.0) * vOpacity;
  gl_FragColor = vec4(uColor, alpha);
}
`;

const LINE_VERTEX = `
attribute float aLineOpacity;
varying float vLineOpacity;

void main() {
  vLineOpacity = aLineOpacity;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const LINE_FRAGMENT = `
varying float vLineOpacity;
uniform vec3 uLineColor;

void main() {
  gl_FragColor = vec4(uLineColor, vLineOpacity);
}
`;

interface ParticleFieldProps {
  className?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();

    // Orthographic mapping 1:1 with screen pixels
    const camera = new THREE.OrthographicCamera(0, width, 0, height, 0.1, 1000);
    // Position at +300 to balance the vertex shader's (300.0 / -mvPosition.z) ratio to 1.0 scale
    camera.position.set(0, 0, 300);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;';
    container.appendChild(renderer.domElement);

    const noise = createNoise2D();

    // ── Global Cursor State ──
    const cursor = { x: -9999, y: -9999, vx: 0, vy: 0, speed: 0 };
    let lastCursorX = -9999;
    let lastCursorY = -9999;
    let lastMoveTime = 0;

    // ── 1. DORMANT FIELD ──
    const DORMANT_COUNT = 300;
    const dBaseX = new Float32Array(DORMANT_COUNT);
    const dBaseY = new Float32Array(DORMANT_COUNT);
    const dCurrX = new Float32Array(DORMANT_COUNT);
    const dCurrY = new Float32Array(DORMANT_COUNT);
    const dOpacity = new Float32Array(DORMANT_COUNT);
    const dTargetOpacity = new Float32Array(DORMANT_COUNT);
    const dSize = new Float32Array(DORMANT_COUNT);
    const dRenderedSize = new Float32Array(DORMANT_COUNT);
    const dColorType = new Uint8Array(DORMANT_COUNT); // 0=cyan, 1=purple

    let initX = 0, initY = 0;
    for (let i = 0; i < DORMANT_COUNT; i++) {
      initX = Math.random() * width;
      initY = Math.random() * height;
      dBaseX[i] = initX;
      dBaseY[i] = initY;
      dCurrX[i] = initX;
      dCurrY[i] = initY;
      dOpacity[i] = 0;
      dTargetOpacity[i] = 0;
      dSize[i] = 2.5 + Math.random() * 2.0; // 2.5 to 4.5
      dColorType[i] = Math.random() < 0.60 ? 0 : 1;
    }

    // ── 2. CURSOR TRAIL POOL (150) ──
    const TRAIL_COUNT = 150;
    const trailPool = Array.from({ length: TRAIL_COUNT }, () => ({
      active: false,
      x: 0, y: 0,
      vx: 0, vy: 0,
      opacity: 0,
      birthTime: 0,
      lifetime: 0,
      size: 0,
      colorType: 0
    }));

    // Pre-allocated Particle Geometry (Dormant + Trail = 650 buffers per geometry max)
    const MAX_PARTICLES = 650;
    const cyanGeometry = new THREE.BufferGeometry();
    const purpleGeometry = new THREE.BufferGeometry();

    const cyanPositions = new Float32Array(MAX_PARTICLES * 3);
    const cyanSizes = new Float32Array(MAX_PARTICLES);
    const cyanOpacities = new Float32Array(MAX_PARTICLES);

    const purplePositions = new Float32Array(MAX_PARTICLES * 3);
    const purpleSizes = new Float32Array(MAX_PARTICLES);
    const purpleOpacities = new Float32Array(MAX_PARTICLES);

    cyanGeometry.setAttribute('position', new THREE.BufferAttribute(cyanPositions, 3));
    cyanGeometry.setAttribute('aSize', new THREE.BufferAttribute(cyanSizes, 1));
    cyanGeometry.setAttribute('aOpacity', new THREE.BufferAttribute(cyanOpacities, 1));

    purpleGeometry.setAttribute('position', new THREE.BufferAttribute(purplePositions, 3));
    purpleGeometry.setAttribute('aSize', new THREE.BufferAttribute(purpleSizes, 1));
    purpleGeometry.setAttribute('aOpacity', new THREE.BufferAttribute(purpleOpacities, 1));

    const CYAN_COLOR = new THREE.Color(0.0, 0.831, 1.0);     // #00D4FF
    const PURPLE_COLOR = new THREE.Color(0.486, 0.227, 0.929); // #7C3AED
    const WHITE_COLOR = new THREE.Color(1.0, 1.0, 1.0);      // #FFFFFF

    const createParticleMat = (color: THREE.Color) => new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: color } },
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
    });

    const cyanMaterial = createParticleMat(CYAN_COLOR);
    const purpleMaterial = createParticleMat(PURPLE_COLOR);

    const cyanPoints = new THREE.Points(cyanGeometry, cyanMaterial);
    const purplePoints = new THREE.Points(purpleGeometry, purpleMaterial);
    scene.add(cyanPoints);
    scene.add(purplePoints);

    // ── 3. CONSTELLATION LINES (max 600) ──
    const MAX_LINES = 600;
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineOpacities = new Float32Array(MAX_LINES * 2);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('aLineOpacity', new THREE.BufferAttribute(lineOpacities, 1));

    const lineMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uLineColor: { value: CYAN_COLOR } },
      vertexShader: LINE_VERTEX,
      fragmentShader: LINE_FRAGMENT,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // ── 4. NEURAL SIGNAL PULSES (max 20) ──
    const PULSE_COUNT = 20;
    const pulsePool = Array.from({ length: PULSE_COUNT }, () => ({
      active: false,
      startX: 0, startY: 0,
      endX: 0, endY: 0,
      progress: 0,
      speed: 0,
      opacity: 0,
    }));
    const pulsePositions = new Float32Array(PULSE_COUNT * 3);
    const pulseSizes = new Float32Array(PULSE_COUNT);
    const pulseOpacities = new Float32Array(PULSE_COUNT);

    pulseSizes.fill(5.0); // Static size for pulses

    const pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    pulseGeometry.setAttribute('aSize', new THREE.BufferAttribute(pulseSizes, 1));
    pulseGeometry.setAttribute('aOpacity', new THREE.BufferAttribute(pulseOpacities, 1));

    const pulseMaterial = createParticleMat(WHITE_COLOR);
    const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
    scene.add(pulsePoints);

    // ── Interaction Logic ──
    const handleMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;

      if (lastCursorX === -9999) {
        lastCursorX = cursor.x;
        lastCursorY = cursor.y;
      }

      const dx = cursor.x - lastCursorX;
      const dy = cursor.y - lastCursorY;
      cursor.speed = Math.hypot(dx, dy);
      lastMoveTime = performance.now();

      // Spawn trail
      const spawnCount = Math.min(Math.floor(cursor.speed / 12), 5);
      for (let i = 0; i < spawnCount; i++) {
        const inactive = trailPool.find(p => !p.active);
        const p = inactive || trailPool.reduce((orig, cur) => cur.birthTime < orig.birthTime ? cur : orig);

        p.active = true;
        p.x = cursor.x + (Math.random() - 0.5) * 30;
        p.y = cursor.y + (Math.random() - 0.5) * 30;
        p.vx = (Math.random() - 0.5) * 0.4;
        p.vy = (Math.random() - 0.5) * 0.4;
        p.opacity = 0;
        p.birthTime = performance.now();
        p.lifetime = 2500 + Math.random() * 700;
        p.size = 2.5 + Math.random() * 2.5;
        p.colorType = Math.random() < 0.65 ? 0 : 1;
      }

      lastCursorX = cursor.x;
      lastCursorY = cursor.y;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);
      camera.left = 0;
      camera.right = width;
      camera.top = 0;
      camera.bottom = height;
      camera.updateProjectionMatrix();

      // Scaled redistribution
      for (let i = 0; i < DORMANT_COUNT; i++) {
        dBaseX[i] = Math.random() * width;
        dBaseY[i] = Math.random() * height;
      }
    };

    window.addEventListener('pointermove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Pre-allocate visible array for lines rendering evaluation
    const visibleParticles = new Float32Array(MAX_PARTICLES * 3); // stride: x, y, opacity

    let lastTime = performance.now();
    let lastPulseTime = 0;

    // ── Core Animation Loop ──
    renderer.setAnimationLoop((time) => {
      const now = performance.now();
      let deltaTime = now - lastTime;
      if (deltaTime > 50) deltaTime = 50; // clamp for large lag spikes / unfocus
      lastTime = now;

      let cIdx = 0, pIdx = 0;
      let visCount = 0;

      const actRadius = 300;

      // 1. Process Dormant Field
      for (let i = 0; i < DORMANT_COUNT; i++) {
        const n1 = noise(dBaseX[i] * 0.0015 + time * 0.0004, dBaseY[i] * 0.0015 + time * 0.0004);
        const n2 = noise(dBaseY[i] * 0.0015 + time * 0.0004 + 100, dBaseX[i] * 0.0015 + time * 0.0004);

        dCurrX[i] = dBaseX[i] + n1 * 80;
        dCurrY[i] = dBaseY[i] + n2 * 80;

        // Proximity calculation
        if (cursor.x !== -9999) {
          const dx = dCurrX[i] - cursor.x;
          const dy = dCurrY[i] - cursor.y;
          const dist = Math.hypot(dx, dy);

          if (dist < actRadius) {
            const prox = 1.0 - (dist / actRadius);
            dTargetOpacity[i] = prox * prox * 1.0;
            const boost = Math.max(0, 1 - dist / 120) * 3.0;
            dRenderedSize[i] = dSize[i] + boost;
          } else {
            dTargetOpacity[i] = 0;
            dRenderedSize[i] = dSize[i];
          }
        }

        // Smooth Lerp
        const rate = dTargetOpacity[i] > dOpacity[i] ? 0.08 : 0.025;
        dOpacity[i] += (dTargetOpacity[i] - dOpacity[i]) * rate;

        if (dOpacity[i] > 0.01) {
          if (dColorType[i] === 0) {
            cyanPositions[cIdx * 3] = dCurrX[i];
            cyanPositions[cIdx * 3 + 1] = dCurrY[i];
            cyanPositions[cIdx * 3 + 2] = 0;
            cyanSizes[cIdx] = dRenderedSize[i];
            cyanOpacities[cIdx] = dOpacity[i];
            cIdx++;
          } else {
            purplePositions[pIdx * 3] = dCurrX[i];
            purplePositions[pIdx * 3 + 1] = dCurrY[i];
            purplePositions[pIdx * 3 + 2] = 0;
            purpleSizes[pIdx] = dRenderedSize[i];
            purpleOpacities[pIdx] = dOpacity[i];
            pIdx++;
          }

          if (dOpacity[i] > 0.06) {
            visibleParticles[visCount * 3] = dCurrX[i];
            visibleParticles[visCount * 3 + 1] = dCurrY[i];
            visibleParticles[visCount * 3 + 2] = dOpacity[i];
            visCount++;
          }
        }
      }

      // 2. Process Trail Pool
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const tp = trailPool[i];
        if (!tp.active) continue;

        const age = now - tp.birthTime;
        const pLife = age / tp.lifetime;

        if (pLife < 0.12) {
          tp.opacity = (pLife / 0.12) * 1.0;
        } else if (pLife < 0.7) {
          tp.opacity = 1.0;
        } else {
          tp.opacity = ((1 - pLife) / 0.3) * 1.0;
        }

        // Simplex drift for trail
        const n = noise(tp.x * 0.003 + time * 0.0005, tp.y * 0.003 + time * 0.0005);
        tp.vx += n * 0.035;
        tp.vy += n * 0.035;
        tp.vx *= 0.96;
        tp.vy *= 0.96;
        tp.x += tp.vx * deltaTime * 0.06;
        tp.y += tp.vy * deltaTime * 0.06;

        if (age >= tp.lifetime) {
          tp.active = false;
          continue;
        }

        if (tp.opacity > 0.01) {
          if (tp.colorType === 0) {
            cyanPositions[cIdx * 3] = tp.x;
            cyanPositions[cIdx * 3 + 1] = tp.y;
            cyanPositions[cIdx * 3 + 2] = 0;
            cyanSizes[cIdx] = tp.size;
            cyanOpacities[cIdx] = tp.opacity;
            cIdx++;
          } else {
            purplePositions[pIdx * 3] = tp.x;
            purplePositions[pIdx * 3 + 1] = tp.y;
            purplePositions[pIdx * 3 + 2] = 0;
            purpleSizes[pIdx] = tp.size;
            purpleOpacities[pIdx] = tp.opacity;
            pIdx++;
          }

          if (tp.opacity > 0.06) {
            visibleParticles[visCount * 3] = tp.x;
            visibleParticles[visCount * 3 + 1] = tp.y;
            visibleParticles[visCount * 3 + 2] = tp.opacity;
            visCount++;
          }
        }
      }

      cyanGeometry.setDrawRange(0, cIdx);
      if (cIdx > 0) {
        cyanGeometry.attributes.position.needsUpdate = true;
        cyanGeometry.attributes.aSize.needsUpdate = true;
        cyanGeometry.attributes.aOpacity.needsUpdate = true;
      }
      purpleGeometry.setDrawRange(0, pIdx);
      if (pIdx > 0) {
        purpleGeometry.attributes.position.needsUpdate = true;
        purpleGeometry.attributes.aSize.needsUpdate = true;
        purpleGeometry.attributes.aOpacity.needsUpdate = true;
      }

      // 3. Process Constellations
      let lineIdx = 0;
      const CONN_DIST = 160;
      const validLines = [];

      for (let i = 0; i < visCount; i++) {
        for (let j = i + 1; j < visCount; j++) {
          if (lineIdx >= MAX_LINES) break;
          const ix = visibleParticles[i * 3];
          const iy = visibleParticles[i * 3 + 1];
          const io = visibleParticles[i * 3 + 2];

          const jx = visibleParticles[j * 3];
          const jy = visibleParticles[j * 3 + 1];
          const jo = visibleParticles[j * 3 + 2];

          const dxi = ix - jx;
          const dyi = iy - jy;
          const dSq = dxi * dxi + dyi * dyi;

          if (dSq < CONN_DIST * CONN_DIST) {
            const dist = Math.sqrt(dSq);
            const distFac = 1 - (dist / CONN_DIST);
            const pFac = Math.min(io, jo);
            const lOp = distFac * pFac * 0.65;

            if (lOp > 0.005) {
              const blp = lineIdx * 6;
              linePositions[blp] = ix;
              linePositions[blp + 1] = iy;
              linePositions[blp + 2] = 0;
              linePositions[blp + 3] = jx;
              linePositions[blp + 4] = jy;
              linePositions[blp + 5] = 0;

              const bop = lineIdx * 2;
              lineOpacities[bop] = lOp; // A
              lineOpacities[bop + 1] = lOp; // B

              if (lOp > 0.15 && validLines.length < 50) {
                validLines.push({ x1: ix, y1: iy, x2: jx, y2: jy });
              }
              lineIdx++;
            }
          }
        }
        if (lineIdx >= MAX_LINES) break;
      }

      lineGeometry.setDrawRange(0, lineIdx * 2);
      if (lineIdx > 0) {
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.aLineOpacity.needsUpdate = true;
      }

      // 4. Process Neural Pulses
      if (validLines.length > 3 && now - lastPulseTime > 180) {
        const line = validLines[Math.floor(Math.random() * validLines.length)];
        const fresh = pulsePool.find(p => !p.active);
        if (fresh && line) {
          fresh.active = true;
          fresh.startX = line.x1;
          fresh.startY = line.y1;
          fresh.endX = line.x2;
          fresh.endY = line.y2;
          fresh.progress = 0;
          fresh.speed = 0.0008 + Math.random() * 0.0006;
          lastPulseTime = now;
        }
      }

      let activePulses = 0;
      for (let i = 0; i < PULSE_COUNT; i++) {
        const pl = pulsePool[i];
        if (!pl.active) continue;

        pl.progress += pl.speed * deltaTime;
        const tp = pl.progress;

        if (tp < 0.2) pl.opacity = tp / 0.2;
        else if (tp < 0.8) pl.opacity = 1.0;
        else pl.opacity = (1 - tp) / 0.2;

        if (tp >= 1.0) {
          pl.active = false;
          continue;
        }

        pulsePositions[activePulses * 3] = pl.startX + (pl.endX - pl.startX) * tp;
        pulsePositions[activePulses * 3 + 1] = pl.startY + (pl.endY - pl.startY) * tp;
        pulsePositions[activePulses * 3 + 2] = 0;
        pulseOpacities[activePulses] = pl.opacity * 0.9;
        activePulses++;
      }

      pulseGeometry.setDrawRange(0, activePulses);
      if (activePulses > 0) {
        pulseGeometry.attributes.position.needsUpdate = true;
        pulseGeometry.attributes.aOpacity.needsUpdate = true;
      }

      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.setAnimationLoop(null);
      renderer.dispose();

      cyanGeometry.dispose();
      cyanMaterial.dispose();
      purpleGeometry.dispose();
      purpleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} />;
};

export default ParticleField;
