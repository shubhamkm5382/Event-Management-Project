const express = require("express");
const router = express.Router();

// Dummy data (aap DB se bhi laa sakte ho future mein)
const galleryData = [
  {
    id: 1,
    category: "photo",
    title: "Mountain View",
    description: "Beautiful mountain landscape",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    alt: "Mountain",
    location: "Himachal",
    date: "Apr 2023"
  },
  {
    id: 2,
    category: "photo",
    title: "Forest Walk",
    description: "Peaceful trail",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    alt: "Forest",
    location: "Kerala",
    date: "Jun 2023"
  },
  {
    id: 3,
    category: "photo",
    title: "Beach",
    description: "Sunny beach",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    alt: "Beach",
    location: "Goa",
    date: "May 2023"
  },
  {
    id: 4,
    category: "photo",
    title: "Wedding Album",
    description: "Special memories",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    alt: "Wedding",
    location: "Rajasthan",
    date: "Sep 2023"
  },
  {
    id: 5,
    category: "photo",
    title: "Beach",
    description: "Sunny beach",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    alt: "Beach",
    location: "Goa",
    date: "May 2023"
  }
];

// ✅ API with category filter
router.get("/", (req, res) => {
  const { category } = req.query;

  if (category) {
    const filtered = galleryData.filter(item => item.category === category);
    res.json(filtered);
  } else {
    res.json(galleryData);
  }
});

module.exports = router;
