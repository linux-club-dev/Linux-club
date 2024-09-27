"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Hero from "@/components/Hero";
import About from "@/components/About";
import RecentBlogs from "@/components/RecentBlogs";
import Activities from "@/components/Activities";

export default function Home() {
  const containerRef = useRef(null);
  const [meshBackground, setMeshBackground] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
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

    const geometry = new THREE.IcosahedronGeometry(5, 3);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    setMeshBackground(renderer.domElement);

    return () => {
      renderer.dispose();
      const meshBgelement = document.getElementById("mesh-background");
      if (meshBgelement) {
        meshBgelement.removeChild(renderer.domElement);
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
        <Hero />
        <About />
        <Activities />
        <RecentBlogs />
      </div>
    </div>
  );
}
