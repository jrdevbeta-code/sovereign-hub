import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import RadarIcon from "./RadarIcon";

const strips = [
  {
    value: "321.524,89",
    label: "Bs",
    bg: "linear-gradient(135deg, hsl(0,0%,96%), hsl(0,0%,100%))",
    textColor: "hsl(0,0%,10%)",
    labelColor: "hsl(0,0%,30%)",
    weight: 1.7,
  },
  {
    value: "662,93",
    label: "BCV",
    bg: "linear-gradient(135deg, hsl(216,80%,45%), hsl(216,90%,55%))",
    textColor: "hsl(0,0%,100%)",
    labelColor: "hsla(0,0%,100%,0.7)",
    weight: 1,
  },
  {
    value: "502,45",
    label: "BP",
    bg: "linear-gradient(135deg, hsl(145,60%,38%), hsl(145,70%,45%))",
    textColor: "hsl(0,0%,100%)",
    labelColor: "hsla(0,0%,100%,0.7)",
    weight: 1,
  },
];

const TernaPiano = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-card-deep p-4 pb-0 flex flex-col"
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: 'hsla(43,80%,60%,0.1)',
            border: '1px solid hsla(43,80%,60%,0.2)',
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="hsl(43,80%,62%)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="2"/>
            <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
          </svg>
        </div>
        <span style={{
          display:'inline-flex', alignItems:'center',
          fontSize:'10px', fontWeight:700, padding:'3px 10px',
          borderRadius:'100px', letterSpacing:'0.05em',
          background:'rgba(255,255,255,0.06)',
          color:'hsl(43,80%,62%)',
          border:'1px solid hsla(43,80%,62%,0.38)',
        }}>Radar</span>
        <span style={{
          display:'inline-flex', alignItems:'center',
          fontSize:'10px', fontWeight:700, padding:'3px 10px',
          borderRadius:'100px', letterSpacing:'0.05em',
          background:'rgba(255,255,255,0.06)',
          color:'rgba(255,255,255,0.75)',
          border:'1px solid rgba(255,255,255,0.2)',
        }}>Precios</span>
      </div>

      {/* Product info + trend */}
      <div className="mb-2">
        <p className="text-sm font-semibold text-foreground">
          Queso Duro/Llanero (Kg) · El Marqués
        </p>
        <p className="text-[10px] mt-0.5 font-exo" style={{ color: "hsla(0,0%,100%,0.8)" }}>
          Último reporte: Hace 2h
        </p>

        {/* Mini trend chart */}
        <div className="flex items-end gap-[3px] mt-2 h-8">
          {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
              className="flex-1 rounded-sm origin-bottom"
              style={{
                height: `${h}%`,
                background:
                  i >= 7
                    ? "hsl(var(--cyan))"
                    : "hsla(185,100%,50%,0.42)",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="w-3 h-3 text-cyan" />
          <span className="text-[9px] text-cyan font-orbitron font-bold">+12% esta semana</span>
        </div>
      </div>

      {/* Piano strips flush to bottom */}
      <div className="flex gap-0 -mx-4 mt-auto">
        {strips.map((strip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            className="py-2.5 px-1.5 flex flex-col items-center justify-center origin-bottom min-w-0"
            style={{
              background: strip.bg,
              borderRadius: i === 0 ? "0 0 0 1rem" : i === 2 ? "0 0 1rem 0" : "0",
              flexGrow: strip.weight,
              flexBasis: 0,
            }}
          >
            <span
              className="text-[13px] font-orbitron leading-tight whitespace-nowrap"
              style={{ color: strip.textColor, fontWeight: 900 }}
            >
              {strip.value}
            </span>
            <span
              className="text-[10px] font-orbitron mt-0.5"
              style={{ color: strip.labelColor, fontWeight: 900 }}
            >
              {strip.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TernaPiano;
