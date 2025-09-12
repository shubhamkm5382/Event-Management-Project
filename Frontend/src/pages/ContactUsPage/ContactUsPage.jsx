import React, { useRef, useState, useEffect } from "react";
import styles from "./ContactUsPage.module.css";
// import "../styles/global.css"; // ensure path matches your project

export default function Contact() {
  const formRef = useRef(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const hideTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  function showToast(msg) {
    setToastMsg(msg || "Thank you! Your enquiry has been sent.");
    setToastVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setToastVisible(false), 4200);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    const name = (form.name.value || "").trim();
    const email = (form.email.value || "").trim();
    const message = (form.message.value || "").trim();

    if (!name || !email || !message) {
      showToast("Please fill all required fields.");
      return;
    }

    showToast("Thanks " + (name.split(" ")[0] || "") + "! We received your enquiry.");
    // reset after a short delay to mimic original
    setTimeout(() => form.reset(), 600);
  }

  return (
    <>
      <div className={styles.wrap} role="main" aria-labelledby="contactTitle">
        {/* LEFT: event image */}
        <div className={styles.left} aria-hidden="true">
          <div className={styles.brand} aria-hidden="true">
            <h1>LuxeEvents</h1>
            <p>
              Premium experiences — bespoke weddings & curated corporate
              gatherings crafted to perfection.
            </p>
          </div>
        </div>

        {/* RIGHT: simple contact form */}
        <div className={styles.right}>
          <div className={styles.card} role="region" aria-label="Contact form">
            <h2 id="contactTitle">Let's plan something unforgettable</h2>
            <p className={`${styles.subtitle} subtitle`}>
              Share a few details and our lead planner will reach out within 24
              hours.
            </p>

            <form id="contactForm" ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className={styles["form-group"]}>
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  required
                  autoComplete="name"
                  className={styles.input}
                />
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@domain.com"
                  required
                  autoComplete="email"
                  className={styles.input}
                />
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="message">Tell us about your event</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Briefly describe your event, expected guests, vibe..."
                  required
                  className={styles.textarea}
                />
              </div>

              <div className={styles.actions}>
                <button className={styles.btn} type="submit" aria-live="polite">
                  Send Enquiry
                </button>
                <div className={styles.meta}>
                  No spam — only personalised proposals from LuxeEvents.
                </div>
                <div className={styles.quick} aria-hidden="true">
                  <div className={styles.pill}>📞 +91 98765 43210</div>
                  <div className={styles.pill}>⏱ Reply within 24 hours</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* toast */}
      <div
        id="toast"
        className={`${styles.toast} ${toastVisible ? styles.show : ""}`}
        role="status"
        aria-live="polite"
      >
        {toastMsg || "Thank you! Your enquiry has been sent."}
      </div>
    </>
  );
}
