"use client";

import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export default function CarModel(props: any) {
  const { scene } = useGLTF("/3d/Car.glb");

  // Clone the scene to prevent React 18 Strict Mode double-mount from
  // attaching the same three.js object to two parents (ghost duplicate).
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={clonedScene} {...props} />;
}

useGLTF.preload("/3d/Car.glb");
