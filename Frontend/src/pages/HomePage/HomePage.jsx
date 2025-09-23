import HeroSection from '../../components/HomePage/HeroSection/HeroSection'
import Features from '../../components/HomePage/Eventshop'
import Events from '../../components/HomePage/EventProduct'
import CounterCards from '../../components/HomePage/CounterCards/CounterCards'
import TestimonialCards from "../../components/HomePage/TestimonialCards/TestimonialCards";
import GallerySection from "../../components/HomePage/RecentWork/GallerySection";
import ElementorSection from "../../components/HomePage/ElementorSection/ElementorSection";
// import CounterSection from "../../components/HomePage/CounterCards/CounterSection";

const Home = () => {
  return (
    <div>
      {/* navbar start */}
      <HeroSection />
      <CounterCards/>
      <Features />
      <Events />
      <ElementorSection/>
      {/* <CounterSection/> */}
      <GallerySection />
      <TestimonialCards />
    </div>
  )
}

export default Home
