import { motion } from "framer-motion";
import { Shield, Users, ArrowRightLeft, Lock } from "lucide-react";
import RadarIcon from "./RadarIcon";
import { useState } from "react";

const navItems = [
  { id: "inicio", label: "Inicio", sub: "Home", icon: Shield, badge: 0 },
  { id: "nexus", label: "Nexus", sub: "Círculos", icon: Users, badge: 3 },
  { id: "flow", label: "Flow", sub: "Gastos", icon: ArrowRightLeft, badge: 0 },
  { id: "radar", label: "Radar", sub: "Búsquedas", icon: Radar, badge: 12 },
  { id: "boveda", label: "Bóveda", sub: "Tesoros", icon: Lock, badge: 0 },
];

const BottomNav = () => {
  const [active, setActive] = useState("inicio");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div
        className="mx-auto max-w-md"
        style={{
          background: "linear-gradient(180deg, hsla(216,30%,8%,0.9), hsla(216,40%,5%,0.98))",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid hsla(43,56%,52%,0.1)",
        }}
      >
        <div className="flex items-center justify-around py-1.5 pb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActive(item.id)}
                className={`relative flex flex-col items-center gap-0.5 px-2 py-1 transition-all duration-300 ${
                  isActive ? "nav-active" : "text-muted-foreground"
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] px-1 flex items-center justify-center rounded-full text-[7px] font-orbitron font-bold neon-border-cyan"
                      style={{
                        background: "hsl(var(--cyan))",
                        color: "hsl(var(--midnight))",
                        boxShadow: "0 0 8px hsla(185,100%,50%,0.6)",
                      }}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </div>
                <span className="text-[9px] font-orbitron tracking-wider leading-tight">
                  {item.label}
                </span>
                <span className="text-[7px] font-exo opacity-60 leading-tight">
                  {item.sub}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="w-1 h-1 rounded-full bg-cyan mt-0.5"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
