"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Timeline from "@/components/Timeline";
import Countdown from "@/components/Counttime";
import LatestImages from "@/components/LatestEvent";
import axios from "axios";

const Events = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);

  // Hardcoded fallback date - March 6, 2025 at 2:00 PM
  const FALLBACK_DATE = "2025-03-06T14:00:00";

  const [targetDate, setTargetDate] = useState(FALLBACK_DATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Date conversion function
  const convertToValidDateString = (dateStr, timeStr) => {
    try {
      if (!dateStr) return null;

      // If date is in DD-MM-YYYY format
      if (dateStr.includes("-")) {
        const parts = dateStr.trim().split("-");
        if (parts.length === 3) {
          const [day, month, year] = parts;
          return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${
            timeStr ? timeStr.replace(" ", "") : "00:00:00"
          }`;
        }
      }

      // If it's already in YYYY-MM-DD format
      return `${dateStr}T${timeStr ? timeStr.replace(" ", "") : "00:00:00"}`;
    } catch (error) {
      console.error("Date parsing error:", error);
      return null;
    }
  };

  // Fetch events
  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/events");

        if (!response.data || !response.data.events) {
          throw new Error("Invalid response format");
        }

        const events = response.data.events;

        // Get current timestamp
        const now = new Date().getTime();

        // Filter future events only and sort by nearest
        const futureEvents = events
          .filter((event) => {
            const dateString = convertToValidDateString(
              event.EventDate,
              event.EventTime
            );
            if (!dateString) return false;

            const eventTimestamp = new Date(dateString).getTime();
            return !isNaN(eventTimestamp) && eventTimestamp > now;
          })
          .sort((a, b) => {
            const dateStringA = convertToValidDateString(
              a.EventDate,
              a.EventTime
            );
            const dateStringB = convertToValidDateString(
              b.EventDate,
              b.EventTime
            );
            return (
              new Date(dateStringA).getTime() - new Date(dateStringB).getTime()
            );
          });

        if (futureEvents.length > 0) {
          const nextEvent = futureEvents[0];
          const fullDateString = convertToValidDateString(
            nextEvent.EventDate,
            nextEvent.EventTime
          );

          if (fullDateString) {
            setTargetDate(fullDateString);
          } else {
            // Fallback if parsing fails
            setTargetDate(FALLBACK_DATE);
          }
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Using fallback date.");
        // Always ensure we have a fallback date
        setTargetDate(FALLBACK_DATE);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestEvent();
  }, []);

  // THREE.js setup
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

    const geometry = new THREE.TorusKnotGeometry(5, 2, 90, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    camera.position.z = 30;

    const animate = () => {
      if (
        meshRef.current &&
        rendererRef.current &&
        sceneRef.current &&
        cameraRef.current
      ) {
        meshRef.current.rotation.x += 0.002;
        meshRef.current.rotation.y += 0.003;
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
      <div id="mesh-background" className="fixed inset-0 z-0 opacity-20" />
      <motion.div className="fixed inset-0 z-10 pointer-events-none" />
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,0,0.1) 0%, rgba(0,0,0,0.8) 100%)",
        }}
      />
      <div className="relative z-30">
        <section className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-9 sm:text-9xl text-emerald-400">
            Upcoming Event
          </h1>
          {loading ? (
            <div className="text-2xl text-green-400">Loading...</div>
          ) : (
            <Countdown targetDate={targetDate} />
          )}
          {error && (
            <div className="mt-4 text-sm text-yellow-400">
              Note: Using scheduled event date (March 6, 2025)
            </div>
          )}
        </section>
        <Timeline />
        <LatestImages />
      </div>
    </div>
  );
};

export default Events;
