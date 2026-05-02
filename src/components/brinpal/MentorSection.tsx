import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import mentorImg from "@/assets/mentor-avatar.png";

// 24 particles distributed across 4 edges (6 per edge)
const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const edge = Math.floor(i / 6); // 0=top, 1=right, 2=bottom, 3=left
  const t = (i % 6) / 5; // 0..1 across edge
  // Container is ~200x200; center = (100, 100). Spawn just outside edges.
  let x = 0;
  let y = 0;
  const min = -20;
  const max = 220;
  if (edge === 0) { x = min + t * (max - min); y = min; }
  if (edge === 1) { x = max; y = min + t * (max - min); }
  if (edge === 2) { x = min + t * (max - min); y = max; }
  if (edge === 3) { x = min; y = min + t * (max - min); }
  const size = 3 + Math.round(Math.random() * 3); // 3-6px
  const color = i % 2 === 0 ? "#38E056" : "#FFC107";
  return { x, y, size, color, key: i };
});

const MentorSection = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1400);
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

        {/* Particle convergence */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              key="particles"
              className="absolute inset-0 z-20 pointer-events-none"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
                hidden: {},
              }}
            >
              {PARTICLES.map((p) => (
                <motion.span
                  key={p.key}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: p.color,
                    boxShadow: `0 0 6px ${p.color}`,
                    left: 0,
                    top: 0,
                  }}
                  initial={{ x: p.x, y: p.y, opacity: 0.5, scale: 1 }}
                  animate={{
                    x: 100,
                    y: 100,
                    opacity: [0.5, 1, 0],
                    scale: [1, 1.2, 0.4],
                  }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
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
