import { motion } from "framer-motion";
import { Shield, Wallet } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between px-5 pt-12 pb-4"
    >
      {/* Left: Sovereign Shield */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-11 h-11 rounded-full flex items-center justify-center neon-border-gold"
        style={{
          background: "linear-gradient(135deg, hsl(216,30%,14%), hsl(216,30%,10%))",
          border: "1px solid hsla(43,56%,52%,0.3)",
        }}
      >
        <Shield className="w-5 h-5 text-gold" />
      </motion.button>

      {/* Right: Trust Score + Wallet */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-[8px] font-orbitron tracking-[0.2em] text-muted-foreground uppercase">
            Trust Score
          </p>
          <p className="text-sm font-orbitron font-bold text-gold gold-glow">
            92
            <span className="text-[10px] text-muted-foreground font-normal"> / 100</span>
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(216,30%,14%), hsl(216,30%,10%))",
            border: "1px solid hsla(43,56%,52%,0.2)",
          }}
        >
          <Wallet className="w-5 h-5 text-gold" />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
