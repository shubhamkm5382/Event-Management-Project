import React, { useState } from "react";
import styles from "./AddMedia.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function AddMedia() {
  const [eventType, setEventType] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [mediadate, setMediadate] = useState("");
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState("");

  // 📂 Handle file input
  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
  };

  const handleDragOver = (e) => e.preventDefault();

  // 🌐 Add URL media
  const handleUrlAdd = () => {
    if (url.trim()) {
      setFiles((prev) => [...prev, { url }]);
      setUrl("");
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // 🚀 Submit media
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventType || !mediaType) {
      Swal.fire({ icon: "error", title: "Error", text: "Event type & Media type required" });
      return;
    }

    const formData = new FormData();
    formData.append("event_type", eventType);
    formData.append("media_type", mediaType);
    formData.append("media_title", eventTitle);
    formData.append("media_description", description);
    formData.append("media_location", location);
    formData.append("media_date", mediadate);
 

    // 📂 Append files
    files.forEach((file) => {
      if (file.url) {
        // URLs ko array me push
        formData.append("media_urls[]", file.url);
      } else {
        formData.append("media_files", file);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/media/create", {
        method: "POST",
        body: formData, // multipart/form-data automatically
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      Swal.fire({
        icon: "success",
        title: "Media Uploaded",
        text: `Total ${data.count} media items uploaded successfully!`,
      });

      // Reset form
      setEventType("");
      setEventTitle("");
      setMediaType("");
      setDescription("");
      setLocation("");
      setMediadate("");
      setFiles([]);
      setUrl("");

    } catch (err) {
      Swal.fire({ icon: "error", title: "Upload Failed", text: err.message });
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/getMedia" className={styles.menuItem}>
        <span className={styles.menuText}>Get all Media</span>
      </Link>

      <h2>Add Media</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Event Type</label>
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} required>
              <option value="">-- Select Event Type --</option>
              <option>Wedding</option>
              <option>Concert</option>
              <option>Birthday</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Event Title</label>
            <input type="text" placeholder="Enter event title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Media Type</label>
            <select value={mediaType} onChange={(e) => setMediaType(e.target.value)} required>
              <option value="">-- Select Media Type --</option>
              <option>Photo</option>
              <option>Video</option>
              <option>Short</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Description</label>
            <textarea placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Media Location</label>
            <input type="text" placeholder="e.g. Delhi, India" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Create Date</label>
            <input type="date" value={mediadate} onChange={(e) => setMediadate(e.target.value)} />
          </div>
        </div>

        {/* 📂 File Upload */}
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>📁 Add Media Files</label>

          <div className={styles.dropArea} onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => document.getElementById("fileInput").click()}>
            <input id="fileInput" type="file" multiple onChange={handleFileChange} className={styles.fileInput} />
            <div className={styles.dropzoneIcon}>📤</div>
            <p>Drag & Drop files here or click to select files</p>
          </div>

          <div className={styles.or}>OR</div>

          <div className={styles.urlInput}>
            <input type="text" value={url} placeholder="Enter media URL" onChange={(e) => setUrl(e.target.value)} />
            <button type="button" onClick={handleUrlAdd}>Add</button>
          </div>

          {files.length > 0 && <p className={styles.fileCount}>{files.length} media item{files.length > 1 ? "s" : ""} added</p>}

          {/* Preview */}
          <div className={styles.preview}>
            {files.map((file, index) => (
              <div key={index} className={styles.previewItem}>
                {file.url ? <img src={file.url} alt="preview" /> : <img src={URL.createObjectURL(file)} alt={file.name} />}
                <button type="button" className={styles.removeBtn} onClick={() => removeFile(index)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.addButton}>Add to Gallery</button>
      </form>
    </div>
  );
}
