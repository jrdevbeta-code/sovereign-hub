import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between px-5 pt-12 pb-4"
    >
      <div>
        <p className="text-xs font-orbitron tracking-[0.3em] text-muted-foreground uppercase">
          Soberanía Digital
        </p>
        <h1 className="text-2xl font-orbitron font-bold text-foreground mt-1">
          Brinpal
        </h1>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative flex items-center gap-3"
      >
        <div className="text-right">
          <p className="text-[10px] font-orbitron tracking-wider text-muted-foreground">
            TRUST SCORE
          </p>
          <p className="text-xl font-orbitron font-bold text-gold gold-glow">
            92
            <span className="text-sm text-muted-foreground font-normal"> / 100</span>
          </p>
        </div>
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-gold-bright flex items-center justify-center neon-border-gold">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
