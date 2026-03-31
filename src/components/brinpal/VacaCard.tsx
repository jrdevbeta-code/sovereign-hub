import { motion } from "framer-motion";
import { Users } from "lucide-react";

const members = [
  { name: "Juan", letter: "J", amount: "80", paid: false },
  { name: "María", letter: "M", amount: "80", paid: true },
  { name: "Carlos", letter: "C", amount: "80", paid: false },
];

const avatarGradients = [
  "linear-gradient(135deg, hsl(43,56%,52%), hsl(43,80%,60%))",
  "linear-gradient(135deg, hsl(185,100%,40%), hsl(185,100%,50%))",
  "linear-gradient(135deg, hsl(216,30%,25%), hsl(216,30%,35%))",
];

const VacaCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card-deep p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">🐄</span>
        <p className="text-[10px] font-orbitron tracking-widest text-gold uppercase">
          Vaca Activa
        </p>
      </div>
      <p className="text-sm font-semibold text-foreground">Reunión pendiente</p>
      <p className="text-xs text-muted-foreground mt-1">
        Juan y Carlos faltan por pagar
      </p>

      {/* Members with mini piano amounts */}
      <div className="flex items-center gap-3 mt-3">
        {members.map((m, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
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
            {/* Mini piano strip */}
            <div
              className="px-1.5 py-0.5 rounded text-[8px] font-orbitron font-bold"
              style={{
                background: m.paid
                  ? "linear-gradient(135deg, hsl(145,60%,38%), hsl(145,70%,45%))"
                  : "linear-gradient(135deg, hsl(0,0%,96%), hsl(0,0%,100%))",
                color: m.paid ? "hsl(0,0%,100%)" : "hsl(0,0%,15%)",
              }}
            >
              {m.amount} Bs
            </div>
          </div>
        ))}
        <Users className="w-4 h-4 text-muted-foreground ml-auto" />
      </div>
    </motion.div>
  );
};

export default VacaCard;
