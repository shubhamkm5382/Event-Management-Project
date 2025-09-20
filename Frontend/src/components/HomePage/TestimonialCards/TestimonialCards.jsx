import React from "react";
import styles from "./TestimonialCards.module.css";
import award from "../../../img/award.png";

const testimonials = [
  {
    stars: "★★★★★",
    text: "Really useful system. Perfect for managing our events smoothly.",
    img: "https://i.pravatar.cc/40?img=12",
    name: "Barry W.",
    role: "CEO",
  },
  {
    stars: "★★★★★",
    text: "Seamless experience, great support team, very reliable software!",
    img: "https://i.pravatar.cc/40?img=14",
    name: "Sophia K.",
    role: "Marketing Lead",
  },
  {
    stars: "★★★★★",
    text: "We saved hours every week. Integrations are super quick and easy.",
    img: "https://i.pravatar.cc/40?img=18",
    name: "Rajesh P.",
    role: "Project Manager",
  },
  {
    stars: "★★★★★",
    text: "Nimbus lets us launch new features in hours, not days. Total game-changer!",
    img: "https://i.pravatar.cc/40?img=5",
    name: "Devon R.",
    role: "Product Lead",
    center: true,
  },
  {
    stars: "★★★★★",
    text: "Our team loves how simple and intuitive the system is to use daily.",
    img: "https://i.pravatar.cc/40?img=22",
    name: "Emily T.",
    role: "HR Manager",
  },
  {
    stars: "★★★★★",
    text: "Reliable, modern, and super fast. I hardly need to check in. Highly recommended.",
    img: "https://i.pravatar.cc/40?img=8",
    name: "Thomas H.",
    role: "Tech Lead",
  },
  {
    stars: "★★★★★",
    text: "The platform has transformed our workflow and boosted team productivity.",
    img: "https://i.pravatar.cc/40?img=25",
    name: "Linda M.",
    role: "Operations Head",
  },
];

const TestimonialCards = () => {
  return (
    <section className={styles.wrap} aria-labelledby="beam-heading">
      {/* Awards Row */}
      <div className={styles.awards} aria-hidden="false">
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.award}>
            <img
              className={`${styles.laurel} ${styles.left}`}
              src={award}
              alt="laurel left"
              aria-hidden="true"
            />
            <span>Best To-Do List App</span>
            <img
              className={`${styles.laurel} ${styles.right}`}
              src={award}
              alt="laurel right"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      {/* Feedback Button */}
      <div className={styles.feedback}>Real Feedback</div>

      {/* Heading */}
      <h2 id="beam-heading" className={styles.heading}>
        Millions of people rely on <strong>Beam</strong> to stay organized,
        <br />
        boost productivity, and balance work and life.
      </h2>

      {/* Trust Info */}
      <div className={styles.trust}>
        Trusted by <strong>58,980+ users</strong>
        <span className={styles.stars}>★★★★★</span> 4.8/5
      </div>

      {/* Testimonial Cards */}
      <div className={styles.testimonialContainer} aria-label="User testimonials">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className={`${styles.card} ${item.center ? styles.center : ""}`}
          >
            <div className={styles.testimonialStars}>{item.stars}</div>
            <p className={styles.testimonialText}>{item.text}</p>
            <div className={styles.profile}>
              <img src={item.img} alt={item.name} />
              <div className={styles.profileInfo}>
                <strong>{item.name}</strong>
                <br />
                <span className={styles.role}>{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialCards;
