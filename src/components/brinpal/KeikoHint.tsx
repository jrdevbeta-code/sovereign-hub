import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TrendingUp, Users, Sparkles, Mic, Keyboard, X } from "lucide-react";
import mentorImg from "@/assets/mentor-avatar.png";

type Estado = "hidden" | "peeking" | "open" | "dismissed";

const InlineTerna = ({ bs, bcv, bp }: { bs: string; bcv: string; bp: string }) => (
  <div className="flex gap-1 mt-2">
    {[
      { label: "Bs", value: bs, bg: "hsl(0,0%,96%)", color: "hsl(0,0%,10%)" },
      { label: "BCV", value: bcv, bg: "hsl(216,80%,50%)", color: "hsl(0,0%,100%)" },
      { label: "BP", value: bp, bg: "hsl(145,60%,40%)", color: "hsl(0,0%,100%)" },
    ].map((s) => (
      <div
        key={s.label}
        className="flex-1 py-1 flex flex-col items-center rounded-md"
        style={{ background: s.bg, color: s.color }}
      >
        <span className="text-[10px] font-orbitron font-bold">{s.value}</span>
        <span className="text-[10px] font-orbitron font-bold opacity-70">{s.label}</span>
      </div>
    ))}
  </div>
);

const KeikoHint = () => {
  const [estado, setEstado] = useState<Estado>("hidden");

  useEffect(() => {
    if (estado !== "hidden") return;
    const t = setTimeout(() => {
      setEstado((prev) => (prev === "hidden" ? "peeking" : prev));
    }, 8000);
    return () => clearTimeout(t);
  }, [estado]);

  const isActive = estado === "peeking" || estado === "open";
  const miniX = isActive ? 0 : -60;

  const handleMiniTap = () => {
    if (estado === "peeking") setEstado("open");
    else if (estado === "open") setEstado("dismissed");
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Overlay para cerrar */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEstado("dismissed")}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 49,
              background: "transparent",
            }}
          />
        )}
      </AnimatePresence>

      {/* Línea decorativa detrás de mini-Keiko */}
      <motion.div
        animate={{
          x: estado === "peeking" ? 0 : -40,
          opacity: estado === "peeking" ? 0.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        style={{
          position: "fixed",
          left: 0,
          bottom: "244px",
          width: "20px",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, hsl(185,100%,50%) 60%, hsl(185,100%,70%) 100%)",
          borderRadius: "0 2px 2px 0",
          zIndex: 48,
          pointerEvents: "none",
        }}
      />

      {/* Mini Keiko */}
      <motion.div
        initial={{ x: -60 }}
        animate={{ x: miniX }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        style={{
          position: "fixed",
          left: "-16px",
          bottom: "220px",
          width: "52px",
          height: "60px",
          zIndex: 50,
        }}
      >
        <div
          className="relative cursor-pointer"
          style={{ position: "relative" }}
          onClick={handleMiniTap}
        >
          {/* Wave en peeking */}
          {estado === "peeking" && (
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: "30% 80%" }}
              animate={{ rotate: [-15, 0, -15, 0] }}
              transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8 }}
            >
              <img
                src={mentorImg}
                alt="Keiko - Asomada"
                width={52}
                height={52}
                className="mentor-glow select-none"
                draggable={false}
              />
            </motion.div>
          )}
          {estado !== "peeking" && (
            <img
              src={mentorImg}
              alt="Keiko - Mini"
              width={52}
              height={52}
              className="mentor-glow select-none"
              draggable={false}
            />
          )}

          {/* Badge pulsante cyan en peeking */}
          {estado === "peeking" && (
            <span className="absolute flex h-2.5 w-2.5" style={{ top: -4, right: -4 }}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-60" />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ background: "hsl(185,100%,50%)" }}
              />
            </span>
          )}
        </div>
      </motion.div>

      {/* Panel de insights */}
      <AnimatePresence>
        {estado === "open" && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleX: 0, scaleY: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: "fixed",
              originX: 0,
              originY: 1,
              width: "calc(100vw - 60px)",
              top: "10vh",
              maxHeight: "calc(90vh - 140px)",
              left: "36px",
              bottom: "158px",
              maxWidth: 360,
              zIndex: 50,
            }}
            className="glass-card-deep rounded-2xl"
          >
            <div
              className="p-3"
              style={{ border: "1px solid hsla(185,100%,50%,0.2)", borderRadius: 16 }}
            >
              {/* Header del panel */}
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[11px] font-orbitron tracking-widest text-muted-foreground uppercase">
                  Keiko · Para ti ahora
                </p>
                <button
                  className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-cyan transition"
                  onClick={() => setEstado("dismissed")}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Insights cards - scroll horizontal */}
              <div
                className="keiko-panel-scroll"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  overflowX: "hidden",
                  overflowY: "auto",
                  padding: "8px",
                  maxHeight: "calc(90vh - 220px)",
                  scrollSnapType: "y mandatory",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {/* Tarjeta 1 — Radar */}
                <div
                  className="rounded-xl"
                  style={{
                    background: "hsla(43,80%,60%,0.06)",
                    border: "1px solid hsla(43,80%,60%,0.1)",
                    padding: "10px 10px",
                    width: "100%",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-gold" />
                    <span
                      className="text-[10px] font-orbitron px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsla(43,80%,60%,0.15)",
                        color: "hsl(43,80%,60%)",
                      }}
                    >
                      Radar
                    </span>
                  </div>
                  <p className="text-[13px] font-orbitron font-bold text-foreground leading-tight">
                    El arroz subió 12% en El Marqués
                  </p>
                  <p className="text-[12px] font-exo mt-0.5" style={{ color: "hsl(210,10%,80%)" }}>
                    Mejor comprarlo hoy — tendencia alcista esta semana
                  </p>
                  <InlineTerna bs="3,20" bcv="0,09" bp="0,09" />
                </div>

                {/* Tarjeta 2 — Nexus */}
                <div
                  className="rounded-xl"
                  style={{
                    background: "hsla(185,100%,50%,0.06)",
                    border: "1px solid hsla(185,100%,50%,0.1)",
                    padding: "10px 10px",
                    width: "100%",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-3.5 h-3.5 text-cyan" />
                    <span
                      className="text-[10px] font-orbitron px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsla(185,100%,50%,0.15)",
                        color: "hsl(185,100%,50%)",
                      }}
                    >
                      Nexus
                    </span>
                  </div>
                  <p className="text-[13px] font-orbitron font-bold text-foreground leading-tight">
                    Ana acaba de unirse a Vecinos del Marqués
                  </p>
                  <p className="text-[12px] font-exo mt-0.5" style={{ color: "hsl(210,10%,80%)" }}>
                    Referida por Carlos · Tu círculo ahora tiene 12 activos
                  </p>
                </div>

                {/* Tarjeta 3 — Taller */}
                <div
                  className="rounded-xl"
                  style={{
                    background: "hsla(43,80%,60%,0.06)",
                    border: "1px solid hsla(43,80%,60%,0.1)",
                    padding: "10px 10px",
                    width: "100%",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span
                      className="text-[10px] font-orbitron px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsla(43,80%,60%,0.15)",
                        color: "hsl(43,80%,60%)",
                      }}
                    >
                      Taller
                    </span>
                  </div>
                  <p className="text-[13px] font-orbitron font-bold text-foreground leading-tight">
                    Tu propuesta tiene 4 días sin respuesta
                  </p>
                  <p className="text-[12px] font-exo mt-0.5" style={{ color: "hsl(210,10%,80%)" }}>
                    El comité revisa ideas cada 1ro de mes · Faltan 6 días
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div
                className="mt-3 pt-2 flex flex-col items-center gap-1"
                style={{ borderTop: "1px solid hsla(185,100%,50%,0.08)" }}
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "hsla(185,100%,50%,0.1)",
                      border: "1px solid hsla(185,100%,50%,0.25)",
                    }}
                  >
                    <Mic className="w-4 h-4 text-cyan" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "hsla(43,80%,60%,0.1)",
                      border: "1px solid hsla(43,80%,60%,0.25)",
                    }}
                  >
                    <Keyboard className="w-4 h-4 text-gold" />
                  </motion.button>
                </div>
                <p className="text-[12px] font-exo" style={{ color: "hsl(210,10%,80%)" }}>
                  o pregúntame algo
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};

export default KeikoHint;
