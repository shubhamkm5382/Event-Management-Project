import React, { useEffect, useState } from "react";
import api from "../api";

const Media = () => {
  const [media, setMedia] = useState([]);
  const [events, setEvents] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [form, setForm] = useState({
    event_id: "",
    album_id: "",
    media_type: "photo",
    media_url: "",
    media_title: "",
    media_description: "",
    media_location: ""
  });
  const [editId, setEditId] = useState(null);

  // Fetch media
  const fetchMedia = async () => {
    const res = await api.get("/media");
    setMedia(res.data);
  };

  // Fetch events
  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  // Fetch albums
  const fetchAlbums = async () => {
    const res = await api.get("/albums");
    setAlbums(res.data);
  };

  useEffect(() => {
    fetchMedia();
    fetchEvents();
    fetchAlbums();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Fix: send null if album_id is empty
    const payload = {
      ...form,
      album_id: form.album_id === "" ? null : form.album_id
    };

    if (editId) {
      await api.put(`/media/${editId}`, payload);
    } else {
      await api.post("/media", payload);
    }

    setForm({
      event_id: "",
      album_id: "",
      media_type: "photo",
      media_url: "",
      media_title: "",
      media_description: "",
      media_location: ""
    });
    setEditId(null);
    fetchMedia();
  };

  const handleDelete = async (id) => {
    await api.delete(`/media/${id}`);
    fetchMedia();
  };

  const handleEdit = (m) => {
    // ✅ Ensure null album_id becomes empty string for dropdown
    setForm({
      ...m,
      album_id: m.album_id === null ? "" : m.album_id
    });
    setEditId(m.media_id);
  };

  return (
    <div>
      <h2>🎞️ Media</h2>
      <form onSubmit={handleSubmit}>
        {/* Event Dropdown */}
        <select name="event_id" value={form.event_id} onChange={handleChange} required>
          <option value="">-- Select Event --</option>
          {events.map((e) => (
            <option key={e.event_id} value={e.event_id}>
              {e.event_title}
            </option>
          ))}
        </select>

        {/* Album Dropdown */}
        <select name="album_id" value={form.album_id} onChange={handleChange}>
          <option value="">-- Select Album (Optional) --</option>
          {albums.map((a) => (
            <option key={a.album_id} value={a.album_id}>
              {a.album_title}
            </option>
          ))}
        </select>

        {/* Media Type */}
        <select name="media_type" value={form.media_type} onChange={handleChange} required>
          <option value="photo">Photo</option>
          <option value="video">Video</option>
          <option value="short">Short</option>
        </select>

        <input name="media_url" value={form.media_url} onChange={handleChange} placeholder="Media URL" required />
        <input name="media_title" value={form.media_title} onChange={handleChange} placeholder="Title" required />
        <textarea name="media_description" value={form.media_description} onChange={handleChange} placeholder="Description"></textarea>
        <input name="media_location" value={form.media_location} onChange={handleChange} placeholder="Location" />

        <button type="submit">{editId ? "Update" : "Create"}</button>
      </form>

      <ul>
        {media.map((m) => (
          <li key={m.media_id}>
            <b>{m.media_title}</b> [{m.media_type}] – 
            Event: {events.find((e) => e.event_id === m.event_id)?.event_title || "Unknown"} | 
            Album: {m.album_id ? (albums.find((a) => a.album_id === m.album_id)?.album_title || "None") : "None"}
            <br />
            <i>{m.media_location}</i>
            <img src={m.media_url} alt="Birthday Celebration" width="500"/>

            <br />
            <button onClick={() => handleEdit(m)}>✏️ Edit</button>
            <button onClick={() => handleDelete(m.media_id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Media;
