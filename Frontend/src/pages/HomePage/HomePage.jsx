import HeroSection from '../../components/hero/Hero'
import Features from '../../components/event/Eventshop'
import Events from '../../components/event/EventProduct'
import CounterCards from '../../components/event/CounterCards'
import TestimonialCards from "../../components/event/TestimonialCards";
// import Loader from "../../components/event/Loader";
import GallerySection from "../../components/event/GallerySection";

const Home = () => {
  return (
    <div>
      {/* navbar start */}
      <HeroSection />
      <Features />
      <CounterCards />
      <Events />
      {/* <Loader /> */}
      <GallerySection />
      <TestimonialCards />
    </div>
  )
}

export default Home
