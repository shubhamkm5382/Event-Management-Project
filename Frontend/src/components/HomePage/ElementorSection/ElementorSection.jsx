import React from "react";
import styles from "./ElementorSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.luxeHero}>
      <div className="container">
        <div className={styles.luxeContainer}>
          <div className={styles.luxeText}>
            <p className={styles.luxeSubtitle}>LuxeEvents</p>
            <h1 className={styles.luxeTitle}>
              Premium Event Management Company in India – Trusted by Over 200+ Brands
            </h1>
            <p className={styles.luxeDescription}>
              We are nationally recognized event planning & organising company based in Pune. We started with a purpose to provide one stop solutions for all your Event-related worries. Craftworld Events company specialize in corporate events management, BTL activation. we also highly recommended for conference event organizing and exhibition stall designing. This is the best Event Management Agency in Pune, you will find, period. We’ve always prided ourselves on being more than just event orgainser firm. We proudly present STAGE WORLD, a complete production house having all the experience & capabilities of producing & managing exhibition & events. The in-house staging unit, fabrication & designing workshop, audio visual equipment & basic sound is our biggest asset to provide the state of the art equipment, technical staff and experienced event support around the world.
            </p>
          </div>
          <div className={styles.luxeImages}>
            <div className={styles.imageCollage}>
              <img className={styles.image1} src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80" alt="Corporate Event" />
              <img className={styles.image2} src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80" alt="Wedding Event" />
              <img className={styles.image3} src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80" alt="Exhibition Setup" />
              <img className={styles.image4} src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=600&q=80" alt="Stage Design" />
              <div className={styles.experienceBadge}>21+ YEARS EXPERIENCE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
