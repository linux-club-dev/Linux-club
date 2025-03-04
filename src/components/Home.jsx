"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import Hero from "@/components/Hero";
import About from "@/components/About";
import RecentBlogs from "@/components/RecentBlogs";
import Activities from "@/components/Activities";

const Home = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);

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
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    const meshBgElement = document.getElementById("mesh-background");
    if (meshBgElement) {
      meshBgElement.appendChild(renderer.domElement);
    }

    const geometry = new THREE.IcosahedronGeometry(5, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    camera.position.z = 15;

    const animate = () => {
      if (
        meshRef.current &&
        rendererRef.current &&
        sceneRef.current &&
        cameraRef.current
      ) {
        meshRef.current.rotation.x += 0.001;
        meshRef.current.rotation.y += 0.002;
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (
        rendererRef.current &&
        rendererRef.current.domElement &&
        rendererRef.current.domElement.parentNode
      ) {
        rendererRef.current.domElement.parentNode.removeChild(
          rendererRef.current.domElement
        );
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen overflow-hidden text-white bg-black"
    >
      <div id="mesh-background" className="fixed inset-0 z-0 opacity-40" />
      <motion.div className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,255,0,0.15) 0%, rgba(0,0,0,0.9) 70%)",
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
};

export default Home;
