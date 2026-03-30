import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const MicButton = () => {
  return (
    <div className="flex justify-center py-4">
      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.08 }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan to-gold flex items-center justify-center mic-pulse"
        aria-label="Activar micrófono"
      >
        {/* Outer ring */}
        <span className="absolute inset-0 rounded-full border border-cyan/40 animate-ping opacity-30" />
        <Mic className="w-7 h-7 text-primary-foreground relative z-10" />
      </motion.button>
    </div>
  );
};

export default MicButton;
