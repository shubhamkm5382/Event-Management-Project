import React, { useEffect, useState } from "react";
import api from "../api";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ event_id: "", album_title: "", album_subtitle: "", album_description: "", cover_image: "" });
  const [editId, setEditId] = useState(null);

  // Fetch albums
  const fetchAlbums = async () => {
    const res = await api.get("/albums");
    setAlbums(res.data);
  };

  // Fetch events (for dropdown)
  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchAlbums();
    fetchEvents();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/albums/${editId}`, form);
    } else {
      await api.post("/albums", form);
    }
    setForm({ event_id: "", album_title: "", album_subtitle: "", album_description: "", cover_image: "" });
    setEditId(null);
    fetchAlbums();
  };

  const handleDelete = async (id) => {
    await api.delete(`/albums/${id}`);
    fetchAlbums();
  };

  const handleEdit = (album) => {
    setForm(album);
    setEditId(album.album_id);
  };

  return (
    <div>
      <h2>📸 Albums</h2>
      <form onSubmit={handleSubmit}>
        {/* Dropdown for Event Title */}
        <select name="event_id" value={form.event_id} onChange={handleChange} required>
          <option value="">-- Select Event --</option>
          {events.map((e) => (
            <option key={e.event_id} value={e.event_id}>
              {e.event_title}
            </option>
          ))}
        </select>

        <input name="album_title" value={form.album_title} onChange={handleChange} placeholder="Title" required />
        <input name="album_subtitle" value={form.album_subtitle} onChange={handleChange} placeholder="Subtitle" required />
        <input name="cover_image" value={form.cover_image} onChange={handleChange} placeholder="Cover Image" required />
        <textarea name="album_description" value={form.album_description} onChange={handleChange} placeholder="Description"></textarea>
        <button type="submit">{editId ? "Update" : "Create"}</button>
      </form>

      <ul>
        {albums.map((a) => (
          <li key={a.album_id}>
            <b>{a.album_title}</b> ({events.find((e) => e.event_id === a.event_id)?.event_title || "Unknown Event"})
            <button onClick={() => handleEdit(a)}>✏️ Edit</button>
            <button onClick={() => handleDelete(a.album_id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
