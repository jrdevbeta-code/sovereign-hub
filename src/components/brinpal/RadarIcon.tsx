import { SVGProps } from "react";

const RadarIcon = ({ className, width, height, strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={width}
    height={height}
    {...props}
  >
    <defs>
      <style>{`
        .radar-ping {
          animation: radar-ping-out 1.6s ease-out infinite;
        }
        @keyframes radar-ping-out {
          0%   { r: 2.5; opacity: 0.7; }
          100% { r: 7;   opacity: 0;   }
        }
      `}</style>
    </defs>
    <g transform="rotate(45 16 16)">
      <circle cx="16" cy="16" r="3.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="16" y1="12.5" x2="16" y2="5" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="16" y1="19.5" x2="16" y2="27" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="4" y="13" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="21" y="13" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="11" y1="16" x2="12.5" y2="16" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="19.5" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* halo que crece y desaparece */}
      <circle cx="16" cy="5" r="2.5" fill="hsl(185,100%,52%)" stroke="none" className="radar-ping" />
      {/* punto fijo siempre visible */}
      <circle cx="16" cy="5" r="2.5" fill="hsl(185,100%,52%)" stroke="none" />
      <circle cx="16" cy="27" r="1.5" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

export default RadarIcon;
