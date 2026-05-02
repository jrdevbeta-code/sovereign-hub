import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import mentorImg from "@/assets/mentor-avatar.png";

// Star-burst particle distribution: 24 particles arranged on an irregular
// multi-pointed star (mixing 7, 8 and 12 point geometries) covering top,
// sides and bottom — never the predictable square edges of before.
const CENTER = 86; // container is 173x173 → center ~86
const STAR_RADII = [150, 110, 165, 125, 145]; // irregular radii for "spikes"
const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  // Combine 3 star geometries: 7-pt, 8-pt, 12-pt — interleaved by index
  const geometries = [7, 8, 12];
  const g = geometries[i % 3];
  const pointIndex = Math.floor(i / 3);
  // Slight angular jitter so it doesn't look mathematically regular
  const jitter = ((i * 53) % 17) / 17 - 0.5; // -0.5..0.5
  const angle = ((pointIndex / g) * Math.PI * 2) + (jitter * 0.35) - Math.PI / 2;
  const radius = STAR_RADII[i % STAR_RADII.length];

  const x = CENTER + Math.cos(angle) * radius;
  const y = CENTER + Math.sin(angle) * radius;

  const size = 3 + Math.round(Math.random() * 4); // 3-7px
  const color = i % 2 === 0 ? "#38E056" : "#FFC107";
  // Stagger delays so particles don't all fly in lockstep — wave effect
  const delay = (Math.abs(jitter) * 0.4) + ((i % 4) * 0.06);
  // Curved trajectory: each particle gets a control-point offset for arc motion
  const curveSign = i % 2 === 0 ? 1 : -1;
  const curveX = Math.cos(angle + Math.PI / 2) * 30 * curveSign;
  const curveY = Math.sin(angle + Math.PI / 2) * 30 * curveSign;

  return { x, y, size, color, key: i, delay, curveX, curveY };
});

const MentorSection = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1800);
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
                visible: { transition: { staggerChildren: 0.025 } },
                hidden: {},
              }}
            >
              {/* Faint star-shaped aura ring that expands outward as particles converge */}
              <motion.div
                className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                style={{
                  width: 200,
                  height: 200,
                  marginLeft: -100,
                  marginTop: -100,
                  background:
                    "radial-gradient(circle, transparent 55%, hsla(280,90%,60%,0.18) 65%, transparent 75%)",
                  filter: "blur(4px)",
                }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.1, 0.6], opacity: [0, 0.9, 0] }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />

              {PARTICLES.map((p) => (
                <motion.span
                  key={p.key}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: p.color,
                    boxShadow: `0 0 8px ${p.color}, 0 0 14px ${p.color}`,
                    left: 0,
                    top: 0,
                  }}
                  initial={{ x: p.x, y: p.y, opacity: 0, scale: 0.6 }}
                  animate={{
                    // Curved arc: pass through a control point before reaching center
                    x: [p.x, p.x * 0.5 + CENTER * 0.5 + p.curveX, CENTER],
                    y: [p.y, p.y * 0.5 + CENTER * 0.5 + p.curveY, CENTER],
                    opacity: [0, 1, 1, 0],
                    scale: [0.6, 1.4, 1.6, 0.2],
                  }}
                  transition={{
                    duration: 1.3,
                    delay: p.delay,
                    ease: [0.5, 0.05, 0.3, 1], // anticipate-then-zoom
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
