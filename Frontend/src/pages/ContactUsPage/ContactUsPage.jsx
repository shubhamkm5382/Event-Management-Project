import React, { useState } from "react";
import styles from "./ContactUsPage.module.css";

const ContactPage = () => {
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showToastMsg("Please fill all required fields.");
      return;
    }

    showToastMsg(`Thanks ${name.split(" ")[0] || ""}! We received your enquiry.`);
    setTimeout(() => form.reset(), 600);
  };

  const showToastMsg = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4200);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrap} role="main" aria-labelledby="contactTitle">
        {/* LEFT IMAGE */}
        <div className={styles.left} aria-hidden="true">
          <div className={styles.brand} aria-hidden="true">
            <h1>LuxeEvents</h1>
            <p>
              Premium experiences — bespoke weddings & curated corporate
              gatherings crafted to perfection.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.right}>
          <div className={styles.card} role="region" aria-label="Contact form">
            <h2 id="contactTitle">Let's plan something unforgettable</h2>
            <p className={styles.subtitle}>
              Share a few details and our lead planner will reach out within 24
              hours.
            </p>

            <form id="contactForm" onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  required
                  autoComplete="name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@domain.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Tell us about your event</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Briefly describe your event, expected guests, vibe..."
                  required
                ></textarea>
              </div>

              <div className={styles.actions}>
                <button className={styles.btn} type="submit">
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

      {/* TOAST */}
      <div
        className={`${styles.toast} ${showToast ? styles.show : ""}`}
        role="status"
        aria-live="polite"
      >
        {toastMsg || "Thank you! Your enquiry has been sent."}
      </div>
    </div>
  );
};

export default ContactPage;
