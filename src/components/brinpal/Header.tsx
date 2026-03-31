import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Sparkles, Wallet } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-start justify-between px-5 pt-6 pb-2"
    >
      {/* Left: Logo + Academy */}
      <div className="flex flex-col gap-1.5">
        <p className="text-lg font-orbitron font-bold text-gold gold-glow tracking-wider">
          Brinpal
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
          style={{
            background: "linear-gradient(135deg, hsla(216,30%,14%,0.8), hsla(216,30%,8%,0.6))",
            border: "1px solid hsla(185,100%,50%,0.15)",
          }}
        >
          <div className="relative w-4 h-4">
            <BookOpen className="w-4 h-4 text-cyan absolute" />
            <Sparkles className="w-2 h-2 text-gold absolute -top-0.5 -right-1" />
          </div>
          <TrendingUp className="w-3 h-3 text-cyan" />
          <span className="text-[8px] font-orbitron tracking-widest text-cyan uppercase">
            Academy
          </span>
        </motion.button>
      </div>

      {/* Right: Trust Score + Virtual ID */}
      <div className="flex flex-col items-end gap-1.5">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[7px] font-orbitron tracking-[0.2em] text-muted-foreground uppercase">
              Trust Score
            </p>
            <p className="text-xs font-orbitron font-bold text-gold gold-glow">
              92
              <span className="text-[9px] text-muted-foreground font-normal"> / 100</span>
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsla(216,30%,14%,1), hsla(216,30%,10%,1))",
              border: "1px solid hsla(43,56%,52%,0.2)",
            }}
          >
            <Wallet className="w-4 h-4 text-gold" />
          </motion.button>
        </div>

        {/* Virtual ID */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
          style={{
            background: "linear-gradient(135deg, hsla(216,30%,14%,0.8), hsla(216,30%,8%,0.6))",
            border: "1px solid hsla(43,56%,52%,0.12)",
          }}
        >
          <div className="flex -space-x-1">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold"
              style={{
                background: "linear-gradient(135deg, hsla(185,100%,50%,0.3), hsla(185,100%,50%,0.1))",
                border: "1px solid hsla(185,100%,50%,0.4)",
                color: "hsl(185,100%,50%)",
              }}
            >
              ⬡
            </div>
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold"
              style={{
                background: "linear-gradient(135deg, hsla(43,80%,60%,0.3), hsla(43,80%,60%,0.1))",
                border: "1px solid hsla(43,80%,60%,0.4)",
                color: "hsl(43,80%,60%)",
              }}
            >
              ⬡
            </div>
          </div>
          <span className="text-[8px] font-orbitron tracking-widest text-muted-foreground uppercase">
            Virtual ID
          </span>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
