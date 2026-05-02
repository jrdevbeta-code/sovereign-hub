import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
        <span className="text-[8px] font-orbitron font-bold">{s.value}</span>
        <span className="text-[6px] font-orbitron font-bold opacity-70">{s.label}</span>
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
  const miniX = isActive ? 28 : -60;

  const handleMiniTap = () => {
    if (estado === "peeking") setEstado("open");
    else if (estado === "open") setEstado("dismissed");
  };

  return (
    <>
      {/* Overlay para cerrar */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setEstado("dismissed")}
          />
        )}
      </AnimatePresence>

      {/* Mini Keiko */}
      <div className="fixed z-50 pointer-events-none" style={{ bottom: 160, left: -38 }}>
        <motion.div
          className="relative pointer-events-auto"
          initial={{ x: -60 }}
          animate={{ x: miniX }}
          transition={{ duration: estado === "dismissed" ? 0.4 : 0.6, ease: "easeOut" }}
        >
          <div className="relative cursor-pointer" style={{ position: "relative" }} onClick={handleMiniTap}>
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
      </div>

      {/* Panel de insights */}
      <AnimatePresence>
        {estado === "open" && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleX: 0, scaleY: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              originX: 0,
              originY: 1,
              width: "calc(100vw - 72px)",
              maxHeight: "55vh",
              left: 50,
              bottom: 140,
              maxWidth: 360,
            }}
            className="fixed z-50 glass-card-deep rounded-2xl"
          >
            <div
              className="p-3"
              style={{ border: "1px solid hsla(185,100%,50%,0.2)", borderRadius: 16 }}
            >
              {/* Header del panel */}
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[9px] font-orbitron tracking-widest text-muted-foreground uppercase">
                  Keiko · Para ti ahora
                </p>
                <button
                  className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-cyan transition"
                  onClick={() => setEstado("dismissed")}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Insights cards */}
              <div className="flex flex-col gap-2">
                {/* Tarjeta 1 — Radar */}
                <div
                  className="rounded-xl"
                  style={{
                    background: "hsla(43,80%,60%,0.06)",
                    border: "1px solid hsla(43,80%,60%,0.1)",
                    padding: "10px 12px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-gold" />
                    <span
                      className="text-[8px] font-orbitron px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsla(43,80%,60%,0.15)",
                        color: "hsl(43,80%,60%)",
                      }}
                    >
                      Radar
                    </span>
                  </div>
                  <p className="text-[11px] font-orbitron font-bold text-foreground leading-tight">
                    El arroz subió 12% en El Marqués
                  </p>
                  <p className="text-[10px] font-exo text-muted-foreground mt-0.5">
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
                    padding: "10px 12px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-3.5 h-3.5 text-cyan" />
                    <span
                      className="text-[8px] font-orbitron px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsla(185,100%,50%,0.15)",
                        color: "hsl(185,100%,50%)",
                      }}
                    >
                      Nexus
                    </span>
                  </div>
                  <p className="text-[11px] font-orbitron font-bold text-foreground leading-tight">
                    Ana acaba de unirse a Vecinos del Marqués
                  </p>
                  <p className="text-[10px] font-exo text-muted-foreground mt-0.5">
                    Referida por Carlos · Tu círculo ahora tiene 12 activos
                  </p>
                </div>

                {/* Tarjeta 3 — Taller */}
                <div
                  className="rounded-xl"
                  style={{
                    background: "hsla(43,80%,60%,0.06)",
                    border: "1px solid hsla(43,80%,60%,0.1)",
                    padding: "10px 12px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span
                      className="text-[8px] font-orbitron px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsla(43,80%,60%,0.15)",
                        color: "hsl(43,80%,60%)",
                      }}
                    >
                      Taller
                    </span>
                  </div>
                  <p className="text-[11px] font-orbitron font-bold text-foreground leading-tight">
                    Tu propuesta tiene 4 días sin respuesta
                  </p>
                  <p className="text-[10px] font-exo text-muted-foreground mt-0.5">
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
                <p className="text-[9px] text-muted-foreground font-exo">
                  o pregúntame algo
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeikoHint;
