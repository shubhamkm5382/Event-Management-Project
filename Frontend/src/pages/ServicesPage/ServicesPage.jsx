import React from "react";
import styles from "./ServicesPage.module.css";

const Services = () => {
  const services = [
    {
      icon: "📅",
      title: "Event Planning",
      desc: "Complete event structure, date, timeline, phase-wise plan, and master schedule.",
    },
    {
      icon: "🏛️",
      title: "Venue Selection",
      desc: "Venue layout, parking facility, entrance-exit, and space utilization.",
    },
    {
      icon: "🍽️",
      title: "Catering",
      desc: "Custom menus, dietary preferences, serving style, kitchen setup, and staff.",
    },
    {
      icon: "🎨",
      title: "Décor & Theme",
      desc: "Theme decoration, floral arrangement, furniture, photo booth, and branding.",
    },
    {
      icon: "🎶",
      title: "Entertainment",
      desc: "Live band, DJs, celebrity performances, contracts, and technical setup.",
    },
    {
      icon: "🚐",
      title: "Logistics",
      desc: "Guest transport, VIP arrangements, hotel booking, rental equipment setup.",
    },
    {
      icon: "💡",
      title: "Technical Support",
      desc: "Sound, lighting, LED screens, projectors, and live streaming.",
    },
    {
      icon: "📝",
      title: "Guest Management",
      desc: "Online registration, check-in, guest list, welcome kits, badges, and ribbons.",
    },
    {
      icon: "📢",
      title: "Marketing & Promotion",
      desc: "Branding, social media campaigns, press releases, and media partnerships.",
    },
    {
      icon: "🛠️",
      title: "On-Site Management",
      desc: "Centralized control, staff coordination, timing monitoring, instant solutions.",
    },
    {
      icon: "🛡️",
      title: "Security",
      desc: "Professional guards, VIP protection, entry control, medical & health safety.",
    },
    {
      icon: "🧹",
      title: "Post-Event Services",
      desc: "Venue clearance, rental return, client feedback, event reports, photo/video delivery.",
    },
  ];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesHeader}>
        <h2>Our Event Management Services</h2>
        <p>We plan, design, and execute your events flawlessly.</p>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.icon}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
