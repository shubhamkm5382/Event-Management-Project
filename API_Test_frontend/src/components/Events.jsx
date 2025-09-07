import React, { useEffect, useState } from "react";
import api from "../api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ event_title: "", event_subtitle: "", event_description: "", cover_image: "" });
  const [editId, setEditId] = useState(null);

  // Fetch events
  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle input
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/events/${editId}`, form);
    } else {
      await api.post("/events", form);
    }
    setForm({ event_title: "", event_subtitle: "", event_description: "", cover_image: "" });
    setEditId(null);
    fetchEvents();
  };

  // Delete
  const handleDelete = async (id) => {
    await api.delete(`/events/${id}`);
    fetchEvents();
  };

  // Edit
  const handleEdit = (event) => {
    setForm(event);
    setEditId(event.event_id);
  };

  return (
    <div>
      <h2>📌 Events</h2>
      <form onSubmit={handleSubmit}>
        <input name="event_title" value={form.event_title} onChange={handleChange} placeholder="Title" required />
        <input name="event_subtitle" value={form.event_subtitle} onChange={handleChange} placeholder="Subtitle" required />
        <input name="cover_image" value={form.cover_image} onChange={handleChange} placeholder="Cover Image" required />
        <textarea name="event_description" value={form.event_description} onChange={handleChange} placeholder="Description"></textarea>
        <button type="submit">{editId ? "Update" : "Create"}</button>
      </form>

      <ul>
        {events.map((e) => (
          <li key={e.event_id}>
            <b>{e.event_title}</b> - {e.event_subtitle}
            <button onClick={() => handleEdit(e)}>✏️ Edit</button>
            <button onClick={() => handleDelete(e.event_id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
