import { motion, AnimatePresence } from "framer-motion";
import { Mic, Keyboard, Send, Zap } from "lucide-react";
import { useState } from "react";

const MicButton = () => {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="flex justify-center items-center gap-3 pb-1 pt-0 px-5">
      <AnimatePresence mode="wait">
        {showInput ? (
          <motion.div
            key="input-mode"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex items-center gap-2 w-full"
          >
            {/* Mic reduced to left */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowInput(false)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-gold flex items-center justify-center shrink-0"
              aria-label="Volver a micrófono"
            >
              <Mic className="w-4 h-4 text-primary-foreground" />
            </motion.button>

            {/* Glassmorphism input */}
            <div
              className="flex-1 flex items-center rounded-full px-4 py-2.5"
              style={{
                background: "linear-gradient(135deg, hsla(216,30%,14%,0.6), hsla(216,30%,8%,0.4))",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid hsla(43,56%,52%,0.2)",
              }}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground font-exo outline-none"
                autoFocus
              />
              <motion.button
                whileTap={{ scale: 0.85 }}
                className="ml-2 w-7 h-7 rounded-full bg-cyan/20 flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5 text-cyan" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="mic-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.08 }}
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan to-gold flex items-center justify-center mic-pulse"
              aria-label="Activar micrófono"
            >
              <span className="absolute inset-0 rounded-full border border-cyan/40 animate-ping opacity-30" />
              <Mic className="w-6 h-6 text-primary-foreground relative z-10" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowInput(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsla(216,30%,14%,0.8), hsla(216,30%,8%,0.6))",
                border: "1px solid hsla(185,100%,50%,0.2)",
              }}
              aria-label="Abrir teclado"
            >
              <Keyboard className="w-4 h-4 text-cyan" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.dispatchEvent(new CustomEvent("brinpal:procesar"))}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsla(216,30%,14%,0.8), hsla(216,30%,8%,0.6))",
                border: "1px solid hsla(185,100%,50%,0.25)",
              }}
              aria-label="Procesar"
            >
              <Zap className="w-4 h-4 text-cyan" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MicButton;
