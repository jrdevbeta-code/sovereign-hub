import { motion, AnimatePresence } from "framer-motion";
import { Radio, Users, TrendingUp, ChevronDown } from "lucide-react";
import { useState } from "react";

const feedItems = [
  {
    icon: Users,
    accent: "cyan",
    title: "Nuevo miembro en tu círculo",
    description: "Ana se unió a 'Vecinos del Marqués'",
    time: "Hace 5 min",
    details: "Ana fue referida por Carlos. Ahora tu círculo tiene 12 miembros activos. Puedes enviarle un saludo desde Nexus.",
  },
  {
    icon: TrendingUp,
    accent: "gold",
    title: "Alerta de precio",
    description: "El arroz subió 12% en tu zona",
    time: "Hace 20 min",
    details: "Precio actual: 3.20 USD/kg en El Marqués. Hace 7 días: 2.85 USD/kg. Tendencia alcista en toda Caracas.",
  },
  {
    icon: Radio,
    accent: "cyan",
    title: "Radar comunitario",
    description: "3 reportes nuevos cerca de ti",
    time: "Hace 1h",
    details: "Dos reportes de precios actualizados en bodegones y un reporte de disponibilidad de gas doméstico.",
  },
];

const NationFeed = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="px-5 pb-4">
      <p className="text-[10px] font-orbitron tracking-widest text-muted-foreground uppercase mb-3">
        📡 Feed de la Nación
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
                    style={{
                      color: isCyan ? "hsl(185,100%,50%)" : "hsl(43,80%,60%)",
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {item.description}
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className="text-[9px] text-muted-foreground font-exo">
                    {item.time}
                  </span>
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
                      className="px-3 pb-3 pt-0 text-[11px] text-muted-foreground font-exo leading-relaxed"
                      style={{
                        borderTop: `1px solid ${isCyan ? "hsla(185,100%,50%,0.1)" : "hsla(43,80%,60%,0.1)"}`,
                        paddingTop: "8px",
                      }}
                    >
                      {item.details}
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
