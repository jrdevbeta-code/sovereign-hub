import { motion } from "framer-motion";
import { Radio, Users, TrendingUp } from "lucide-react";

const feedItems = [
  {
    icon: Users,
    accent: "cyan",
    title: "Nuevo miembro en tu círculo",
    description: "Ana se unió a 'Vecinos del Marqués'",
    time: "Hace 5 min",
  },
  {
    icon: TrendingUp,
    accent: "gold",
    title: "Alerta de precio",
    description: "El arroz subió 12% en tu zona",
    time: "Hace 20 min",
  },
  {
    icon: Radio,
    accent: "cyan",
    title: "Radar comunitario",
    description: "3 reportes nuevos cerca de ti",
    time: "Hace 1h",
  },
];

const NationFeed = () => {
  return (
    <div className="px-5 pb-4">
      <p className="text-[10px] font-orbitron tracking-widest text-muted-foreground uppercase mb-3">
        📡 Feed de la Nación
      </p>
      <div className="space-y-2">
        {feedItems.map((item, i) => {
          const Icon = item.icon;
          const isCyan = item.accent === "cyan";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
              className="glass-card p-3 flex items-start gap-3"
            >
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
              <span className="text-[9px] text-muted-foreground font-exo shrink-0 mt-0.5">
                {item.time}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NationFeed;
