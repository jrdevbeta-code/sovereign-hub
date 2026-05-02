import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TrendingUp, Users, Sparkles, Mic, Keyboard, X, Send, Film, Music } from "lucide-react";
import RadarIcon from "./RadarIcon";
import mentorImg from "@/assets/mentor-avatar.png";

type Estado = "hidden" | "peeking" | "open" | "dismissed";

type InsightCard = {
  id: string;
  Icon: typeof TrendingUp;
  iconClassName?: string;
  iconColor?: string;
  label: string;
  background: string;
  border: string;
  pillBg: string;
  pillColor: string;
  title: string;
  description: string;
  terna?: { bs: string; bcv: string; bp: string };
};

const InlineTerna = ({ bs, bcv, bp }: { bs: string; bcv: string; bp: string }) => {
  const segments = [
    { label: "Bs", value: bs, bg: "hsl(0,0%,96%)", color: "hsl(0,0%,10%)" },
    { label: "BCV", value: bcv, bg: "hsl(216,80%,50%)", color: "hsl(0,0%,100%)" },
    { label: "BP", value: bp, bg: "hsl(145,60%,40%)", color: "hsl(0,0%,100%)" },
  ];
  return (
    <div className="flex gap-[2px] rounded-md overflow-hidden mt-2">
      {segments.map((seg) => (
        <div
          key={seg.label}
          className="flex items-center justify-between gap-1 px-1.5 py-[3px] flex-1 min-w-0"
          style={{ background: seg.bg, color: seg.color, flexGrow: seg.value.length > 5 ? 1.6 : 1 }}
        >
          <span className="text-[10px] font-orbitron" style={{ fontWeight: 900 }}>{seg.label}</span>
          <span
            className="text-[10px] font-orbitron ml-auto whitespace-nowrap"
            style={{ fontWeight: 900 }}
          >
            {seg.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const KeikoHint = () => {
  const [estado, setEstado] = useState<Estado>("hidden");
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dismissedCards, setDismissedCards] = useState<string[]>([]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setInputValue("");
    setShowInput(false);
  };

  useEffect(() => {
    if (estado !== "hidden") return;
    const t = setTimeout(() => {
      setEstado((prev) => (prev === "hidden" ? "peeking" : prev));
    }, 8000);
    return () => clearTimeout(t);
  }, [estado]);

  const isActive = estado === "peeking" || estado === "open";
  const miniX = isActive ? 0 : -60;

  const insightCards: InsightCard[] = [
    {
      id: "radar",
      Icon: TrendingUp,
      iconClassName: "text-gold",
      label: "Radar",
      background: "hsla(43,80%,60%,0.06)",
      border: "1px solid hsla(43,80%,62%,0.38)",
      pillBg: "rgba(255,255,255,0.06)",
      pillColor: "hsl(43,80%,62%)",
      title: "El arroz subió 12% en El Marqués",
      description: "Mejor comprarlo hoy — tendencia alcista esta semana",
      terna: { bs: "321.524,89", bcv: "662,93", bp: "502,45" },
    },
    {
      id: "nexus",
      Icon: Users,
      iconClassName: "text-cyan",
      label: "Nexus",
      background: "hsla(185,100%,50%,0.06)",
      border: "1px solid hsla(185,100%,52%,0.38)",
      pillBg: "rgba(255,255,255,0.06)",
      pillColor: "hsl(185,100%,52%)",
      title: "Ana acaba de unirse a Vecinos del Marqués",
      description: "Referida por Carlos · Tu círculo ahora tiene 12 activos",
    },
    {
      id: "taller",
      Icon: Sparkles,
      iconClassName: "text-gold",
      label: "Taller",
      background: "hsla(43,80%,60%,0.06)",
      border: "1px solid hsla(43,80%,62%,0.38)",
      pillBg: "rgba(255,255,255,0.06)",
      pillColor: "hsl(43,80%,62%)",
      title: "Tu propuesta tiene 4 días sin respuesta",
      description: "El comité revisa ideas cada 1ro de mes · Faltan 6 días",
    },
    {
      id: "netflix",
      Icon: Film,
      iconColor: "hsl(28,90%,62%)",
      label: "Cine",
      background: "hsla(0,75%,55%,0.06)",
      border: "1px solid hsla(28,90%,62%,0.38)",
      pillBg: "rgba(255,255,255,0.06)",
      pillColor: "hsl(28,90%,62%)",
      title: "\"El Eternauta\" — estreno trending #1",
      description: "Sci-fi argentina · 6 episodios · 94% match para tu gusto",
    },
    {
      id: "music",
      Icon: Music,
      iconColor: "hsl(165,70%,55%)",
      label: "Música",
      background: "hsla(280,60%,55%,0.06)",
      border: "1px solid hsla(165,70%,55%,0.38)",
      pillBg: "rgba(255,255,255,0.06)",
      pillColor: "hsl(165,70%,55%)",
      title: "Alejandro Sanz lanza \"Ascendente\"",
      description: "12 tracks · Reseña: 4.6/5 · Flamenco-pop íntimo y maduro",
    },
  ];

  const visibleInsightCards = insightCards.filter((card) => !dismissedCards.includes(card.id));

  const dismissCard = (id: string) => {
    setDismissedCards((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

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
              width: "calc(100vw - 40px)",
              top: "4vh",
              maxHeight: "calc(96vh - 20px)",
              left: "20px",
              right: "20px",
              bottom: "20px",
              maxWidth: "calc(28rem - 40px)",
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
                <p
                  className="text-[11px] font-orbitron tracking-widest uppercase"
                  style={{ color: "hsl(0,0%,100%)" }}
                >
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
                onWheelCapture={(e) => e.stopPropagation()}
                onTouchMoveCapture={(e) => e.stopPropagation()}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  overflowX: "hidden",
                  overflowY: "auto",
                  padding: "4px 2px",
                  maxHeight: "calc(86.4vh - 108px)",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehavior: "contain",
                  scrollbarWidth: "thin",
                  msOverflowStyle: "auto",
                }}
              >
                <AnimatePresence initial={false}>
                  {visibleInsightCards.map((card) => {
                    const Icon = card.Icon;

                    return (
                      <motion.div
                        key={card.id}
                        layout
                        initial={{ opacity: 0, x: 20, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 90, scale: 0.96 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="relative rounded-xl"
                        style={{
                          background: card.background,
                          border: card.border,
                          padding: "10px 30px 10px 10px",
                          width: "100%",
                          scrollSnapAlign: "start",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => dismissCard(card.id)}
                          className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full"
                          style={{ color: "hsl(0,0%,100%)" }}
                          aria-label="Cerrar tarjeta"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`w-3.5 h-3.5 ${card.iconClassName ?? ""}`} style={{ color: card.iconColor }} />
                          <span
                            className="text-[11px] font-orbitron px-2 py-0.5 rounded-full"
                            style={{
                              background: card.pillBg,
                              color: card.pillColor,
                              border: card.border,
                              letterSpacing: "0.15em",
                              fontWeight: 900,
                            }}
                          >
                            {card.label}
                          </span>
                        </div>
                        <p
                          className="text-[13px] font-orbitron text-foreground leading-tight"
                          style={{ fontWeight: 900, letterSpacing: "0.05em" }}
                        >
                          {card.title}
                        </p>
                        <p className="text-[12px] font-exo mt-0.5" style={{ color: "hsl(0,0%,95%)" }}>
                          {card.description}
                        </p>
                        {card.terna && <InlineTerna bs={card.terna.bs} bcv={card.terna.bcv} bp={card.terna.bp} />}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div
                className="mt-3 pt-2 flex flex-col items-center gap-2"
                style={{ borderTop: "1px solid hsla(185,100%,50%,0.08)" }}
              >
                <AnimatePresence mode="wait">
                  {!showInput ? (
                    <motion.div
                      key="buttons"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                      className="flex flex-col items-center gap-1"
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
                          onClick={() => setShowInput(true)}
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            background: "hsla(43,80%,60%,0.1)",
                            border: "1px solid hsla(43,80%,60%,0.25)",
                          }}
                        >
                          <Keyboard className="w-4 h-4 text-gold" />
                        </motion.button>
                      </div>
                      <p className="text-[12px] font-exo" style={{ color: "hsl(0,0%,95%)" }}>
                        o pregúntame algo
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
                      className="w-full"
                    >
                      <div
                        className="flex items-center gap-1.5 rounded-full pl-3 pr-1 py-1"
                        style={{
                          background:
                            "linear-gradient(135deg, hsla(216,30%,14%,0.9), hsla(216,30%,8%,0.7))",
                          border: "1px solid hsla(43,80%,60%,0.35)",
                          boxShadow:
                            "0 0 12px hsla(43,80%,60%,0.15), inset 0 0 8px hsla(43,80%,60%,0.05)",
                        }}
                      >
                        <input
                          autoFocus
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSend();
                            if (e.key === "Escape") setShowInput(false);
                          }}
                          placeholder="Pregúntale a Keiko…"
                          className="flex-1 bg-transparent border-0 outline-none text-[12px] font-exo placeholder:text-muted-foreground"
                          style={{ color: "hsl(0,0%,100%)" }}
                        />
                        <motion.button
                          whileTap={{ scale: 0.88 }}
                          onClick={() => setShowInput(false)}
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                          style={{ color: "hsla(0,0%,100%,0.6)" }}
                          aria-label="Ocultar entrada"
                        >
                          <X className="w-3.5 h-3.5" />
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.88 }}
                          onClick={handleSend}
                          disabled={!inputValue.trim()}
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-opacity"
                          style={{
                            background:
                              "linear-gradient(135deg, hsl(43,80%,60%), hsl(43,90%,50%))",
                            opacity: inputValue.trim() ? 1 : 0.4,
                            boxShadow: "0 0 10px hsla(43,80%,60%,0.5)",
                          }}
                          aria-label="Enviar"
                        >
                          <Send className="w-3.5 h-3.5" style={{ color: "hsl(216,40%,8%)" }} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
