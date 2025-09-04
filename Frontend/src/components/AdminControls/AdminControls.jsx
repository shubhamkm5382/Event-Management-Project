import React from 'react';
import './AdminControls.css';

const AdminControls = ({ onAddMedia, onLogout }) => {
  return (
    <div className="admin-controls">
      <h2>Admin Controls</h2>
      <div className="admin-actions">
        <button className="btn btn-primary" onClick={onAddMedia}>Add New Media</button>
        <button className="btn btn-secondary">Manage Users</button>
        <button className="btn btn-secondary">View Statistics</button>
        <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminControls;