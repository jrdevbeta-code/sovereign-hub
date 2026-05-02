import { motion } from "framer-motion";
import { Satellite, TrendingUp } from "lucide-react";

const strips = [
  {
    value: "321.524,89",
    label: "Bs",
    bg: "linear-gradient(135deg, hsl(0,0%,96%), hsl(0,0%,100%))",
    textColor: "hsl(0,0%,10%)",
    labelColor: "hsl(0,0%,30%)",
    weight: 1.7,
  },
  {
    value: "662,93",
    label: "BCV",
    bg: "linear-gradient(135deg, hsl(216,80%,45%), hsl(216,90%,55%))",
    textColor: "hsl(0,0%,100%)",
    labelColor: "hsla(0,0%,100%,0.7)",
    weight: 1,
  },
  {
    value: "502,45",
    label: "BP",
    bg: "linear-gradient(135deg, hsl(145,60%,38%), hsl(145,70%,45%))",
    textColor: "hsl(0,0%,100%)",
    labelColor: "hsla(0,0%,100%,0.7)",
    weight: 1,
  },
];

const TernaPiano = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-card-deep p-4 pb-0 flex flex-col"
    >
      <div className="flex items-center gap-2 mb-2">
        <Satellite className="w-4 h-4 text-cyan" />
        <p className="text-[10px] font-orbitron tracking-widest text-cyan uppercase">
          Radar de Precios
        </p>
      </div>

      {/* Product info + trend */}
      <div className="mb-2">
        <p className="text-sm font-semibold text-foreground">
          Queso · El Marqués
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5 font-exo">
          Último reporte: Hace 2h
        </p>

        {/* Mini trend chart */}
        <div className="flex items-end gap-[3px] mt-2 h-8">
          {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
              className="flex-1 rounded-sm origin-bottom"
              style={{
                height: `${h}%`,
                background:
                  i >= 7
                    ? "hsl(var(--cyan))"
                    : "hsla(185,100%,50%,0.42)",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="w-3 h-3 text-cyan" />
          <span className="text-[9px] text-cyan font-orbitron font-bold">+12% esta semana</span>
        </div>
      </div>

      {/* Piano strips flush to bottom */}
      <div className="flex gap-0 -mx-4 mt-auto">
        {strips.map((strip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            className="py-2.5 px-1.5 flex flex-col items-center justify-center origin-bottom min-w-0"
            style={{
              background: strip.bg,
              borderRadius: i === 0 ? "0 0 0 1rem" : i === 2 ? "0 0 1rem 0" : "0",
              flexGrow: strip.weight,
              flexBasis: 0,
            }}
          >
            <span
              className="text-[13px] font-orbitron font-bold leading-tight whitespace-nowrap"
              style={{ color: strip.textColor }}
            >
              {strip.value}
            </span>
            <span
              className="text-[8px] font-orbitron font-bold mt-0.5"
              style={{ color: strip.labelColor }}
            >
              {strip.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TernaPiano;
