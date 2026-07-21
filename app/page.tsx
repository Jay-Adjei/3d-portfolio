"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import CarModel from "../components/CarModel";
import WindshieldHUD from "../components/WindshieldHUD";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        color: "rgba(6,182,212,0.8)",
        fontSize: 14,
        letterSpacing: 4,
        fontWeight: 700,
        textShadow: "0 0 12px rgba(6,182,212,0.4)",
      }}>
        {progress.toFixed(0)}% LOADING
      </div>
    </Html>
  );
}

type Section = "home" | "about" | "projects" | "contact";

function Scene() {
  // Calibrated driver-seat camera from Leva
  const cameraPos: [number, number, number] = [-16.7, 20.3, 8.6];
  const targetPos: [number, number, number] = [-51.9, 21.8, 124.6];
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <>
      <PerspectiveCamera makeDefault position={cameraPos} fov={60} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        target={targetPos}
        /* Lock polar angle so user stays roughly eye-level */
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 1.9}
        /* Lock azimuth so user can only glance left/right slightly */
        minAzimuthAngle={-0.35}
        maxAzimuthAngle={0.35}
        rotateSpeed={0.35}
      />

      {/* Lighting — balanced ambient + directional + subtle dashboard glow */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      {/* Faint cyan point light near the dashboard to simulate HUD glow */}
      <pointLight
        position={[-30, 22, 50]}
        intensity={0.8}
        color="#06b6d4"
        distance={40}
        decay={2}
      />

      <Environment preset="city" />

      <CarModel position={[0, 0, 0]} />

      {/* Diegetic HUD projected onto the windshield in world space */}
      <WindshieldHUD
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </>
  );
}

export default function Home() {
  return (
    <main className="h-screen w-screen bg-black overflow-hidden relative">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </main>
  );
}
