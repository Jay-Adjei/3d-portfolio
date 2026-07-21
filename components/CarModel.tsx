"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";

export default function CarModel(props: any) {
  const { scene } = useGLTF("/3d/Car.glb");

  return (
    <primitive
      object={scene}
      {...props}
    />
  );
}

useGLTF.preload("/3d/Car.glb");
