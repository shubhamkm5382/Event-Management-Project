import React, { useState } from "react";
import styles from "./ContactUsPage.module.css";
import Swal from "sweetalert2";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ContactPage = () => {
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [massage, setMassage] = useState("");

  // ✅ Toast function declared before use
  const showToastMsg = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name: fullName,
      email: email,
      message: massage,
    };

    try {
      const response = await fetch("http://localhost:5000/api/contact/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) throw new Error("Failed to send enquiry");

      await response.json();

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thanks for reaching out. We'll contact you soon.",
        confirmButtonText: "OK",
      });

      // ✅ Save first name before clearing state
      const firstName = fullName.split(" ")[0] || "";

      // Reset form fields
      setFullname("");
      setEmail("");
      setMassage("");

      // ✅ Show toast with correct first name
      showToastMsg(`Thanks ${firstName}! We received your enquiry.`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Message Failed",
        text: "Something went wrong. Please try again later.",
        confirmButtonText: "OK",
      });
    }
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
              {/* Name */}
              <div className={styles.formGroup}>
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  required
                  value={fullName}
                  onChange={(e) => setFullname(e.target.value)}
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@domain.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              {/* Message */}
              <div className={styles.formGroup}>
                <label htmlFor="message">Tell us about your event</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Briefly describe your event, expected guests, vibe..."
                  required
                  value={massage}
                  onChange={(e) => setMassage(e.target.value)}
                ></textarea>
              </div>

              {/* Actions */}
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

      {/* ✅ TOAST */}
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
