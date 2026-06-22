"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

/**
 * Accent palette mirrors the CSS tokens: brutalist blue in light mode,
 * terracotta in the "Warm Espresso" dark mode.
 */
function useAccentColor() {
  const { theme } = useTheme();
  return theme === "dark" ? "#C4622D" : "#0000FF";
}

const GRID_SIZE = 60;
const GRID_DIVISIONS = 60;
const CELL = GRID_SIZE / GRID_DIVISIONS; // world units between lines

/**
 * One infinite blueprint plane. Lines march toward the viewer and wrap
 * seamlessly by one cell, so it reads as an endless architectural grid
 * receding to the horizon.
 */
function GridPlane({ color, y, speed }: { color: string; y: number; speed: number }) {
  const gridRef = useRef<THREE.GridHelper>(null);
  const grid = useMemo(() => {
    const c = new THREE.Color(color);
    const helper = new THREE.GridHelper(GRID_SIZE, GRID_DIVISIONS, c, c);
    const material = helper.material as THREE.LineBasicMaterial;
    material.transparent = true;
    material.opacity = 0.5;
    material.depthWrite = false;
    helper.position.y = y;
    return helper;
  }, [color, y]);

  useFrame((state) => {
    // seamless scroll toward the camera
    const helper = gridRef.current;
    if (!helper) return;
    helper.position.z = (state.clock.elapsedTime * speed) % CELL;
  });

  return <primitive ref={gridRef} object={grid} />;
}

function Scene({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    // gentle cursor parallax — pan/tilt the whole space
    const tx = state.pointer.x * 0.14;
    const ty = state.pointer.y * 0.09;
    g.rotation.y += (tx - g.rotation.y) * 0.04;
    g.rotation.x += (ty - g.rotation.x) * 0.04;
  });

  return (
    <group ref={group}>
      <GridPlane color={color} y={-3} speed={1.1} />
      <GridPlane color={color} y={3} speed={1.1} />
    </group>
  );
}

export default function HeroBackdrop() {
  const color = useAccentColor();
  const wrapRef = useRef<HTMLDivElement>(null);
  // Pause the render loop once the hero scrolls away to save battery/GPU.
  const [active, setActive] = useState(true);
  // Materialize the grid in once the WebGL scene is actually ready to paint —
  // tying the entrance to onCreated (not the wrapper mount) means the animation
  // plays when there's something to see, regardless of chunk-load timing.
  const [ready, setReady] = useState(false);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealed = ready || reduce;

  React.useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute inset-0 -z-0 pointer-events-none"
      // Keep the center band (headline + CTA) clear; show the grid fading in
      // from the top and bottom edges like a receding blueprint space.
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 26%, rgba(0,0,0,0.06) 50%, #000 74%, #000 100%)",
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 26%, rgba(0,0,0,0.06) 50%, #000 74%, #000 100%)",
      }}
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7], fov: 55 }}
        onCreated={() => setReady(true)}
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scale(1)" : "scale(1.06)",
          transformOrigin: "50% 45%",
          transition: reduce
            ? undefined
            : "opacity 1300ms cubic-bezier(0.16,1,0.3,1), transform 1300ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Scene color={color} />
      </Canvas>
    </div>
  );
}
