"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Mentors from "@/components/Mentors";
import CoreTeam from "@/components/CoreTeam";
import Leaderboard from "@/components/Leaderboard";
import Head from "next/head";

export default function Teams() {
  const containerRef = useRef(null);
  const [meshBackground, setMeshBackground] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // Variation: Change geometry and colors
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

    const geometry = new THREE.DodecahedronGeometry(5, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    setMeshBackground(renderer.domElement);

    return () => {
      renderer.dispose();
      const meshbgelem = document.getElementById("mesh-background");
      if (meshbgelem) {
        meshbgelem.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Teams | MyWebsite</title>
        <meta
          name="description"
          content="Meet our mentors and core team members."
        />
      </Head>
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
              "radial-gradient(circle, rgba(0,255,255,0.1) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        <div className="relative z-30">
          <section className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="mb-4 text-5xl font-bold">Our Teams</h1>
            <p className="text-xl text-gray-300">
              Meet our mentors, core team members, and see the leaderboard.
            </p>
          </section>
          <CoreTeam />
          <Mentors />
        </div>
      </div>
    </>
  );
}
