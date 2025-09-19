import React, { useEffect, useRef } from "react";
import styles from "./CounterCards.module.css";

const Card = ({ icon, label, to, suffix, precision = 0, progress = "60%" }) => {
  const wrapperRef = useRef(null);
  const numRef = useRef(null);
  const progRef = useRef(null);

  useEffect(() => {
    const formatNumber = (value, precision) => {
      const p = Number(precision) || 0;
      if (p === 0) return Math.round(value).toLocaleString();
      return value.toFixed(p);
    };

    const animateCount = (el, start, end, duration, precision) => {
      const startTime = performance.now();
      const diff = end - start;
      function tick(now) {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const current = start + diff * eased;
        el.textContent = formatNumber(current, precision);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };

    const prefersReduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const cardEl = entry.target;
          if (cardEl.dataset.played) return;
          cardEl.dataset.played = "true";

          // number animation
          if (numRef.current) {
            if (prefersReduced) {
              numRef.current.textContent = formatNumber(parseFloat(to || 0), precision);
            } else {
              const from = 0;
              const toVal = parseFloat(to) || 0;
              const duration = 1200 + Math.min(2600, Math.abs(toVal - from) * 6);
              animateCount(numRef.current, from, toVal, duration, precision);
            }
          }

          // progress animation
          if (progRef.current) {
            if (prefersReduced) {
              progRef.current.style.transition = "none";
              progRef.current.style.width = progress;
            } else {
              progRef.current.style.width = "0%";
              setTimeout(() => {
                progRef.current.style.width = progress;
              }, 60);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    if (wrapperRef.current) io.observe(wrapperRef.current);
    return () => io.disconnect();
  }, [to, precision, progress]);

  return (
    <div className={styles.cardWrap} ref={wrapperRef} data-animate>
      <div className={styles.card}>
        <div className={styles.icon} aria-hidden="true">{icon}</div>
        <div className={styles.content}>
          <div className={styles.label}>{label}</div>
          <div className={styles.numberRow}>
            <div className={styles.number} ref={numRef}>0</div>
            {suffix && <div className={styles.suffix}>{suffix}</div>}
          </div>
          <div className={styles.progress} aria-hidden="true">
            <i ref={progRef} style={{ width: progress }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CounterCards = () => {
  return (
    <div className={styles.shell} role="region" aria-label="Counters">
      <div className={styles.grid}>
        <Card icon="⏳" label="Years of Experience" to={15} suffix="+" precision={0} progress="95%" />
        <Card icon="🎉" label="Events Covered" to={1700} suffix="K+" precision={0} progress="85%" />
        <Card icon="🤝" label="Satisfied Clients" to={1500} suffix="K+" precision={0} progress="78%" />
        <Card icon="⭐" label="Customer Rating" to={4.8} suffix="/5" precision={1} progress="96%" />
      </div>
    </div>
  );
};

export default CounterCards;
