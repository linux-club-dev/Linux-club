"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import CoreTeam from "@/components/CoreTeam";
import { Terminal, Users, Code, Cpu } from "lucide-react";
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

    // More complex geometry for visual interest with Linux theme
    const geometry = new THREE.IcosahedronGeometry(8, 1);

    // Material with improved aesthetics matching Linux/terminal theme
    const material = new THREE.MeshBasicMaterial({
      color: 0x22c55e, // Green color matching terminal theme
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    // Add multiple meshes for complexity
    const mesh = new THREE.Mesh(geometry, material);
    const innerMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(4, 0),
      new THREE.MeshBasicMaterial({
        color: 0x10b981, // Darker green
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      })
    );

    // Add a third mesh for more visual interest
    const outerMesh = new THREE.Mesh(
      new THREE.TetrahedronGeometry(12, 0),
      new THREE.MeshBasicMaterial({
        color: 0x059669, // Even darker green
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      })
    );

    mesh.add(innerMesh);
    mesh.add(outerMesh);
    meshRef.current = mesh;
    scene.add(mesh);

    camera.position.z = 20;

    // Animation function with responsive positioning and enhanced movements
    const animate = () => {
      if (
        meshRef.current &&
        rendererRef.current &&
        sceneRef.current &&
        cameraRef.current
      ) {
        // Adjust rotation speed based on screen size
        const rotationSpeed = windowSize.width < 768 ? 0.0003 : 0.0008;
        meshRef.current.rotation.x += rotationSpeed;
        meshRef.current.rotation.y += rotationSpeed * 1.5;

        // Add slight movement based on scroll position
        meshRef.current.position.y = (scrollYProgress.get() - 0.5) * 3;
        meshRef.current.position.x = Math.sin(Date.now() * 0.0005) * 2;

        // Inner mesh rotates opposite direction
        if (meshRef.current.children[0]) {
          meshRef.current.children[0].rotation.x -= rotationSpeed * 1.8;
          meshRef.current.children[0].rotation.y -= rotationSpeed * 2.5;
        }

        // Outer mesh rotates slowly
        if (meshRef.current.children[1]) {
          meshRef.current.children[1].rotation.x += rotationSpeed * 0.5;
          meshRef.current.children[1].rotation.y += rotationSpeed * 0.3;
          meshRef.current.children[1].rotation.z += rotationSpeed * 0.7;
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
        <div id="mesh-background" className="fixed inset-0 z-0 opacity-30" />

        {/* Enhanced gradient overlay with better opacity for 3D content */}
        <motion.div
          className="fixed inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(0,255,255,0.08) 0%, rgba(0,0,0,0.6) 70%), linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        <div className="relative z-30">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center min-h-screen px-4 space-y-8"
            style={{ opacity: headingOpacity }}
          >
            {/* Terminal-style header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center mb-8 space-x-3"
            >
              <Terminal className="w-8 h-8 text-green-500" />
              <div className="font-mono text-green-400">
                <span className="text-green-600">$</span> cat
                /etc/team/manifesto.txt
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center"
            >
              <motion.h1
                className="font-mono text-5xl font-bold leading-tight text-center md:text-7xl"
                style={{
                  background:
                    "linear-gradient(to right, #22c55e, #10b981, #059669)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {">"} Students && Devs && Nerds
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-6 font-mono text-lg text-center md:text-xl text-green-300/80"
              >
                $ echo &quot;Empowering the next generation of open source
                contributors&quot;
              </motion.p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 gap-4 mt-12 md:grid-cols-3"
            >
              <div className="p-4 border rounded-lg bg-gray-900/50 border-green-500/30 backdrop-blur-sm">
                <div className="flex items-center mb-2 space-x-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="font-mono text-sm text-green-400">
                    Active Members
                  </span>
                </div>
                <div className="font-mono text-2xl font-bold text-green-300">
                  8+
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-gray-900/50 border-green-500/30 backdrop-blur-sm">
                <div className="flex items-center mb-2 space-x-2">
                  <Code className="w-5 h-5 text-green-500" />
                  <span className="font-mono text-sm text-green-400">
                    Projects
                  </span>
                </div>
                <div className="font-mono text-2xl font-bold text-green-300">
                  12+
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-gray-900/50 border-green-500/30 backdrop-blur-sm">
                <div className="flex items-center mb-2 space-x-2">
                  <Cpu className="w-5 h-5 text-green-500" />
                  <span className="font-mono text-sm text-green-400">
                    Technologies
                  </span>
                </div>
                <div className="font-mono text-2xl font-bold text-green-300">
                  15+
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <motion.a
                href="#team"
                className="px-6 py-3 font-mono text-sm font-medium text-green-300 transition-all duration-300 border rounded-lg border-green-500/50 hover:bg-green-500/20 hover:border-green-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                $ ./explore_team --interactive
              </motion.a>
              <motion.a
                href="/join"
                className="px-6 py-3 font-mono text-sm font-medium text-green-100 transition-all duration-300 border rounded-lg bg-green-500/20 hover:bg-green-500/40 border-green-500/30 hover:border-green-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                $ join --club=linux
              </motion.a>
            </motion.div>
          </motion.section>

          {/* 3D Team Section */}
          <motion.div
            id="team"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute z-50 p-4 border rounded-lg top-8 left-8 bg-gray-900/80 backdrop-blur-sm border-green-500/30"
            >
              <div className="flex items-center mb-2 space-x-2">
                <Terminal className="w-5 h-5 text-green-500" />
                <span className="font-mono text-lg font-bold text-green-400">
                  $ ./core_team --render
                </span>
              </div>
              <p className="font-mono text-sm text-green-600">
                {">"} Interactive 3D team visualization loaded
              </p>
            </motion.div>

            {/* Enhanced CoreTeam Component */}
            <div className="relative min-h-screen">
              <CoreTeam />
            </div>

            {/* Additional team info overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute z-50 max-w-xs p-4 border rounded-lg bottom-8 right-8 bg-gray-900/80 backdrop-blur-sm border-green-500/30"
            >
              <div className="space-y-2 font-mono text-sm text-green-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>3D Environment Active</span>
                </div>
                <div className="text-xs text-green-600">
                  <p>• Mouse controls camera</p>
                  <p>• Click cards for details</p>
                  <p>• Particle system enabled</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative px-4 py-20 md:px-8"
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="mb-4 font-mono text-4xl font-bold text-green-400">
                  $ join_our_mission.sh
                </h2>
                <p className="font-mono text-lg text-green-300/80">
                  {">"} Ready to contribute to open source and learn together?
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-6"
              >
                <motion.a
                  href="/join"
                  className="px-8 py-4 font-mono text-lg font-medium text-green-100 transition-all duration-300 border-2 rounded-lg bg-green-500/20 hover:bg-green-500/40 border-green-500/50 hover:border-green-400"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  $ ./join_club --now
                </motion.a>
                <motion.a
                  href="/projects"
                  className="px-8 py-4 font-mono text-lg font-medium text-green-300 transition-all duration-300 border-2 rounded-lg border-green-500/50 hover:bg-green-500/20 hover:border-green-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  $ ./view_projects
                </motion.a>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default Teams;
