import Header from "@/components/brinpal/Header";
import MentorSection from "@/components/brinpal/MentorSection";
import MicButton from "@/components/brinpal/MicButton";
import TernaPiano from "@/components/brinpal/TernaPiano";
import VacaCard from "@/components/brinpal/VacaCard";
import NationFeed from "@/components/brinpal/NationFeed";
import BottomNav from "@/components/brinpal/BottomNav";
import NeonBorder from "@/components/brinpal/NeonBorder";


const Index = () => {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-28">
      <NeonBorder />
      <Header />
      <MentorSection />
      <MicButton />
      <div className="px-5 pb-2 pt-1 space-y-2" style={{ marginTop: "20px" }}>
        <TernaPiano />
        <VacaCard />
      </div>
      <NationFeed />
      <BottomNav />
      
    </div>
  );
};

export default Index;
