import HeroSection from '../../components/hero/Hero'
import Features from '../../components/event/Eventshop'
import Events from '../../components/event/EventProduct'
import CounterCards from '../../components/event/CounterCards'
import TestimonialCards from "../../components/event/TestimonialCards";

const Home = () => {
  return (
    <div>
        {/* navbar start */}
         <HeroSection/>
         <Features/>
         <CounterCards/>
         <Events/>
         <TestimonialCards/>
    </div>
  )
}

export default Home
