import React from "react";
import styles from "./EventInfo.module.css";
import Packages from "../Packages/Packages";

const eventContent = {
  wedding: {
    title: "Grand Wedding Celebration",
    location: "123 Party Avenue, Patna, Bihar, India",
    quickInfo: {
      type: "Wedding",
      guests: "Up to 300",
      date: "Flexible",
      price: "₹1,50,000+",
    },
    description:
      "Celebrate your special moments at our premium wedding venue. Whether it's a traditional ceremony, a modern luxury wedding, or a romantic beach-inspired setup, we provide a customizable experience for you and your guests.",
    amenities: [
      "Air Conditioning",
      "Catering Services",
      "Decoration & Lighting",
      "Parking Available",
      "Live Music / DJ",
      "Photography & Videography",
    ],
    themes: [
      "Traditional & Cultural",
      "Beach / Coastal",
      "Luxury & Glamorous",
      "Rustic & Vintage",
      "Bohemian Chic",
    ],
  },

  corporate: {
    title: "Corporate Conference & Meetings",
    location: "Business Tower, Patna, Bihar, India",
    quickInfo: {
      type: "Corporate",
      guests: "Up to 200",
      date: "Flexible",
      price: "₹80,000+",
    },
    description:
      "Host your corporate events, conferences, and meetings in a fully-equipped professional venue with modern amenities to ensure success.",
    amenities: [
      "Projector & Screens",
      "High-Speed WiFi",
      "Catering & Beverages",
      "Parking Facility",
      "Professional Lighting",
      "Stage & Sound System",
    ],
    themes: ["Formal Conference", "Team Building", "Networking Events", "Workshops"],
  },

  birthday: {
    title: "Birthday Bash Celebration",
    location: "Fun Zone, Patna, Bihar, India",
    quickInfo: {
      type: "Birthday",
      guests: "Up to 150",
      date: "Flexible",
      price: "₹40,000+",
    },
    description:
      "Make birthdays unforgettable with themed decorations, entertainment, and delicious catering designed especially for kids and adults alike.",
    amenities: [
      "Theme Decoration",
      "Cake & Desserts",
      "Music & Entertainment",
      "Games & Fun Activities",
      "Photography",
    ],
    themes: ["Cartoon Theme", "Bollywood Theme", "Color Splash", "Retro Party"],
  },

  anniversary: {
    title: "Anniversary Celebration",
    location: "Romantic Garden, Patna, Bihar, India",
    quickInfo: {
      type: "Anniversary",
      guests: "Up to 100",
      date: "Flexible",
      price: "₹60,000+",
    },
    description:
      "Celebrate love and togetherness with a beautiful anniversary setup. Romantic decor, music, and fine dining to create everlasting memories.",
    amenities: [
      "Romantic Decoration",
      "Candle Light Dinner",
      "Live Music",
      "Photo Booth",
    ],
    themes: ["Romantic", "Vintage", "Luxury Dinner", "Garden Theme"],
  },

  farewell: {
    title: "Farewell Party Celebration",
    location: "Elite Banquet Hall, Patna, Bihar, India",
    quickInfo: {
      type: "Farewell",
      guests: "Up to 250",
      date: "Flexible",
      price: "₹70,000+",
    },
    description:
      "Bid goodbye in style with our farewell packages. Perfect for schools, colleges, or corporate farewells with stage, music, and catering.",
    amenities: [
      "Stage & Sound",
      "Catering Services",
      "DJ & Dance Floor",
      "Decoration",
      "Photography",
    ],
    themes: ["Classic Formal", "DJ Night", "Cultural Show"],
  },

  usa: {
    title: "USA Special Events",
    location: "Los Angeles, California, USA",
    quickInfo: {
      type: "International",
      guests: "Flexible",
      date: "Flexible",
      price: "$5000+",
    },
    description:
      "Host international events in the USA with premium venues, modern facilities, and world-class arrangements tailored for your needs.",
    amenities: [
      "International Catering",
      "Luxury Venues",
      "Stage & Entertainment",
      "Photography",
    ],
    themes: ["Hollywood Glam", "Beach Party", "Luxury Conference"],
  },
};

const EventInfo = ({ category }) => {
  const content = eventContent[category?.toLowerCase()] || eventContent["wedding"];

  return (
    <div className={styles.info}>
      <h1>{content.title}</h1>
      <p className={styles.location}>{content.location}</p>

      <div className={styles["quick-info"]}>
        <span><b>Event Type:</b> {content.quickInfo.type}</span>
        <span><b>Guests:</b> {content.quickInfo.guests}</span>
        <span><b>Date:</b> {content.quickInfo.date}</span>
        <span><b>Price:</b> {content.quickInfo.price}</span>
      </div>

      <p className={styles.description}>{content.description}</p>

      <h2>Offered Amenities</h2>
      <ul className={styles.amenities}>
        {content.amenities.map((item, i) => (
          <li key={i}>✔️ {item}</li>
        ))}
      </ul>

      <h2>Popular Themes</h2>
      <ul className={styles.themes}>
        {content.themes.map((item, i) => (
          <li key={i}>✨ {item}</li>
        ))}
      </ul>

      <Packages />
    </div>
  );
};

export default EventInfo;
