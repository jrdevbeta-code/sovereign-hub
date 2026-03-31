import { motion } from "framer-motion";
import { Satellite } from "lucide-react";

const strips = [
  {
    label: "Bolívares / Calle",
    value: "240",
    unit: "Bs",
    bg: "linear-gradient(135deg, hsl(0,0%,96%), hsl(0,0%,100%))",
    textColor: "hsl(0,0%,10%)",
    unitColor: "hsl(0,0%,40%)",
  },
  {
    label: "Tasa Oficial / BCV",
    value: "36.50",
    unit: "Bs/$",
    bg: "linear-gradient(135deg, hsl(216,80%,45%), hsl(216,90%,55%))",
    textColor: "hsl(0,0%,100%)",
    unitColor: "hsla(0,0%,100%,0.7)",
  },
  {
    label: "Dólar / BP",
    value: "6.58",
    unit: "USD",
    bg: "linear-gradient(135deg, hsl(145,60%,38%), hsl(145,70%,45%))",
    textColor: "hsl(0,0%,100%)",
    unitColor: "hsla(0,0%,100%,0.7)",
  },
];

const TernaPiano = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-card-deep p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Satellite className="w-4 h-4 text-cyan" />
        <p className="text-[10px] font-orbitron tracking-widest text-cyan uppercase">
          Radar de Precios
        </p>
      </div>
      <p className="text-sm font-semibold text-foreground mb-3">
        Precio del Queso · El Marqués
      </p>

      {/* Piano Strips */}
      <div className="flex gap-2">
        {strips.map((strip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            className="flex-1 rounded-xl p-3 flex flex-col items-center justify-center text-center"
            style={{ background: strip.bg }}
          >
            <span
              className="text-lg font-orbitron font-bold leading-tight"
              style={{ color: strip.textColor }}
            >
              {strip.value}
            </span>
            <span
              className="text-[9px] font-orbitron font-medium mt-0.5"
              style={{ color: strip.unitColor }}
            >
              {strip.unit}
            </span>
            <span
              className="text-[7px] font-exo mt-1 opacity-70 leading-tight"
              style={{ color: strip.textColor }}
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
