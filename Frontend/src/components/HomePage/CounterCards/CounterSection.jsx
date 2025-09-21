import React, { useEffect } from "react";
import styles from "./CounterSection.module.css";

const cards = [
  { id: 1, icon: "fas fa-history", label: "Years of Experience", value: 21, suffix: "+", progress: "95%", precision: 0 },
  { id: 2, icon: "fas fa-glass-cheers", label: "Events Covered", value: 1.7, suffix: "K+", progress: "85%", precision: 1 },
  { id: 3, icon: "fas fa-handshake", label: "Satisfied Clients", value: 1.5, suffix: "K+", progress: "78%", precision: 1 },
  { id: 4, icon: "fas fa-star", label: "Customer Rating", value: 4.8, suffix: "/5", progress: "96%", precision: 1 },
];

export default function CounterSection() {
  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function formatNumber(value, precision) {
      return precision ? value.toFixed(precision) : Math.round(value);
    }

    function animateCount(el, start, end, duration, precision) {
      const startTime = performance.now();
      const diff = end - start;

      function tick(now) {
        const t = Math.min((now - startTime) / duration, 1);
        el.textContent = formatNumber(start + diff * (1 - Math.pow(1 - t, 3)), precision);
        if (t < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    function animateProgress(el, width) {
      el.style.width = width;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardId = parseInt(entry.target.dataset.cardId);
          const card = cards.find(c => c.id === cardId);
          const numberEl = document.getElementById(`number${cardId}`);
          const progressEl = document.getElementById(`progress${cardId}`);

          if (prefersReduced) {
            numberEl.textContent = formatNumber(card.value, card.precision);
            progressEl.style.width = card.progress;
          } else {
            animateCount(numberEl, 0, card.value, 1500, card.precision);
            setTimeout(() => animateProgress(progressEl, card.progress), 300);
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll(`.${styles.cardWrap}`).forEach(el => observer.observe(el));
  }, []);

  return (
    <section className={styles.counterSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Our Achievements</h2>
        <p className={styles.sectionSubtitle}>With over two decades of excellence, we have reached impressive milestones that showcase our dedication and expertise.</p>
        <div className={styles.grid}>
          {cards.map(card => (
            <div key={card.id} className={styles.cardWrap} data-card-id={card.id}>
              <div className={styles.card}>
                <div className={styles.icon}><i className={card.icon}></i></div>
                <div className={styles.content}>
                  <div className={styles.label}>{card.label}</div>
                  <div className={styles.numberRow}>
                    <div className={styles.number} id={`number${card.id}`}>0</div>
                    <div className={styles.suffix}>{card.suffix}</div>
                  </div>
                  <div className={styles.progress}><i id={`progress${card.id}`}></i></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <p className={styles.footer}>LuxeEvents - Creating unforgettable experiences since 2003</p> */}
      </div>
    </section>
  );
}
