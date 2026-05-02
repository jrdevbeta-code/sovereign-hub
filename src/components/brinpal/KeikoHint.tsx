import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import mentorImg from "@/assets/mentor-avatar.png";

type State = "hidden" | "peeking" | "visible";

const INACTIVITY_MS = 8000;
const PEEK_TIMEOUT_MS = 5000;

const KeikoHint = () => {
  const [state, setState] = useState<State>("hidden");
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const peekTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPeekTimer = () => {
    if (peekTimer.current) {
      clearTimeout(peekTimer.current);
      peekTimer.current = null;
    }
  };

  const armInactivity = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setState((prev) => (prev === "hidden" ? "peeking" : prev));
    }, INACTIVITY_MS);
  };

  // Track user activity on the Home
  useEffect(() => {
    const handleActivity = () => {
      // Any activity while peeking → retreat (unless user tapped Keiko, handled separately)
      setState((prev) => {
        if (prev === "peeking") {
          clearPeekTimer();
          return "hidden";
        }
        return prev;
      });
      armInactivity();
    };

    armInactivity();
    const events = ["pointerdown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      clearPeekTimer();
    };
  }, []);

  // When peeking begins, set 5s retreat fallback
  useEffect(() => {
    if (state === "peeking") {
      clearPeekTimer();
      peekTimer.current = setTimeout(() => {
        setState("hidden");
      }, PEEK_TIMEOUT_MS);
    } else {
      clearPeekTimer();
    }
  }, [state]);

  const handleTap = (e: React.PointerEvent) => {
    e.stopPropagation();
    clearPeekTimer();
    setState("visible");
  };

  const handleDismiss = (e: React.PointerEvent) => {
    e.stopPropagation();
    setState("hidden");
    armInactivity();
  };

  // Translation: hidden=-70, peeking=-15, visible=0
  const targetX = state === "hidden" ? -70 : state === "peeking" ? -15 : 0;

  return (
    <div
      className="fixed left-0 z-40 pointer-events-none"
      style={{ bottom: 120 }}
    >
      <motion.div
        className="relative pointer-events-auto"
        initial={{ x: -70 }}
        animate={{ x: targetX }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative" onPointerDown={state === "visible" ? undefined : handleTap}>
          {/* Wave hand overlay only while peeking */}
          {state === "peeking" && (
            <motion.div
              className="absolute"
              style={{
                width: 18,
                height: 18,
                right: 6,
                top: 30,
                transformOrigin: "50% 90%",
                pointerEvents: "none",
              }}
              animate={{ rotate: [0, -15, 0, -15, 0] }}
              transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            >
              <span className="block w-full h-full rounded-full bg-cyan/70 blur-[2px]" />
            </motion.div>
          )}

          <img
            src={mentorImg}
            alt="Keiko - Pista"
            width={80}
            height={80}
            className="mentor-glow select-none"
            draggable={false}
          />
        </div>

        {/* Speech bubble when visible */}
        <AnimatePresence>
          {state === "visible" && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-[78px] top-2 w-52 pointer-events-auto"
            >
              <div className="glass-card p-3 relative">
                <div
                  className="absolute -left-1.5 top-3 w-3 h-3 rotate-45"
                  style={{
                    background: "hsla(0,0%,12%,0.7)",
                    borderLeft: "1px solid hsla(185,100%,50%,0.2)",
                    borderBottom: "1px solid hsla(185,100%,50%,0.2)",
                  }}
                />
                <p className="text-[11px] font-exo text-foreground leading-snug">
                  ¿Necesitas ayuda? Toca el <span className="text-cyan font-semibold">micrófono</span> y pregúntame lo que sea.
                </p>
                <button
                  onPointerDown={handleDismiss}
                  className="mt-2 text-[9px] font-orbitron tracking-widest uppercase text-muted-foreground hover:text-cyan transition"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default KeikoHint;
