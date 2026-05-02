import { motion, AnimatePresence } from "framer-motion";
import { Radio, Users, TrendingUp, ChevronDown, Satellite } from "lucide-react";
import { useState } from "react";

interface FeedItem {
  icon: typeof Users;
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
    icon: Users,
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
    icon: TrendingUp,
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
    icon: Radio,
    accent: "cyan",
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
      <p className="text-[10px] font-orbitron tracking-widest text-muted-foreground uppercase mb-3">
        <Satellite className="w-3.5 h-3.5 text-cyan inline mr-1.5" />
        Eco-Esfera
        <span className="text-cyan ml-1.5">∞</span>
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
                        fontSize: '9px',
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
