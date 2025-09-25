import React from "react";
import { FaWhatsapp } from "react-icons/fa";

import styles from "./WhatsAppButton.module.css";

const WhatsAppButton = () => {
  const phoneNumber = "9155591324";
  const message = "Hello, I am interested in your services!";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsapp_float}
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
