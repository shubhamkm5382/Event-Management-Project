import HeroSection from '../../components/HomePage/HeroSection/HeroSection'
import Features from '../../components/HomePage/Eventshop'
import Events from '../../components/HomePage/EventProduct'
import CounterCards from '../../components/HomePage/CounterCards/CounterCards'
import TestimonialCards from "../../components/HomePage/TestimonialCards/TestimonialCards";
import GallerySection from "../../components/HomePage/RecentWork/GallerySection";

const Home = () => {
  return (
    <div>
      {/* navbar start */}
      <HeroSection />
      <Features />
      <CounterCards />
      <Events />
      <GallerySection />
      <TestimonialCards />
    </div>
  )
}

export default Home
