import { motion } from "framer-motion";

const NeonBorder = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 rounded-2xl overflow-hidden">
      {/* Animated neon light train */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="hsl(185,100%,50%)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(43,80%,60%)" stopOpacity="1" />
            <stop offset="60%" stopColor="hsl(185,100%,50%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="16"
          ry="16"
          fill="none"
          stroke="url(#neon-grad)"
          strokeWidth="2"
          strokeDasharray="80 400"
          className="animate-[neon-race_4s_linear_infinite]"
        />
      </svg>
      {/* Static subtle border */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          border: "1px solid hsla(185,100%,50%,0.08)",
        }}
      />
    </div>
  );
};

export default NeonBorder;
