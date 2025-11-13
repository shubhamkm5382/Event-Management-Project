import React, { useState, useEffect } from "react";
import styles from "./UpdateEvent.module.css";

export default function UpdateEvent({ event, onClose, onUpdateSuccess }) {
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
    eventType: "",
    eventTitle: "",
    eventDescription: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        eventType: event.event_type || "",
        eventTitle: event.event_title || "",
        eventDescription: event.event_description || "",
      });

      if (event.cover_image) {
        setFile({ name: "Existing Image", url: event.cover_image });
      }

      setLoading(false);
    }
  }, [event]);

  // handle file upload
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUrl("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
      setUrl("");
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleUrlAdd = () => {
    if (url.trim()) {
      setFile({ name: "URL Image", url: url.trim() });
      setUrl("");
    }
  };

  const removeFile = () => {
    setFile(null);
    setUrl("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!event?.event_id) {
      alert("No event ID found!");
      return;
    }

    try {
      const data = new FormData();
      data.append("event_type", formData.eventType);
      data.append("event_title", formData.eventTitle);
      data.append("event_description", formData.eventDescription);

      if (file) {
        if (file.url) {
          data.append("cover_image", file.url);
        } else {
          data.append("cover_image_file", file);
        }
      }

      const res = await fetch(`http://localhost:5000/api/events/${event.event_id}`, {
        method: "PUT",
        body: data,
      });

      if (res.ok) {
        alert("✅ Event updated successfully!");
        onUpdateSuccess();
        onClose();
      } else {
        const err = await res.json();
        alert("❌ Failed to update: " + err.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating the event.");
    }
  };

  const handleCancel = () => onClose();

  if (loading) {
    return <div className={styles.loading}>Loading event details...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Update Event</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Event Type *</label>
            <input
              type="text"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              placeholder="Enter event type"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Event Title *</label>
            <input
              type="text"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleInputChange}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className={styles.fieldFull}>
            <label>Description</label>
            <textarea
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleInputChange}
              placeholder="Enter event description"
            ></textarea>
          </div>
        </div>

        {/* Upload Section */}
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>
            {file ? "🖼️ Current Cover Image" : "📁 Upload Cover Image"}
          </label>

          {!file ? (
            <>
              <div
                className={styles.dropArea}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
                <div className={styles.dropzoneIcon}>📤</div>
                <p>Drag & Drop image here or click to select</p>
                <small>Only one image allowed</small>
              </div>

              <div className={styles.or}>OR</div>

              <div className={styles.urlInput}>
                <input
                  type="text"
                  value={url}
                  placeholder="Enter image URL"
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleUrlAdd()}
                />
                <button type="button" onClick={handleUrlAdd}>
                  Add URL
                </button>
              </div>
            </>
          ) : (
            <div className={styles.singlePreview}>
              <div className={styles.previewItem}>
                <img
                  src={file.url || URL.createObjectURL(file)}
                  alt="Cover Preview"
                />
                <span
                  className={styles.removeBtn}
                  onClick={removeFile}
                  title="Remove image"
                >
                  ×
                </span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.updateBtn}>
            Update Event
          </button>
          <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
