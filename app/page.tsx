"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, OrbitControls, Html, useProgress } from "@react-three/drei";
import CarModel from "../components/CarModel";
import { useControls } from "leva";

function Loader() {
  const { progress } = useProgress();
  return <Html center className="text-white text-xl font-bold">{progress.toFixed(0)} % loaded</Html>;
}

function Scene() {
  // Leva controls to let you tweak the camera position in real-time in the browser!
  const { cameraPos, targetPos } = useControls({
    cameraPos: { value: [-0.4, 1.2, 0.2], step: 0.1 },
    targetPos: { value: [-0.4, 1.0, -1.0], step: 0.1 },
  });

  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        position={cameraPos} 
        fov={60} 
      />
      {/* Constraints are temporarily removed and zoom is enabled so you can find the dashboard! */}
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        target={targetPos} 
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      
      <Environment preset="city" />
      
      <CarModel position={[0, 0, 0]} />
    </>
  );
}

export default function Home() {
  return (
    <main className="h-screen w-screen bg-black overflow-hidden relative">
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-10 w-full text-center pointer-events-none">
        <p className="text-white/80 text-sm tracking-widest font-light bg-black/50 p-2 inline-block rounded">
          USE THE LEVA PANEL (TOP RIGHT) TO TWEAK THE CAMERA POSITION
        </p>
      </div>
    </main>
  );
}
