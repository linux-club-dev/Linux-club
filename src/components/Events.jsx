"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Countdown from "@/components/Counttime";
import Timeline from "@/components/Timeline";
import LatestImages from "@/components/LatestEvent";

export default function Events() {
  const containerRef = useRef(null);
  const [meshBackground, setMeshBackground] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // Same mesh background as in Home component
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("mesh-background").appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(5, 2, 90, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    setMeshBackground(renderer.domElement);

    return () => {
      renderer.dispose();
      document.getElementById("mesh-background");
      if (renderer.domElement) {
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden min-h-screen text-white bg-black"
    >
      <div id="mesh-background" className="fixed inset-0 z-0 opacity-20" />
      <motion.div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: 'url("/circuit-board.svg")',
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,0,0.1) 0%, rgba(0,0,0,0.8) 100%)",
        }}
      />
      <div className="relative z-30">
        <section className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="mb-9 text-9xl font-bold text-emerald-400">
            Upcoming Event
          </h1>
          <Countdown targetDate="2024-12-31T23:59:59" />
        </section>
        <Timeline />
        <LatestImages />
      </div>
    </div>
  );
}
