import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const members = [
  { name: "Juan", letter: "J", bs: "107.174,96", bcv: "220,98", bp: "167,48", paid: false },
  { name: "María", letter: "M", bs: "107.174,96", bcv: "220,98", bp: "167,48", paid: true },
  { name: "Carlos", letter: "C", bs: "107.174,96", bcv: "220,98", bp: "167,48", paid: false },
];

const totalBs = 321524.89;
const paidBs = 107174.96;
const progressPercent = Math.round((paidBs / totalBs) * 100);

const avatarGradients = [
  "linear-gradient(135deg, hsl(43,56%,52%), hsl(43,80%,60%))",
  "linear-gradient(135deg, hsl(185,100%,40%), hsl(185,100%,50%))",
  "linear-gradient(135deg, hsl(216,30%,25%), hsl(216,30%,35%))",
];

const MicroPiano = ({ bs, bcv, bp, activeCurrency = "bp" }: { bs: string; bcv: string; bp: string; activeCurrency?: string }) => {
  const segments = [
    { label: "Bs", value: bs, bg: "hsl(0,0%,96%)", color: "hsl(0,0%,10%)", key: "bs" },
    { label: "BCV", value: bcv, bg: "hsl(216,80%,50%)", color: "hsl(0,0%,100%)", key: "bcv" },
    { label: "BP", value: bp, bg: "hsl(145,60%,40%)", color: "hsl(0,0%,100%)", key: "bp" },
  ];

  return (
    <div className="flex flex-col gap-[1px] rounded-md overflow-visible min-w-0">
      {segments.map((seg) => {
        const isActive = seg.key === activeCurrency;
        return (
          <div
            key={seg.key}
            className="flex items-center justify-between gap-1.5 px-1.5 py-[2px]"
            style={{
              background: seg.bg,
              color: seg.color,
              transform: isActive ? "scale(1.10) translateX(2px)" : "scale(1)",
              boxShadow: isActive
                ? "0 3px 12px hsla(145,60%,40%,0.6), 0 0 0 1.5px hsla(145,60%,40%,0.4)"
                : "none",
              zIndex: isActive ? 10 : 1,
              position: "relative",
              borderRadius: isActive ? "4px" : "0",
              transition: "all 0.25s ease",
            }}
          >
            <span className="text-[8px] font-orbitron" style={{ fontWeight: 900 }}>{seg.label}</span>
            <span
              className="text-[10px] font-orbitron ml-auto whitespace-nowrap"
              style={{ fontWeight: 900 }}
            >
              {seg.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const VacaCard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card-deep p-4 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🐄</span>
          <p className="text-[10px] font-orbitron tracking-widest text-gold uppercase">
            Vaca Activa
          </p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </div>

      {/* Total amount */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-foreground">Reunión pendiente</p>
        <p className="text-base font-orbitron font-bold text-gold gold-glow whitespace-nowrap">
          321.524,89 <span className="text-[10px] font-bold">Bs</span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 rounded-full overflow-hidden mb-1"
        style={{ background: "hsla(216,20%,18%,1)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(var(--cyan)), hsl(var(--gold)))",
          }}
        />
      </div>
      <p className="text-[9px] text-muted-foreground font-exo mb-3">
        {progressPercent}% completado · Juan y Carlos faltan por pagar
      </p>

      {/* Members with micro-piano (mostrar máx 2; el resto en detalle) */}
      <div className="flex flex-col gap-2">
        {members.slice(0, 2).map((m, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{
                background: avatarGradients[i],
                color: "hsl(210,20%,92%)",
                border: m.paid
                  ? "2px solid hsl(145,60%,45%)"
                  : "2px solid hsla(0,84%,60%,0.5)",
              }}
            >
              {m.letter}
            </div>
            <span className="text-[11px] text-foreground font-exo shrink-0">{m.name}</span>
            <div className="ml-auto w-[125px] shrink-0 mr-3">
              <MicroPiano bs={m.bs} bcv={m.bcv} bp={m.bp} activeCurrency="bp" />
            </div>
          </div>
        ))}
        {members.length > 2 && (
          <button
            className="text-[10px] font-orbitron text-cyan/80 hover:text-cyan self-start mt-0.5"
            onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
          >
            +{members.length - 2} más · ver detalle →
          </button>
        )}
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="mt-3 pt-3 space-y-2"
              style={{ borderTop: "1px solid hsla(43,56%,52%,0.1)" }}
            >
              {members.map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                      style={{ background: avatarGradients[i], color: "hsl(210,20%,92%)" }}
                    >
                      {m.letter}
                    </div>
                    <span className="text-[11px] text-foreground font-exo">{m.name}</span>
                  </div>
                  <span className={`text-[10px] font-orbitron font-bold ${m.paid ? "text-cyan" : "text-destructive"}`}>
                    {m.paid ? "✓ Pagado" : "Pendiente"}
                  </span>
                </div>
              ))}
              <button className="w-full text-[10px] font-orbitron text-cyan mt-2 py-1.5 rounded-lg"
                style={{ border: "1px solid hsla(185,100%,50%,0.2)" }}
                onClick={(e) => e.stopPropagation()}
              >
                Ver más en Flow →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VacaCard;
