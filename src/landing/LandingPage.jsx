import '../landing.css';
import CursorAura from './CursorAura';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import StatsBar from './StatsBar';
import FeaturesSection from './FeaturesSection';
import CalculatorSection from './CalculatorSection';
import DashboardSection from './DashboardSection';
import StorytellingSection from './StorytellingSection';
import ChallengesSection from './ChallengesSection';
import CommunitySection from './CommunitySection';
import CTASection from './CTASection';
import Footer from './Footer';
import { enterApp } from '../utils/navigation';

export default function LandingPage() {
  const openApp = (view = 'tracker') => enterApp(view);

  return (
    <div className="bg-[#030f07] min-h-screen text-white font-sans overflow-x-hidden relative">
      <CursorAura />
      <Navbar onEnterApp={openApp} />
      <HeroSection onEnterApp={openApp} />
      <StatsBar />
      <FeaturesSection />
      <CalculatorSection onEnterApp={openApp} />
      <DashboardSection />
      <StorytellingSection />
      <ChallengesSection />
      <CommunitySection />
      <CTASection onEnterApp={openApp} />
      <Footer />
    </div>
  );
}
