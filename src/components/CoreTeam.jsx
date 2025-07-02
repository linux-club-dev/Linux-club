"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import * as THREE from "three";
import axios from "axios";
import NextImage from "next/image";
import {
  Terminal,
  Github,
  Linkedin,
  Code,
  Server,
  Zap,
  Star,
  Cpu,
} from "lucide-react";

// Fallback team data
const fallbackTeamData = [
  {
    _id: "fallback-1",
    name: "Vrushali Kudante",
    title: "President",
    img: "/coreteam/vrushali.jpg",
    github: "https://github.com/vrushali",
    linkedin: "https://linkedin.com/in/vrushali",
    joinDate: new Date().toISOString(),
  },
  {
    _id: "fallback-2",
    name: "Pratik Mhalle",
    title: "Vice President",
    img: "/coreteam/pratik.jpeg",
    github: "https://github.com/pratik",
    linkedin: "https://linkedin.com/in/pratik",
    joinDate: new Date().toISOString(),
  },
  {
    _id: "fallback-3",
    name: "Arnav Kulkarni",
    title: "Event Manager",
    img: "/coreteam/arnav.jpeg",
    github: "https://github.com/arnav",
    linkedin: "https://linkedin.com/in/arnav",
    joinDate: new Date().toISOString(),
  },
  {
    _id: "fallback-4",
    name: "Abhishek Katale",
    title: "Data Scientist",
    img: "/coreteam/abhishekKatale.jpeg",
    github: "https://github.com/abhishek",
    linkedin: "https://linkedin.com/in/abhishek",
    joinDate: new Date().toISOString(),
  },
  {
    _id: "fallback-5",
    name: "Sairaj Javalikar",
    title: "Cyber Security Lead",
    img: "/coreteam/sairaj.jpeg",
    github: "https://github.com/sairaj",
    linkedin: "https://linkedin.com/in/sairaj",
    joinDate: new Date().toISOString(),
  },
  {
    _id: "fallback-6",
    name: "Abhishek Kaware",
    title: "Developer",
    img: "/coreteam/abhishekKaware.jpeg",
    github: "https://github.com/abhishekkaware",
    linkedin: "https://linkedin.com/in/abhishekkaware",
    joinDate: new Date().toISOString(),
  },
  {
    _id: "fallback-7",
    name: "Ghanshyam Pawar",
    title: "Developer",
    img: "/coreteam/ghanshyam.jpeg",
    github: "https://github.com/ghanshyam",
    linkedin: "https://linkedin.com/in/ghanshyam",
    joinDate: new Date().toISOString(),
  },
  {
    _id: "fallback-8",
    name: "Prathmesh Bhoir",
    title: "Developer",
    img: "/coreteam/prathmesh.jpeg",
    github: "https://github.com/prathmesh",
    linkedin: "https://linkedin.com/in/prathmesh",
    joinDate: new Date().toISOString(),
  },
];

export default function AdvancedCoreTeam() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const cardsRef = useRef([]);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameIdRef = useRef(null);
  const composerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cameraMode, setCameraMode] = useState("orbit"); // 'orbit', 'follow', 'free'
  const [imageLoadError, setImageLoadError] = useState({}); // Track image load errors

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get("/api/admin/team");
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.teamMembers)) {
          setTeamData(response.data.teamMembers);
          console.log("Team data loaded from API:", response.data.teamMembers);
        } else if (
          response.data &&
          Array.isArray(response.data["Team Members"])
        ) {
          setTeamData(response.data["Team Members"]);
          console.log(
            "Team data loaded from API (alt format):",
            response.data["Team Members"]
          );
        } else {
          throw new Error("Invalid data structure received from API");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setTeamData(fallbackTeamData);
        console.log("Using fallback team data:", fallbackTeamData);

        // Log each fallback image path for debugging
        fallbackTeamData.forEach((member) => {
          console.log(`Fallback image for ${member.name}: ${member.img}`);
        });
      }
    };

    fetchTeamData();
  }, []);

  useEffect(() => {
    if (!mountRef.current || teamData.length === 0) return;

    // Store ref value to avoid stale closure issues
    const currentMount = mountRef.current;

    // Scene setup with fog for depth
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 10, 100);
    sceneRef.current = scene;

    // Camera setup with better positioning
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 25);
    cameraRef.current = camera;

    // Enhanced renderer with post-processing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    currentMount.appendChild(renderer.domElement);

    // Advanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x22c55e, 0.4);
    scene.add(ambientLight);

    // Key light
    const keyLight = new THREE.DirectionalLight(0x22c55e, 1.2);
    keyLight.position.set(15, 20, 15);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 4096;
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 100;
    keyLight.shadow.camera.left = -50;
    keyLight.shadow.camera.right = 50;
    keyLight.shadow.camera.top = 50;
    keyLight.shadow.camera.bottom = -50;
    scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0x10b981, 0.6);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);

    // Rim light for dramatic effect
    const rimLight = new THREE.PointLight(0x059669, 0.8, 30);
    rimLight.position.set(0, 15, -20);
    scene.add(rimLight);

    // Colored accent lights
    const accent1 = new THREE.PointLight(0xff6b6b, 0.3, 20);
    accent1.position.set(-15, 5, 10);
    scene.add(accent1);

    const accent2 = new THREE.PointLight(0x4ecdc4, 0.3, 20);
    accent2.position.set(15, 5, 10);
    scene.add(accent2);

    // Create multiple particle systems
    const createAdvancedParticles = () => {
      const particleSystems = [];

      // Main floating particles
      for (let i = 0; i < 3; i++) {
        const particleCount = 150;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const velocities = new Float32Array(particleCount * 3);

        for (let j = 0; j < particleCount; j++) {
          positions[j * 3] = (Math.random() - 0.5) * 80;
          positions[j * 3 + 1] = (Math.random() - 0.5) * 80;
          positions[j * 3 + 2] = (Math.random() - 0.5) * 80;

          const hue = 0.33 + i * 0.1; // Green variations
          const color = new THREE.Color();
          color.setHSL(hue, 0.8, Math.random() * 0.5 + 0.5);
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 3 + 1;

          // Add velocities for natural movement
          velocities[j * 3] = (Math.random() - 0.5) * 0.02;
          velocities[j * 3 + 1] = (Math.random() - 0.5) * 0.02;
          velocities[j * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute(
          "velocity",
          new THREE.BufferAttribute(velocities, 3)
        );

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            pointTexture: {
              value: new THREE.TextureLoader().load(
                "data:image/svg+xml;base64," +
                  btoa(`
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:0" />
                  </radialGradient>
                </defs>
                <circle cx="32" cy="32" r="30" fill="url(#grad)" />
              </svg>
            `)
              ),
            },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            attribute vec3 velocity;
            varying vec3 vColor;
            uniform float time;

            void main() {
              vColor = color;
              vec3 pos = position;

              // Fluid motion
              pos.x += sin(time * 0.3 + position.y * 0.01) * 3.0;
              pos.y += cos(time * 0.4 + position.x * 0.01) * 2.0;
              pos.z += sin(time * 0.2 + position.x * 0.01 + position.y * 0.01) * 1.5;

              // Add velocity-based movement
              pos += velocity * time * 10.0;

              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (400.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform sampler2D pointTexture;
            varying vec3 vColor;

            void main() {
              vec4 textureColor = texture2D(pointTexture, gl_PointCoord);
              gl_FragColor = vec4(vColor, 1.0) * textureColor;
            }
          `,
          transparent: true,
          vertexColors: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        particles.userData = { type: "particles", index: i };
        particleSystems.push(particles);
        scene.add(particles);
      }

      // Matrix rain effect
      const createMatrixRain = () => {
        const rainCount = 50;
        const positions = new Float32Array(rainCount * 3);
        const colors = new Float32Array(rainCount * 3);

        for (let i = 0; i < rainCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 100;
          positions[i * 3 + 1] = Math.random() * 100 + 20;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

          const intensity = Math.random();
          colors[i * 3] = 0.1 + intensity * 0.2; // R
          colors[i * 3 + 1] = 0.8 + intensity * 0.2; // G
          colors[i * 3 + 2] = 0.1; // B
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: 2,
          vertexColors: true,
          transparent: true,
          opacity: 0.7,
        });

        const rain = new THREE.Points(geometry, material);
        rain.userData = { type: "rain" };
        particleSystems.push(rain);
        scene.add(rain);
      };

      createMatrixRain();
      particlesRef.current = particleSystems;
    };

    // Create advanced member cards with holographic effects
    const createAdvancedMemberCards = () => {
      const cards = [];
      const cardGroup = new THREE.Group();

      teamData.forEach((member, index) => {
        // Create main card group
        const cardContainer = new THREE.Group();

        // Holographic card base
        const cardGeometry = new THREE.PlaneGeometry(4, 5.5);

        // Create holographic material
        const holographicMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            mousePos: { value: new THREE.Vector2(0, 0) },
            resolution: {
              value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            hoverIntensity: { value: 0 },
          },
          vertexShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            varying vec3 vNormal;
            uniform float time;
            uniform float hoverIntensity;

            void main() {
              vUv = uv;
              vPosition = position;
              vNormal = normal;

              vec3 pos = position;
              pos.z += sin(time * 2.0 + position.x * 10.0) * 0.05 * hoverIntensity;
              pos.z += cos(time * 1.5 + position.y * 8.0) * 0.03 * hoverIntensity;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform vec2 mousePos;
            uniform vec2 resolution;
            uniform float hoverIntensity;
            varying vec2 vUv;
            varying vec3 vPosition;
            varying vec3 vNormal;

            vec3 hsv2rgb(vec3 c) {
              vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
              vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
              return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
            }

            void main() {
              vec2 uv = vUv;
              vec2 center = vec2(0.5, 0.5);
              float dist = distance(uv, center);

              // Holographic rainbow effect
              float hue = fract(dist * 3.0 - time * 0.3);
              vec3 rainbow = hsv2rgb(vec3(hue, 0.8, 0.9));

              // Circuit pattern
              float circuit = 0.0;
              circuit += step(0.98, sin(uv.x * 20.0 + time)) * step(0.98, sin(uv.y * 20.0));
              circuit += step(0.95, sin(uv.x * 40.0 - time * 2.0)) * step(0.95, sin(uv.y * 10.0 + time));

              // Glass effect
              float edge = smoothstep(0.0, 0.1, dist) * smoothstep(1.0, 0.8, dist);

              vec3 baseColor = mix(vec3(0.1, 0.2, 0.1), vec3(0.2, 0.4, 0.2), edge);
              vec3 finalColor = mix(baseColor, rainbow * 0.3, circuit * 0.5 + hoverIntensity * 0.3);

              // Add glow
              float glow = 1.0 - smoothstep(0.0, 0.5, dist);
              finalColor += vec3(0.0, 1.0, 0.3) * glow * 0.2 * hoverIntensity;

              gl_FragColor = vec4(finalColor, 0.8 + edge * 0.2);
            }
          `,
          transparent: true,
          side: THREE.DoubleSide,
        });

        const cardMesh = new THREE.Mesh(cardGeometry, holographicMaterial);
        cardMesh.castShadow = true;
        cardMesh.receiveShadow = true;

        // Position cards in a complex 3D formation
        const radius = 12;
        const verticalSpacing = 8;
        const spiralHeight = 6;

        const angle = (index / teamData.length) * Math.PI * 2;
        const spiralY = Math.sin(angle * 2) * spiralHeight;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = spiralY + (index % 2) * verticalSpacing - verticalSpacing / 2;

        cardContainer.position.set(x, y, z);
        cardContainer.lookAt(0, y, 0); // Face center

        // Add floating gems/crystals around card
        for (let i = 0; i < 5; i++) {
          const gemGeometry = new THREE.OctahedronGeometry(0.1, 0);
          const gemMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(0.33 + i * 0.1, 0.8, 0.6),
            shininess: 100,
            transparent: true,
            opacity: 0.7,
          });

          const gem = new THREE.Mesh(gemGeometry, gemMaterial);
          const gemRadius = 3;
          const gemAngle = (i / 5) * Math.PI * 2;
          gem.position.set(
            Math.cos(gemAngle) * gemRadius,
            Math.sin(gemAngle + Date.now() * 0.001) * 0.5,
            Math.sin(gemAngle) * gemRadius
          );
          cardContainer.add(gem);
        }

        // Create detailed text texture with terminal styling
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 700;
        const ctx = canvas.getContext("2d");

        // Background with subtle pattern
        const gradient = ctx.createLinearGradient(0, 0, 0, 700);
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(0.5, "#1a1a1a");
        gradient.addColorStop(1, "#0a0a0a");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 700);

        // Add grid pattern
        ctx.strokeStyle = "#22c55e20";
        ctx.lineWidth = 1;
        for (let i = 0; i < 512; i += 20) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, 700);
          ctx.stroke();
        }
        for (let i = 0; i < 700; i += 20) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(512, i);
          ctx.stroke();
        }

        // Terminal header with animated dots
        ctx.fillStyle = "#1f2937";
        ctx.fillRect(10, 10, 492, 50);

        // Terminal control dots
        const dots = [
          { color: "#ff5f56", x: 30 },
          { color: "#ffbd2e", x: 60 },
          { color: "#27ca3f", x: 90 },
        ];

        dots.forEach((dot) => {
          ctx.fillStyle = dot.color;
          ctx.beginPath();
          ctx.arc(dot.x, 35, 8, 0, Math.PI * 2);
          ctx.fill();
        });

        // Terminal title
        ctx.fillStyle = "#22c55e";
        ctx.font = "bold 14px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.fillText(
          `~/team/${member.name.toLowerCase().replace(" ", "_")}.sh`,
          256,
          40
        );

        // Member avatar area with hexagonal border
        const avatarCenterX = 256;
        const avatarCenterY = 150;
        const hexRadius = 40;

        // Create a function to draw the avatar (either image or initials)
        const drawAvatar = () => {
          // Try to load the actual member image
          const img = new Image();
          img.crossOrigin = "anonymous";

          const imagePath =
            member.img && !member.img.includes("/api/placeholder")
              ? member.img.startsWith("/")
                ? member.img
                : `/coreteam/${member.img}`
              : null;

          if (imagePath) {
            console.log(
              `Attempting to load image for ${member.name}: ${imagePath}`
            );
            img.onload = () => {
              console.log(`Successfully loaded image for ${member.name}`);
              // Save context state
              ctx.save();

              // Create circular clipping path for the image
              ctx.beginPath();
              ctx.arc(
                avatarCenterX,
                avatarCenterY,
                hexRadius - 5,
                0,
                Math.PI * 2
              );
              ctx.clip();

              // Draw the image inside the circle
              const imgSize = (hexRadius - 5) * 2;
              ctx.drawImage(
                img,
                avatarCenterX - imgSize / 2,
                avatarCenterY - imgSize / 2,
                imgSize,
                imgSize
              );

              // Restore context state
              ctx.restore();

              // Draw hexagonal border over the image
              ctx.strokeStyle = "#22c55e";
              ctx.lineWidth = 3;
              ctx.beginPath();
              for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const x = avatarCenterX + hexRadius * Math.cos(angle);
                const y = avatarCenterY + hexRadius * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
              }
              ctx.closePath();
              ctx.stroke();

              // Inner glow
              ctx.shadowColor = "#22c55e";
              ctx.shadowBlur = 15;
              ctx.strokeStyle = "#22c55e60";
              ctx.stroke();
              ctx.shadowBlur = 0;

              // Update the texture
              texture.needsUpdate = true;
            };

            img.onerror = () => {
              console.log(
                `Failed to load image for ${member.name}: ${imagePath}`
              );
              // Fallback to initials if image fails to load
              drawInitials();
            };

            // Start loading the image
            img.src = imagePath;
          } else {
            // No image available, draw initials
            drawInitials();
          }
        };

        const drawInitials = () => {
          // Draw hexagonal border
          ctx.strokeStyle = "#22c55e";
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = avatarCenterX + hexRadius * Math.cos(angle);
            const y = avatarCenterY + hexRadius * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();

          // Inner glow
          ctx.shadowColor = "#22c55e";
          ctx.shadowBlur = 20;
          ctx.strokeStyle = "#22c55e80";
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Background circle for initials
          ctx.fillStyle = "#1a1a1a";
          ctx.beginPath();
          ctx.arc(avatarCenterX, avatarCenterY, hexRadius - 5, 0, Math.PI * 2);
          ctx.fill();

          // Member initials
          ctx.fillStyle = "#22c55e";
          ctx.font = "bold 24px 'Courier New', monospace";
          ctx.textAlign = "center";
          ctx.fillText(
            member.name
              .split(" ")
              .map((n) => n[0])
              .join(""),
            avatarCenterX,
            avatarCenterY + 8
          );
        };

        // Start the avatar drawing process
        drawAvatar();

        // Member info with typing effect styling
        ctx.fillStyle = "#22c55e";
        ctx.font = "bold 18px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.fillText(`> ${member.name}`, 256, 220);

        ctx.fillStyle = "#10b981";
        ctx.font = "14px 'Courier New', monospace";
        ctx.fillText(`class: ${member.title}`, 256, 250);

        // Command line simulation
        ctx.fillStyle = "#065f46";
        ctx.font = "12px 'Courier New', monospace";
        ctx.textAlign = "left";

        const commands = [
          "$ whoami",
          `  ${member.name.toLowerCase().replace(" ", "_")}`,
          "$ cat /etc/role",
          `  ${member.title}`,
          "$ ls -la skills/",
          "  drwxr-xr-x  react.js",
          "  drwxr-xr-x  node.js",
          "  drwxr-xr-x  python.py",
          "$ git status",
          "  ● ready to commit changes",
        ];

        commands.forEach((cmd, i) => {
          ctx.fillStyle = cmd.startsWith("$") ? "#22c55e" : "#10b981";
          ctx.fillText(cmd, 30, 300 + i * 20);
        });

        // Social icons area
        ctx.fillStyle = "#22c55e40";
        ctx.fillRect(30, 550, 452, 60);

        ctx.fillStyle = "#22c55e";
        ctx.font = "12px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.fillText("$ ./connect --social", 256, 575);

        // Progress bars for visual interest
        const skills = ["Linux", "Docker", "Git", "Cloud"];
        skills.forEach((skill, i) => {
          const y = 630 + i * 15;
          const progress = 0.7 + Math.random() * 0.3;

          ctx.fillStyle = "#22c55e40";
          ctx.fillRect(50, y, 200, 8);

          ctx.fillStyle = "#22c55e";
          ctx.fillRect(50, y, 200 * progress, 8);

          ctx.fillStyle = "#10b981";
          ctx.font = "10px 'Courier New', monospace";
          ctx.textAlign = "left";
          ctx.fillText(skill, 260, y + 6);
        });

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const textMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.9,
        });

        const textMesh = new THREE.Mesh(cardGeometry, textMaterial);
        textMesh.position.z = 0.01;
        cardContainer.add(textMesh);

        // Add card to main mesh
        cardContainer.add(cardMesh);

        // Store user data
        cardContainer.userData = {
          member,
          index,
          originalPosition: cardContainer.position.clone(),
          originalRotation: cardContainer.rotation.clone(),
          holographicMaterial,
          isHovered: false,
        };

        cards.push(cardContainer);
        cardGroup.add(cardContainer);
      });

      scene.add(cardGroup);
      cardsRef.current = cards;
    };

    createAdvancedParticles();
    createAdvancedMemberCards();

    // Enhanced mouse interaction with ray casting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      mouse.x = mouseRef.current.x;
      mouse.y = mouseRef.current.y;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardsRef.current, true);

      // Reset all cards
      cardsRef.current.forEach((card) => {
        if (card.userData.holographicMaterial) {
          card.userData.holographicMaterial.uniforms.hoverIntensity.value = 0;
          card.userData.isHovered = false;
        }
      });

      if (intersects.length > 0) {
        const hoveredCard = intersects[0].object.parent;
        if (hoveredCard.userData.holographicMaterial) {
          hoveredCard.userData.holographicMaterial.uniforms.hoverIntensity.value = 1;
          hoveredCard.userData.isHovered = true;
          setHoveredCard(hoveredCard.userData.member);
        }
      } else {
        setHoveredCard(null);
      }
    };

    // Click interaction with enhanced effects
    const handleClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardsRef.current, true);

      if (intersects.length > 0) {
        const clickedCard = intersects[0].object.parent;
        setSelectedMember(clickedCard.userData.member);

        // Add click effect
        if (clickedCard.userData.holographicMaterial) {
          clickedCard.userData.holographicMaterial.uniforms.hoverIntensity.value = 2;
          setTimeout(() => {
            if (clickedCard.userData.holographicMaterial) {
              clickedCard.userData.holographicMaterial.uniforms.hoverIntensity.value = 0;
            }
          }, 300);
        }
      }
    };

    // Keyboard controls for camera modes
    const handleKeyPress = (event) => {
      switch (event.key.toLowerCase()) {
        case "1":
          setCameraMode("orbit");
          break;
        case "2":
          setCameraMode("follow");
          break;
        case "3":
          setCameraMode("free");
          break;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyPress);

    // Advanced animation loop with multiple camera modes
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      const time = clockRef.current.getElapsedTime();
      const deltaTime = clockRef.current.getDelta();

      // Update particle systems
      particlesRef.current.forEach((system, index) => {
        if (system.userData.type === "particles") {
          system.material.uniforms.time.value = time;
          system.rotation.y = time * 0.05 * (index + 1);
          system.rotation.x = Math.sin(time * 0.03) * 0.1;
        } else if (system.userData.type === "rain") {
          // Matrix rain effect
          const positions = system.geometry.attributes.position.array;
          for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= deltaTime * 20; // Fall speed
            if (positions[i] < -50) {
              positions[i] = 50 + Math.random() * 20; // Reset to top
            }
          }
          system.geometry.attributes.position.needsUpdate = true;
        }
      });

      // Advanced card animations
      cardsRef.current.forEach((card, index) => {
        const userData = card.userData;

        // Update holographic material uniforms
        if (userData.holographicMaterial) {
          userData.holographicMaterial.uniforms.time.value = time;
          userData.holographicMaterial.uniforms.mousePos.value.set(
            mouseRef.current.x,
            mouseRef.current.y
          );
        }

        // Complex floating animation
        const floatSpeed = 0.5 + index * 0.1;
        const floatIntensity = userData.isHovered ? 1.5 : 1.0;

        card.position.y =
          userData.originalPosition.y +
          Math.sin(time * floatSpeed + index) * 0.8 * floatIntensity;

        // Breathing rotation
        card.rotation.z = Math.sin(time * 0.3 + index) * 0.05;

        // Hover effects
        if (userData.isHovered) {
          // Scale up slightly
          card.scale.setScalar(1.1);
          // Add rotation
          card.rotation.y =
            userData.originalRotation.y + Math.sin(time * 2) * 0.1;
        } else {
          card.scale.setScalar(1.0);
          card.rotation.y =
            userData.originalRotation.y + Math.sin(time * 0.5 + index) * 0.02;
        }

        // Update floating gems
        card.children.forEach((child, childIndex) => {
          if (child.geometry && child.geometry.type === "OctahedronGeometry") {
            const gemAngle = (childIndex / 5) * Math.PI * 2 + time * 0.5;
            const radius = 3 + Math.sin(time + childIndex) * 0.5;
            child.position.x = Math.cos(gemAngle) * radius;
            child.position.z = Math.sin(gemAngle) * radius;
            child.position.y = Math.sin(time * 2 + childIndex) * 0.5;
            child.rotation.x += deltaTime * 2;
            child.rotation.y += deltaTime * 1.5;
          }
        });
      });

      // Enhanced camera controls based on mode
      switch (cameraMode) {
        case "orbit":
          // Orbital camera movement
          const orbitRadius = 25 + Math.sin(time * 0.2) * 5;
          camera.position.x =
            Math.cos(time * 0.1) * orbitRadius + mouseRef.current.x * 3;
          camera.position.z =
            Math.sin(time * 0.1) * orbitRadius + mouseRef.current.y * 3;
          camera.position.y = 5 + Math.sin(time * 0.15) * 8;
          camera.lookAt(0, 0, 0);
          break;

        case "follow":
          // Follow mouse with smooth interpolation
          const targetX = mouseRef.current.x * 15;
          const targetY = mouseRef.current.y * 10 + 5;
          const targetZ = 20;

          camera.position.x += (targetX - camera.position.x) * deltaTime * 2;
          camera.position.y += (targetY - camera.position.y) * deltaTime * 2;
          camera.position.z += (targetZ - camera.position.z) * deltaTime * 2;
          camera.lookAt(0, 0, 0);
          break;

        case "free":
          // Free movement with WASD-like mouse control
          camera.position.x += mouseRef.current.x * deltaTime * 5;
          camera.position.y += mouseRef.current.y * deltaTime * 5;
          break;
      }

      // Dynamic lighting effects
      scene.children.forEach((child) => {
        if (child.type === "PointLight") {
          child.intensity = 0.5 + Math.sin(time * 2 + child.position.x) * 0.3;
          child.position.y += Math.sin(time + child.position.x) * deltaTime * 2;
        }
      });

      renderer.render(scene, camera);
    };

    // Handle resize with better responsiveness
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Start animation with delay for loading effect
    setTimeout(() => setLoading(false), 2000);
    animate();

    // Enhanced cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", handleResize);

      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      // Dispose of all materials and geometries
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, [teamData, cameraMode]);

  // Early return if no team data available
  if (!teamData || teamData.length === 0) {
    return (
      <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-black">
        <div className="text-center">
          <Terminal className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <p className="mb-2 font-mono text-lg text-green-400">
            $ ./core_team --status
          </p>
          <p className="font-mono text-sm text-green-600">
            {error
              ? "⚠️ API Error - Loading fallback data..."
              : "Loading team members..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Enhanced loading screen */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 border-4 rounded-full border-green-500/30"></div>
              <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute border-2 rounded-full inset-2 border-green-400/50 animate-pulse"></div>
              <Cpu className="absolute inset-0 w-8 h-8 m-auto text-green-500 animate-pulse" />
            </div>
            <div className="flex items-center justify-center mb-6 space-x-3">
              <Terminal className="w-6 h-6 text-green-500" />
              <p className="font-mono text-lg text-green-400">
                $ ./initialize_holographic_team_matrix.sh
              </p>
            </div>
            <div className="mt-4 space-y-2 font-mono text-sm text-green-600">
              <p className="flex items-center justify-center space-x-2">
                <Star className="w-4 h-4 animate-spin" />
                <span>Rendering 3D holographic displays...</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <Zap className="w-4 h-4 animate-bounce" />
                <span>Initializing particle systems...</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <Code className="w-4 h-4 animate-pulse" />
                <span>Loading team member data...</span>
              </p>
              {error && (
                <p className="flex items-center justify-center mt-2 space-x-2 text-yellow-400">
                  <Terminal className="w-4 h-4" />
                  <span>⚠️ API offline - Using cached data</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Terminal header */}
      <div className="absolute top-0 left-0 right-0 z-40 h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500 animate-pulse"></div>

      {/* Advanced Control Panel */}
      <div className="absolute z-40 top-4 left-4">
        <div className="bg-gray-900/90 backdrop-blur-sm border border-green-500/50 rounded-lg p-4 min-w-[300px]">
          <div className="flex items-center mb-3 space-x-3">
            <Terminal className="w-6 h-6 text-green-500" />
            <h1 className="font-mono text-xl font-bold text-green-400">
              $ ./holographic_team_viewer
            </h1>
          </div>
          <div className="space-y-1 font-mono text-sm text-green-300">
            <p className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>3D Holographic Matrix: ACTIVE</span>
            </p>
            <p className="text-green-600">
              {">"} {teamData.length} team members rendered in 3D space
            </p>
            {hoveredCard && (
              <p className="text-yellow-400 animate-pulse">
                {">"} Scanning: {hoveredCard.name}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Camera Mode Controls */}
      <div className="absolute z-40 top-4 right-4">
        <div className="p-4 border rounded-lg bg-gray-900/90 backdrop-blur-sm border-green-500/50">
          <div className="mb-3 font-mono text-sm text-green-400">
            <div className="flex items-center mb-2 space-x-2">
              <Cpu className="w-4 h-4" />
              <span>Camera Control Matrix</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["orbit", "follow", "free"].map((mode, index) => (
              <button
                key={mode}
                onClick={() => setCameraMode(mode)}
                className={`px-3 py-2 text-xs font-mono border rounded transition-all ${
                  cameraMode === mode
                    ? "bg-green-500/30 border-green-400 text-green-300"
                    : "border-green-600/50 text-green-600 hover:border-green-500/70 hover:text-green-400"
                }`}
              >
                [{index + 1}] {mode.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="mt-3 space-y-1 font-mono text-xs text-green-600">
            <p>🖱️ Mouse controls camera</p>
            <p>👆 Click cards for details</p>
            <p>⌨️ Press 1,2,3 for camera modes</p>
            <p>🌟 Holographic particles active</p>
          </div>
        </div>
      </div>

      {/* Three.js mount point */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Enhanced Member details modal */}
      {selectedMember && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-8 mx-4 overflow-hidden border-2 border-green-500 rounded-lg bg-gray-900/95">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent animate-pulse"></div>
            </div>

            {/* Terminal header */}
            <div className="relative flex items-center pb-3 mb-6 space-x-2 border-b border-green-500/30">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="flex-1 font-mono text-lg text-center text-green-400">
                ~/hologram/{selectedMember.name.toLowerCase().replace(" ", "_")}
              </span>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-1 font-mono text-2xl leading-none text-green-500 transition-colors hover:text-green-400"
              >
                ×
              </button>
            </div>

            <div className="relative text-center">
              {/* Enhanced avatar with actual image */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-spin-slow"></div>
                <div className="absolute border-2 border-green-400 rounded-full inset-1 animate-pulse"></div>

                {/* Try to show actual image, fallback to initials */}
                <div className="absolute flex items-center justify-center overflow-hidden rounded-full inset-2 bg-gradient-to-br from-green-400 to-green-600">
                  {selectedMember.img &&
                  !selectedMember.img.includes("/api/placeholder") &&
                  !imageLoadError[selectedMember._id] ? (
                    <NextImage
                      src={
                        selectedMember.img.startsWith("/")
                          ? selectedMember.img
                          : `/coreteam/${selectedMember.img}`
                      }
                      alt={selectedMember.name}
                      width={120}
                      height={120}
                      className="object-cover w-full h-full rounded-full"
                      onError={(e) => {
                        console.log(
                          `Failed to load image for ${selectedMember.name}: ${selectedMember.img}`
                        );
                        setImageLoadError((prev) => ({
                          ...prev,
                          [selectedMember._id]: true,
                        }));
                      }}
                      onLoad={() => {
                        console.log(
                          `Successfully loaded image for ${selectedMember.name}`
                        );
                      }}
                    />
                  ) : (
                    <span className="flex items-center justify-center w-full h-full font-mono text-xl font-bold text-black">
                      {selectedMember.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>

                <div className="absolute border rounded-full -inset-2 border-green-500/30 animate-ping"></div>
              </div>

              <h3 className="mb-2 font-mono text-2xl font-bold text-green-400">
                {selectedMember.name}
              </h3>

              <div className="flex items-center justify-center mb-6 space-x-2">
                <Code className="w-5 h-5 text-green-600 animate-pulse" />
                <p className="font-mono text-lg text-green-600">
                  {selectedMember.title}
                </p>
              </div>

              {/* Enhanced action buttons */}
              <div className="flex justify-center mb-6 space-x-4">
                {selectedMember.github && (
                  <a
                    href={selectedMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-green-600 transition-all transform border-2 border-green-800 rounded-lg group hover:border-green-500 hover:text-green-400 hover:bg-green-500/10 hover:scale-110"
                  >
                    <Github className="w-6 h-6 group-hover:animate-pulse" />
                  </a>
                )}
                {selectedMember.linkedin && (
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-green-600 transition-all transform border-2 border-green-800 rounded-lg group hover:border-green-500 hover:text-green-400 hover:bg-green-500/10 hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6 group-hover:animate-pulse" />
                  </a>
                )}
              </div>

              {/* Status readout */}
              <div className="p-4 border rounded-lg bg-black/50 border-green-500/30">
                <div className="flex items-center justify-center mb-2 space-x-2 font-mono text-sm text-green-600">
                  <Server className="w-4 h-4 animate-pulse" />
                  <span>MEMBER_STATUS.LOG</span>
                </div>
                <div className="space-y-1 font-mono text-xs text-green-400">
                  <p>$ echo &quot;Holographic projection successful&quot;</p>
                  <p>$ status: ACTIVE_CONTRIBUTOR</p>
                  <p>$ last_activity: $(date)</p>
                  <p>$ role: {selectedMember.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Status Footer */}
      <div className="absolute z-40 bottom-4 left-4">
        <div className="p-3 border rounded-lg bg-gray-900/90 backdrop-blur-sm border-green-500/30">
          <div className="flex items-center space-x-3 font-mono text-xs text-green-600">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Server className="w-3 h-3" />
            </div>
            <div className="space-y-1">
              <div>
                $ echo &quot;Matrix active: {teamData.length} nodes
                rendered&quot;
              </div>
              <div className="flex items-center space-x-4 text-green-700">
                <span>GPU: Optimal</span>
                <span>Particles: {particlesRef.current?.length || 0}</span>
                <span>Mode: {cameraMode.toUpperCase()}</span>
              </div>
              <div className="text-xs text-green-800">
                Images:{" "}
                {
                  teamData.filter(
                    (member) =>
                      member.img &&
                      !member.img.includes("/api/placeholder") &&
                      !imageLoadError[member._id]
                  ).length
                }
                /{teamData.length} loaded
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
