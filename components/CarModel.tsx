"use client";

import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

export default function CarModel(props: any) {
  const { scene } = useGLTF("/3d/Car.glb");
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    // Check if the hovered object or its parent has the name
    if (e.object.name === "Interactive_dashbc") {
      e.stopPropagation();
      setHover(true);
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    if (e.object.name === "Interactive_dashbc") {
      e.stopPropagation();
      setHover(false);
    }
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (e.object.name === "Interactive_dashbc") {
      e.stopPropagation();
      alert("Dashboard clicked! Opening main menu...");
    }
  };

  return (
    <primitive
      object={scene}
      {...props}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  );
}

useGLTF.preload("/3d/Car.glb");
