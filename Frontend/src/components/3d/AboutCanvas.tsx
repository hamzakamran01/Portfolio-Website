import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OrbitingTimeline from './OrbitingTimeLine';

/**
 * Decorative orbiting-timeline canvas for the About section.
 *
 * Split into its own module so `three` + `@react-three/*` (~1 MB) load as an
 * async chunk instead of blocking first paint. Rendered only when the section
 * is on screen and the visitor has not asked for reduced motion.
 */
const AboutCanvas: React.FC = () => (
  <Canvas
    camera={{ position: [0, 0, 20], fov: 45 }}
    dpr={[1, 1.5]}
    gl={{ powerPreference: 'low-power', antialias: false }}
  >
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <OrbitingTimeline />
    <OrbitControls enableZoom={false} enablePan={false} />
  </Canvas>
);

export default AboutCanvas;
