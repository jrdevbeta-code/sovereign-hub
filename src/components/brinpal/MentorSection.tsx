import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import mentorImg from "@/assets/mentor-avatar.png";

// Star-burst particle distribution: 60 tiny bright particles, mostly gold,
// arranged on an irregular multi-pointed star (7/8/12 geometries) and
// landing at DIFFERENT body points (head, shoulders, collar, sides, base)
// rather than all converging on a single center point.
const CENTER = 86; // container is 173x173 → center ~86

// Landing targets across Keiko's body (relative to 173x173 container)
const LANDING_TARGETS = [
  { x: 86, y: 30 },   // top of head
  { x: 70, y: 45 },   // upper-left head
  { x: 102, y: 45 },  // upper-right head
  { x: 86, y: 60 },   // diadem
  { x: 60, y: 85 },   // left shoulder
  { x: 112, y: 85 },  // right shoulder
  { x: 86, y: 110 },  // collar (gold)
  { x: 75, y: 115 },  // collar left
  { x: 97, y: 115 },  // collar right
  { x: 70, y: 135 },  // body left
  { x: 102, y: 135 }, // body right
  { x: 86, y: 150 },  // base
];

const STAR_RADII = [155, 115, 170, 130, 150, 140, 165];
const PARTICLES = Array.from({ length: 60 }, (_, i) => {
  const geometries = [7, 8, 12];
  const g = geometries[i % 3];
  const pointIndex = Math.floor(i / 3);
  const jitter = ((i * 53) % 17) / 17 - 0.5;
  const angle = ((pointIndex / g) * Math.PI * 2) + (jitter * 0.55) - Math.PI / 2;
  const radius = STAR_RADII[i % STAR_RADII.length] + ((i * 7) % 25);

  const x = CENTER + Math.cos(angle) * radius;
  const y = CENTER + Math.sin(angle) * radius;

  const size = 1.5 + (i % 5) * 0.6; // 1.5–4px (smaller, brighter)
  // 80% gold variants, 20% green accent
  const goldShades = ["#FFD24A", "#FFC107", "#FFE27A", "#F5B400", "#FFCE3D"];
  const color = i % 5 === 0 ? "#5BE07A" : goldShades[i % goldShades.length];

  // Each particle lands at a different body target
  const target = LANDING_TARGETS[i % LANDING_TARGETS.length];
  // tiny per-particle scatter around the target
  const tx = target.x + (((i * 13) % 9) - 4);
  const ty = target.y + (((i * 19) % 9) - 4);

  const delay = (Math.abs(jitter) * 0.5) + ((i % 6) * 0.04);
  const curveSign = i % 2 === 0 ? 1 : -1;
  const curveX = Math.cos(angle + Math.PI / 2) * (25 + (i % 4) * 6) * curveSign;
  const curveY = Math.sin(angle + Math.PI / 2) * (25 + (i % 4) * 6) * curveSign;

  return { x, y, tx, ty, size, color, key: i, delay, curveX, curveY };
});

const MentorSection = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 4200);
  };

  useEffect(() => {
    const onProc = () => handleProcess();
    window.addEventListener("brinpal:procesar", onProc);
    return () => window.removeEventListener("brinpal:procesar", onProc);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center px-5 py-0 -mt-16"
    >
      <div className="relative w-[173px] h-[173px]">
        {/* Teal illumination - fades in after Keiko lands */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full bg-gradient-to-t from-cyan/20 to-transparent blur-xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-3 rounded-full bg-cyan/30 blur-md"
        />

        {/* Star-burst particle convergence */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              key="particles"
              className="absolute inset-0 z-20 pointer-events-none overflow-visible"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.012 } },
                hidden: {},
              }}
            >
              {/* Faint gold aura ring that expands outward as particles converge */}
              <motion.div
                className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                style={{
                  width: 200,
                  height: 200,
                  marginLeft: -100,
                  marginTop: -100,
                  background:
                    "radial-gradient(circle, transparent 55%, hsla(43,90%,60%,0.22) 65%, transparent 75%)",
                  filter: "blur(4px)",
                }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.1, 0.6], opacity: [0, 0.9, 0] }}
                transition={{ duration: 1.6, ease: "easeOut" }}
              />

              {PARTICLES.map((p) => (
                <motion.span
                  key={p.key}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: p.color,
                    boxShadow: `0 0 4px ${p.color}, 0 0 10px ${p.color}, 0 0 18px ${p.color}`,
                    left: 0,
                    top: 0,
                  }}
                  initial={{ x: p.x, y: p.y, opacity: 0, scale: 0.4 }}
                  animate={{
                    x: [p.x, p.x * 0.5 + p.tx * 0.5 + p.curveX, p.tx],
                    y: [p.y, p.y * 0.5 + p.ty * 0.5 + p.curveY, p.ty],
                    opacity: [0, 1, 1, 0],
                    scale: [0.4, 1.6, 1.8, 0.3],
                  }}
                  transition={{
                    duration: 1.4,
                    delay: p.delay,
                    ease: [0.5, 0.05, 0.3, 1],
                    times: [0, 0.45, 0.85, 1],
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keiko: descends from y:-60 then keeps floating */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.img
            src={mentorImg}
            alt="Keiko - Tu asistente"
            width={173}
            height={173}
            className="mentor-glow float-animation"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />

          {/* Gold collar shimmer — pulses when particles land */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                key="collar-glow"
                className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  bottom: "18%",
                  width: 90,
                  height: 18,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse, hsla(43,90%,65%,0.95) 0%, hsla(43,80%,55%,0.5) 40%, transparent 75%)",
                  filter: "blur(2px)",
                  mixBlendMode: "screen",
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: [0, 1, 0.7, 1, 0],
                  scale: [0.6, 1.2, 1, 1.3, 0.8],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut", times: [0, 0.35, 0.55, 0.8, 1] }}
              />
            )}
          </AnimatePresence>

          {/* Headband (diadema) violet tint overlay — replaces cyan temporarily */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                key="diadem-violet"
                className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  top: "8%",
                  width: 70,
                  height: 22,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse, hsla(280,100%,65%,0.85) 0%, hsla(265,90%,55%,0.4) 45%, transparent 75%)",
                  filter: "blur(3px)",
                  mixBlendMode: "screen",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.95, 0.95, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut", times: [0, 0.25, 0.8, 1] }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4, ease: "easeOut" }}
        className="-mt-3 text-sm text-muted-foreground font-exo text-center"
      >
        Hola, soy <span className="text-cyan cyan-glow font-semibold">Keiko</span>. ¿En qué te ayudo hoy?
      </motion.p>
    </motion.section>
  );
};

export default MentorSection;
