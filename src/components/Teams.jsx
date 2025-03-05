"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import CoreTeam from "@/components/CoreTeam";
import Head from "next/head";

const Teams = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const meshScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);

  // Handle resize and set initial size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Setup THREE.js scene
  useEffect(() => {
    if (!windowSize.width) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      windowSize.width / windowSize.height,
      0.1,
      1000
    );

    // Enhanced renderer with better quality
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(windowSize.width, windowSize.height);

    const meshBgElement = document.getElementById("mesh-background");
    if (meshBgElement) {
      // Clear previous canvas if it exists
      while (meshBgElement.firstChild) {
        meshBgElement.removeChild(meshBgElement.firstChild);
      }
      meshBgElement.appendChild(renderer.domElement);
    }

    // More complex geometry for visual interest
    const geometry = new THREE.IcosahedronGeometry(8, 1);

    // Material with improved aesthetics
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    // Add two meshes for complexity
    const mesh = new THREE.Mesh(geometry, material);
    const innerMesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(4, 0),
      new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
    );

    mesh.add(innerMesh);
    meshRef.current = mesh;
    scene.add(mesh);

    camera.position.z = 20;

    // Animation function with responsive positioning
    const animate = () => {
      if (
        meshRef.current &&
        rendererRef.current &&
        sceneRef.current &&
        cameraRef.current
      ) {
        // Adjust rotation speed based on screen size
        const rotationSpeed = windowSize.width < 768 ? 0.0005 : 0.001;
        meshRef.current.rotation.x += rotationSpeed;
        meshRef.current.rotation.y += rotationSpeed * 2;

        // Add slight movement based on scroll position
        meshRef.current.position.y = (scrollYProgress.get() - 0.5) * 5;

        // Inner mesh rotates opposite direction
        if (meshRef.current.children[0]) {
          meshRef.current.children[0].rotation.x -= rotationSpeed * 1.5;
          meshRef.current.children[0].rotation.y -= rotationSpeed * 3;
        }

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
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, [windowSize, scrollYProgress]);

  return (
    <>
      <Head>
        <title>Our Team | Linux Club</title>
        <meta
          name="description"
          content="Meet our passionate team of developers, students, and tech enthusiasts."
        />
      </Head>
      <div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden text-white bg-gradient-to-b from-black via-gray-900 to-black"
      >
        <div id="mesh-background" className="fixed inset-0 z-0 opacity-40" />

        {/* Enhanced gradient overlay */}
        <motion.div
          className="fixed inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(0,255,255,0.15) 0%, rgba(0,0,0,0.9) 70%), linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        <div className="relative z-30">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center min-h-screen px-4 space-y-8"
            style={{ opacity: headingOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center"
            >
              <motion.h1
                className="text-5xl font-bold leading-tight text-center md:text-7xl"
                style={{
                  background: "linear-gradient(to right, #fff, #00ffff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Students && Devs && Nerds
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-6 text-lg text-center md:text-xl text-cyan-300/80"
              >
                Empowering the next generation of open source contributors
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap justify-center gap-4 mt-12"
            >
              <a
                href="#team"
                className="px-6 py-3 text-sm font-medium transition-all duration-300 border rounded-full border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300"
              >
                Meet Our Team
              </a>
              <a
                href="/join"
                className="px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-100"
              >
                Join The Club
              </a>
            </motion.div>
          </motion.section>

          <motion.div
            id="team"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="px-4 py-20 md:px-8"
          >
            <CoreTeam />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Teams;
