import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.15, duration: 0.5 },
  }),
};

const DashboardCards = () => {
  return (
    <div className="px-5 pb-4 space-y-3">
      {/* Radar Card */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="glass-card-deep p-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[10px] font-orbitron tracking-widest text-cyan uppercase mb-1">
              📡 Radar
            </p>
            <p className="text-sm font-semibold text-foreground">
              Precio del Queso en El Marqués
            </p>
            <p className="text-2xl font-orbitron font-bold text-gold gold-glow mt-1">
              240 <span className="text-xs text-muted-foreground font-exo font-normal">Bs</span>
            </p>
          </div>
          {/* Mini trend chart */}
          <div className="flex items-end gap-[3px] h-10 mt-1">
            {[40, 55, 45, 65, 50, 70, 80].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                className="w-[5px] rounded-full bg-gradient-to-t from-cyan/40 to-cyan"
              />
            ))}
            <TrendingUp className="w-4 h-4 text-cyan ml-1" />
          </div>
        </div>
      </motion.div>

      {/* Vaca Card */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="glass-card-deep p-4"
      >
        <p className="text-[10px] font-orbitron tracking-widest text-gold uppercase mb-1">
          🐄 Vaca
        </p>
        <p className="text-sm font-semibold text-foreground">
          Reunión pendiente
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Juan y 2 más faltan por pagar
        </p>
        <div className="flex items-center mt-3 gap-[-6px]">
          {["J", "M", "C"].map((letter, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border border-background -ml-1 first:ml-0"
              style={{
                background: i === 0
                  ? "linear-gradient(135deg, hsl(43,56%,52%), hsl(43,80%,60%))"
                  : i === 1
                  ? "linear-gradient(135deg, hsl(185,100%,40%), hsl(185,100%,50%))"
                  : "linear-gradient(135deg, hsl(216,30%,25%), hsl(216,30%,35%))",
                color: "hsl(210,20%,92%)",
              }}
            >
              {letter}
            </div>
          ))}
          <Users className="w-4 h-4 text-muted-foreground ml-2" />
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardCards;
