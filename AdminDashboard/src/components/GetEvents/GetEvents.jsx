import React, { useEffect, useState } from "react";
import styles from "./Events.module.css";
import { Link } from "react-router-dom";
import UpdateEvent from "../UpdateEvent/UpdateEvent";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  // Fetch all events
  const fetchEvents = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess) {
          setEvents(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.isSuccess) {
        alert("✅ Event deleted successfully!");
        fetchEvents();
      } else {
        alert("❌ Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    }
  };

  // Edit event
  const handleEdit = (item) => {
    setSelectedEvent(item);
    setShowUpdatePopup(true);
  };

  const handleUpdateSuccess = () => {
    fetchEvents();
    setShowUpdatePopup(false);
  };

  return (
    <div className={styles.eventsPage}>
      <Link to="/addEvent">
        <div className={styles.add_event}>Add Event</div>
      </Link>

      <h2 className={styles.title}>Event Management</h2>

      {/* Event Grid */}
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.eventsGrid}>
          {events.length > 0 ? (
            events.map((item) => (
              <div key={item.event_id} className={styles.card}>
                <img
                  src={item.cover_image}
                  alt={item.event_title}
                  className={styles.cover}
                />
                <div className={styles.info}>
                  <h3>{item.event_title}</h3>
                  <p>{item.event_description}</p>
                  <small>Type: {item.event_type}</small>
                  <br />
                  <small>
                    Created:{" "}
                    {new Date(item.created_at).toLocaleDateString("en-IN")}
                  </small>

                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(item.event_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noData}>No events found 🚫</p>
          )}
        </div>
      )}

      {/* Update Popup */}
      {showUpdatePopup && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalWrapper}>
            <div className={styles.modalContent}>
              <button
                className={styles.closeBtn}
                onClick={() => setShowUpdatePopup(false)}
              >
                ×
              </button>
              <UpdateEvent
                event={selectedEvent}
                onClose={() => setShowUpdatePopup(false)}
                onUpdateSuccess={handleUpdateSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
