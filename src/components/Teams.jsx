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

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    const meshBgElement = document.getElementById("mesh-background");
    if (meshBgElement) {
      meshBgElement.appendChild(renderer.domElement);
    }

    const geometry = new THREE.DodecahedronGeometry(5, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
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

        <motion.div
          className="fixed inset-0 z-10 pointer-events-none bg-gradient-radial"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,255,255,0.15) 0%, rgba(0,0,0,0.9) 40%)",
          }}
        />

        <div className="relative z-30">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center min-h-screen px-4 space-y-8"
          >
            <motion.h1
              className="text-5xl font-bold leading-tight text-center md:text-7xl motion-preset-slide-up-right-md"
              style={{
                background: "linear-gradient(to right, #fff, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Students && Devs && Nerds
            </motion.h1>
            <p className="text-lg text-center md:text-xl motion-preset-slide-up-right-md">
              Empowering the next generation of open source contributors
            </p>
          </motion.section>

          <motion.div
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
