import React from "react";

interface NexusIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const NexusIcon = ({ className, style }: NexusIconProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    {/* Usuario gold acercándose desde la derecha */}
    <g
      style={{
        animation: "approach-nexus 2.4s ease-in-out infinite",
        transformOrigin: "24px 10px",
      }}
    >
      <circle cx="24" cy="9" r="3.5" stroke="hsl(43,80%,62%)" strokeWidth="1.8" opacity="0.8" />
      <path d="M18 24a6.5 6.5 0 0 1 12 0" stroke="hsl(43,80%,62%)" strokeWidth="1.8" opacity="0.8" />
    </g>

    {/* Usuario principal cyan — fijo */}
    <circle cx="13" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 27a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="1.8" />

    {/* Punto de conexión gold pulsante */}
    <circle
      cx="19"
      cy="16"
      r="1.5"
      fill="hsl(43,80%,62%)"
      stroke="none"
      style={{ animation: "pulse-nexus-node 1.6s ease-in-out infinite" }}
    />
  </svg>
);

export default NexusIcon;
