import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ChevronDown, Satellite } from "lucide-react";
import RadarIcon from "./RadarIcon";
import NexusIcon from "./NexusIcon";
import React, { useState } from "react";

interface FeedItem {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  title: string;
  description: string;
  time: string;
  details: string;
  priceData: { bs: string; bcv: string; bp: string } | null;
  badge: {
    module: string;
    moduleColor: string;
    moduleBorder: string;
    sub: string;
  };
}

const feedItems: FeedItem[] = [
  {
    icon: NexusIcon,
    accent: "cyan",
    title: "Nuevo miembro en tu círculo",
    description: "Ana se unió a 'Vecinos del Marqués'",
    time: "Hace 5 min",
    details: "Ana fue referida por Carlos. Ahora tu círculo tiene 12 miembros activos.",
    priceData: null,
    badge: {
      module: "Nexus",
      moduleColor: "hsl(185,100%,52%)",
      moduleBorder: "hsla(185,100%,52%,0.38)",
      sub: "Nuevo miembro",
    },
  },
  {
    icon: RadarIcon,
    accent: "gold",
    title: "Alerta de precio",
    description: "El arroz subió 12% en tu zona",
    time: "Hace 20 min",
    details: "Tendencia alcista en toda Caracas.",
    priceData: { bs: "321.524,89", bcv: "662,93", bp: "502,45" },
    badge: {
      module: "Radar",
      moduleColor: "hsl(43,80%,62%)",
      moduleBorder: "hsla(43,80%,62%,0.38)",
      sub: "Alerta de precio",
    },
  },
  {
    icon: RadarIcon,
    accent: "gold",
    title: "Radar comunitario",
    description: "3 reportes nuevos cerca de ti",
    time: "Hace 1h",
    details: "Dos reportes de precios actualizados en bodegones y un reporte de gas.",
    priceData: { bs: "321.524,89", bcv: "662,93", bp: "502,45" },
    badge: {
      module: "Radar",
      moduleColor: "hsl(43,80%,62%)",
      moduleBorder: "hsla(43,80%,62%,0.38)",
      sub: "Comunitario",
    },
  },
];

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

const NationFeed = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="px-5 pb-4">
      <p className="text-[10px] font-orbitron tracking-widest text-muted-foreground uppercase mb-3 inline-flex items-center gap-1.5">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 22, height: 22, flexShrink: 0 }}
        >
          <defs>
            <style>{`
              .o1n{ transform-origin:20px 20px; animation: orbit1n 7s linear infinite; }
              .o3n{ transform-origin:20px 20px; animation: orbit3n 3s linear infinite; }
              .prn{ animation: pulse-ringn 2.2s ease-in-out infinite; }
              .pgn{ animation: ping-goldn 1.8s ease-out infinite; }
              .bgn{ animation: blink-goldn 1.8s ease-in-out infinite; }
              .trvn{ transform-origin:20px 20px; animation: travel-vn 3s linear infinite; }
              @keyframes orbit1n { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
              @keyframes orbit3n { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
              @keyframes pulse-ringn { 0%,100%{ opacity:0.55;} 50%{ opacity:0.12;} }
              @keyframes ping-goldn { 0%{ r:3; opacity:0.8;} 100%{ r:9; opacity:0;} }
              @keyframes blink-goldn { 0%,100%{ opacity:1;} 50%{ opacity:0.2;} }
              @keyframes travel-vn {
                from{ transform:rotate(0deg) translateY(-17px) rotate(0deg); }
                to  { transform:rotate(360deg) translateY(-17px) rotate(-360deg); }
              }
            `}</style>
          </defs>
          <ellipse cx="20" cy="20" rx="4" ry="17" stroke="hsl(43,80%,62%)" strokeWidth="1.0" fill="none" opacity="0.6" className="o3n prn"/>
          <ellipse cx="20" cy="20" rx="16" ry="5" stroke="hsl(185,100%,52%)" strokeWidth="1.2" fill="none" className="o1n prn"/>
          <ellipse cx="20" cy="20" rx="16" ry="5" stroke="hsl(43,80%,62%)" strokeWidth="0.9" fill="none" transform="rotate(60 20 20)" className="prn"/>
          <path d="M11 12 Q20 6 29 12" stroke="hsl(185,100%,52%)" strokeWidth="1.4" fill="none"/>
          <path d="M11 28 Q20 34 29 28" stroke="hsl(185,100%,52%)" strokeWidth="1.4" fill="none"/>
          <circle cx="20" cy="20" r="1.8" fill="hsl(185,100%,52%)" stroke="none" className="trvn"/>
          <circle cx="20" cy="20" r="3" fill="hsl(43,80%,62%)" opacity="0.25" stroke="none" className="pgn"/>
          <circle cx="20" cy="20" r="3" fill="hsl(43,80%,62%)" stroke="none" className="bgn"/>
        </svg>
        Eco-Esfera
        <span className="text-cyan" style={{ fontSize: '2.5em', verticalAlign: 'middle', lineHeight: 0, position: 'relative', top: '-2px', marginLeft: '-1px' }}>∞</span>
      </p>
      <div className="space-y-2">
        {feedItems.map((item, i) => {
          const Icon = item.icon;
          const isCyan = item.accent === "cyan";
          const isOpen = expanded === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
              className="glass-card overflow-hidden cursor-pointer"
              onClick={() => setExpanded(isOpen ? null : i)}
            >
              <div className="p-3 flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: isCyan
                      ? "linear-gradient(135deg, hsla(185,100%,50%,0.15), hsla(185,100%,50%,0.05))"
                      : "linear-gradient(135deg, hsla(43,80%,60%,0.15), hsla(43,80%,60%,0.05))",
                    border: `1px solid ${isCyan ? "hsla(185,100%,50%,0.2)" : "hsla(43,80%,60%,0.2)"}`,
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: isCyan ? "hsl(185,100%,50%)" : "hsl(43,80%,60%)" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '100px',
                        letterSpacing: '0.05em',
                        background: 'rgba(255,255,255,0.06)',
                        color: item.badge.moduleColor,
                        border: `1px solid ${item.badge.moduleBorder}`,
                      }}
                    >
                      {item.badge.module}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '100px',
                        letterSpacing: '0.19em',
                        background: 'rgba(255,255,255,0.06)',
                        color: 'rgba(255,255,255,1)',
                        border: '1px solid rgba(255,255,255,0.18)',
                      }}
                    >
                      {item.badge.sub}
                    </span>
                  </div>
                  <p className="text-[11px] mt-0.5 truncate font-bold" style={{ color: "hsla(0,0%,100%,0.8)" }}>
                    {item.description}
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className="text-[9px] text-white font-exo font-bold">{item.time}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-3 pb-3 pt-2 text-[11px] font-exo leading-relaxed"
                      style={{
                        color: "hsla(0,0%,100%,0.8)",
                        borderTop: `1px solid ${isCyan ? "hsla(185,100%,50%,0.1)" : "hsla(43,80%,60%,0.1)"}`,
                      }}
                    >
                      {item.details}
                      {item.priceData && (
                        <InlineTerna bs={item.priceData.bs} bcv={item.priceData.bcv} bp={item.priceData.bp} />
                      )}
                      <button
                        className="w-full text-[10px] font-orbitron text-cyan mt-2 py-1.5 rounded-lg"
                        style={{ border: "1px solid hsla(185,100%,50%,0.2)" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Ver más →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NationFeed;
