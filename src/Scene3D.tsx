import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * IMPORTANT: in Remotion, never use useFrame() or real-time clocks from R3F.
 * Drive ALL animation from useCurrentFrame() so every frame renders deterministically.
 */
export const Scene3D = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 14 } });
  const t = frame / fps;

  // Two-joint robot arm swinging
  const base = Math.sin(t * 1.2) * 0.8;
  const shoulder = interpolate(Math.sin(t * 1.6), [-1, 1], [-0.2, 0.9]);
  const elbow = interpolate(Math.cos(t * 2.1), [-1, 1], [0.3, 1.6]);

  // Slow orbit camera
  const camAngle = interpolate(frame, [0, durationInFrames], [0.3, 1.3]);
  const camPos: [number, number, number] = [
    Math.sin(camAngle) * 7,
    3.5,
    Math.cos(camAngle) * 7,
  ];

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ position: camPos, fov: 45 }}
      onCreated={({ camera }) => camera.lookAt(0, 1.5, 0)}
    >
      <color attach="background" args={["#0b1020"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={2} />
      <pointLight position={[-4, 3, -3]} intensity={30} color="#4f8cff" />

      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#141c33" metalness={0.4} roughness={0.6} />
      </mesh>
      <gridHelper args={[10, 20, "#2a3a66", "#1a2444"]} position={[0, 0.01, 0]} />

      {/* robot arm */}
      <group scale={intro} rotation={[0, base, 0]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.8, 1, 0.5, 32]} />
          <meshStandardMaterial color="#2b3a67" metalness={0.8} roughness={0.3} />
        </mesh>
        <group position={[0, 0.5, 0]} rotation={[0, 0, shoulder]}>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[0.45, 2, 0.45]} />
            <meshStandardMaterial color="#ff7a1a" metalness={0.5} roughness={0.35} />
          </mesh>
          <group position={[0, 2, 0]} rotation={[0, 0, elbow]}>
            <mesh>
              <sphereGeometry args={[0.35, 32, 32]} />
              <meshStandardMaterial color="#cfd8ff" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.9, 0]}>
              <boxGeometry args={[0.35, 1.8, 0.35]} />
              <meshStandardMaterial color="#ff7a1a" metalness={0.5} roughness={0.35} />
            </mesh>
            <mesh position={[0, 1.9, 0]}>
              <octahedronGeometry args={[0.28]} />
              <meshStandardMaterial color="#4f8cff" emissive="#4f8cff" emissiveIntensity={1.5} />
            </mesh>
          </group>
        </group>
      </group>
    </ThreeCanvas>
  );
};
