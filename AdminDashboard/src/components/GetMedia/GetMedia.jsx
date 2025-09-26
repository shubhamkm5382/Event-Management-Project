import React, { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import { Link } from "react-router-dom";

export default function Gallery() {
  const [media, setMedia] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [eventType, setEventType] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [date, setDate] = useState("");

  // ✅ Fetch media from API
  useEffect(() => {
    fetch("http://localhost:5000/api/media")
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess) {
          setMedia(data.data);
          setFiltered(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Apply filters
  useEffect(() => {
    let result = media;

    if (eventType) {
      result = result.filter((m) => m.event_type === eventType);
    }

    if (mediaType) {
      result = result.filter((m) => m.media_type === mediaType);
    }

    if (date) {
      result = result.filter(
        (m) => m.created_at && m.created_at.startsWith(date)
      );
    }

    setFiltered(result);
  }, [eventType, mediaType, date, media]);

  // ✅ Delete media handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/media/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.isSuccess) {
        alert("Media deleted successfully ✅");
        setMedia(media.filter((m) => m.media_id !== id));
      } else {
        alert("Failed to delete ❌");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong ❌");
    }
  };

  // ✅ Edit media handler
  const handleEdit = (item) => {
    console.log("Edit clicked:", item);
    alert(`Edit clicked for: ${item.media_title}`);
  };

  return (
    <div className={styles.galleryPage}>
      <Link
        to="/addMedia"  >
        <div className={styles.add_media}>Add Media</div>
      </Link>
      <h2 className={styles.title}>Media Gallery</h2>

      {/* ✅ Filters */}
      <div className={styles.filters}>
        <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="">All Events</option>
          {[...new Set(media.map((m) => m.event_type))].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
          <option value="">All Media</option>
          <option value="photo">Photo</option>
          <option value="video">Video</option>
          <option value="short">Short</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* ✅ Gallery Grid */}
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.galleryGrid}>
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div key={item.media_id} className={styles.card}>
                {item.media_type === "photo" ? (
                  <img src={item.media_url} alt={item.media_title} />
                ) : (
                  <video controls>
                    <source src={item.media_url} type="video/mp4" />
                  </video>
                )}

                <div className={styles.info}>
                  <h3>{item.media_title}</h3>
                  <p>{item.media_description}</p>

                  {/* ✅ Extra Info */}
                  <small>
                    {item.event_type} •{" "}
                    {new Date(item.created_at).toLocaleDateString()}
                  </small>
                  <br />
                  <small>Type: {item.media_type}</small>
                  <br />
                  {item.media_location && (
                    <small>Location: {item.media_location}</small>
                  )}

                  {/* ✅ Buttons */}
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(item.media_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noData}>No media found 🚫</p>
          )}
        </div>
      )}
    </div>
  );
}
