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
  // Calibrated driver-seat camera from Leva panel
  const cameraPos: [number, number, number] = [-16.7, 20.3, 8.6];
  const targetPos: [number, number, number] = [-51.9, 21.8, 124.6];
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <>
      <PerspectiveCamera makeDefault position={cameraPos} fov={60} />

      {/*
        Bug 2 fix: REMOVED minAzimuthAngle / maxAzimuthAngle.
        OrbitControls computes azimuth relative to its own reference frame.
        Our camera→target vector has a large -X component, so the initial
        azimuth fell outside [-0.35, 0.35], causing OrbitControls to SNAP
        the camera to the nearest valid angle on mount → ejected from cabin.
        Polar constraints alone are safe because they don't depend on the
        horizontal reference frame.
      */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        target={targetPos}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
        rotateSpeed={0.35}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      {/* Faint cyan point light to simulate HUD casting glow on the dashboard */}
      <pointLight
        position={[-30, 22, 50]}
        intensity={0.8}
        color="#06b6d4"
        distance={40}
        decay={2}
      />

      <Environment preset="city" />

      {/* Single car instance (cloned internally to prevent Strict Mode duplication) */}
      <CarModel position={[0, 0, 0]} />

      {/* Diegetic HUD projected onto the windshield */}
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
