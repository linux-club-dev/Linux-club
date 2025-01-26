"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
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
        <title>Teams | MyWebsite</title>
        <meta
          name="description"
          content="Meet our mentors and core team members."
        />
      </Head>
      <div
        ref={containerRef}
        className="min-h-screen overflow-hidden text-white bg-black"
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
              "radial-gradient(circle, rgba(0,255,255,0.4) 0%, rgba(0,0,0,0.8) 30%)",
          }}
        />
        <div className="relative z-30">
          <section className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="gap-2 mb-10 text-6xl font-bold tracking-wide text-transparent bg-gradient-to-tl from-black/60 to-slate-50 bg-clip-text motion-preset-bounce">
              <span>Students |&&|</span>
              <span> Devs |&&| </span>
              <span>Nerds.</span>
            </h1>
            <p className="text-xl text-gray-300 motion-preset-slide-up-left-lg">
              we do things that we love and now help others to do the same.
            </p>
          </section>
          <CoreTeam />
        </div>
      </div>
    </>
  );
};

export default Teams;
