const NeonBorder = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 rounded-2xl overflow-hidden">
      {/* Animated neon light train — thick & aggressive */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="hsl(185,100%,50%)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(43,80%,60%)" stopOpacity="1" />
            <stop offset="70%" stopColor="hsl(185,100%,50%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="neon-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="hsl(43,80%,60%)" stopOpacity="0.7" />
            <stop offset="60%" stopColor="hsl(185,100%,60%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* Primary light train */}
        <rect
          x="1" y="1"
          width="calc(100% - 2px)" height="calc(100% - 2px)"
          rx="16" ry="16"
          fill="none"
          stroke="url(#neon-grad)"
          strokeWidth="3.8"
          strokeDasharray="120 500"
          className="animate-[neon-race_4.94s_ease-in-out_infinite]"
        />
        {/* Secondary light train — offset */}
        <rect
          x="1" y="1"
          width="calc(100% - 2px)" height="calc(100% - 2px)"
          rx="16" ry="16"
          fill="none"
          stroke="url(#neon-grad-2)"
          strokeWidth="2.55"
          strokeDasharray="60 600"
          className="animate-[neon-race-reverse_8.19s_ease-in-out_infinite]"
        />
      </svg>
      {/* Static subtle border */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ border: "1px solid hsla(185,100%,50%,0.1)" }}
      />
    </div>
  );
};

export default NeonBorder;
