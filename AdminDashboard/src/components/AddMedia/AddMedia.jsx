import React, { useState } from "react";
import styles from "./AddMedia.module.css";
import { Link} from "react-router-dom";

export default function AddMedia() {
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleUrlAdd = () => {
    if (url.trim()) {
      setFiles((prev) => [...prev, { name: url, url }]);
      setUrl("");
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className={styles.container}>
        <Link 
          to="/getMedia" 
          className={`${styles.menuItem}`} 
        >
          <span className={styles.menuText}>Get all Media</span>
        </Link>
      <h2>Add Media</h2>

      <div className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Event Type</label>
            <select>
              <option>-- Select Event Type --</option>
              <option>Wedding</option>
              <option>Concert</option>
              <option>Birthday</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Event Title</label>
            <input type="text" placeholder="Enter event title" />
          </div>

          <div className={styles.field}>
            <label>Media Type</label>
            <select>
              <option>Photo</option>
              <option>Video</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Description</label>
            <textarea placeholder="Enter description"></textarea>
          </div>

          <div className={styles.field}>
            <label>Media Location</label>
            <input type="text" placeholder="e.g. Delhi, India" />
          </div>

          <div className={styles.field}>
            <label>Create Date</label>
            <input type="date" />
          </div>
        </div>

        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>📁 Add Media Files</label>

          <div
            className={styles.dropArea}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() =>
              document.getElementById("fileInput").click()
            }
          >
            <input
              id="fileInput"
              type="file"
              multiple
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <p>Drag & Drop files here or click to select files</p>
          </div>

          <div className={styles.or}>OR</div>

          <div className={styles.urlInput}>
            <input
              type="text"
              value={url}
              placeholder="Enter media URL"
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="button" onClick={handleUrlAdd}>
              Add
            </button>
          </div>

          {files.length > 0 && (
            <p className={styles.fileCount}>
              {files.length} media item{files.length > 1 ? "s" : ""} added
            </p>
          )}

          <div className={styles.preview}>
            {files.map((file, index) => (
              <div key={index} className={styles.previewItem}>
                {file.url ? (
                  <img src={file.url} alt="preview" />
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                )}
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFile(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className={styles.addButton}>Add to Gallery</button>
      </div>
    </div>
  );
}
