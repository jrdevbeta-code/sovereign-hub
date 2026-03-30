import Header from "@/components/brinpal/Header";
import MentorSection from "@/components/brinpal/MentorSection";
import MicButton from "@/components/brinpal/MicButton";
import DashboardCards from "@/components/brinpal/DashboardCards";
import BottomNav from "@/components/brinpal/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-24">
      <Header />
      <MentorSection />
      <MicButton />
      <DashboardCards />
      <BottomNav />
    </div>
  );
};

export default Index;
