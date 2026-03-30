import { motion } from "framer-motion";
import { Shield, Users, ArrowRightLeft, Lock } from "lucide-react";
import { useState } from "react";

const navItems = [
  { id: "inicio", label: "Inicio", icon: Shield },
  { id: "nexus", label: "Nexus", icon: Users },
  { id: "flow", label: "Flow", icon: ArrowRightLeft },
  { id: "boveda", label: "Bóveda", icon: Lock },
];

const BottomNav = () => {
  const [active, setActive] = useState("inicio");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div
        className="mx-auto max-w-md border-t border-white/5"
        style={{
          background: "linear-gradient(180deg, hsla(216,30%,8%,0.85), hsla(216,40%,5%,0.98))",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div className="flex items-center justify-around py-2 pb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActive(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-1 transition-all duration-300 ${
                  isActive ? "nav-active" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-orbitron tracking-wider">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="w-1 h-1 rounded-full bg-cyan"
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
