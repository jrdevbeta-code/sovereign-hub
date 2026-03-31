import { motion } from "framer-motion";
import mentorImg from "@/assets/mentor-avatar.png";

const MentorSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-col items-center px-5 py-2"
    >
      <div className="relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full bg-gradient-to-t from-cyan/20 to-transparent blur-xl" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-3 rounded-full bg-cyan/30 blur-md" />
        <motion.img
          src={mentorImg}
          alt="El Mentor - Tu guía digital"
          width={200}
          height={200}
          className="mentor-glow float-animation relative z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-1 text-sm text-muted-foreground font-exo text-center"
      >
        Hola, soy <span className="text-cyan cyan-glow font-semibold">El Mentor</span>. ¿En qué te ayudo hoy?
      </motion.p>
    </motion.section>
  );
};

export default MentorSection;
