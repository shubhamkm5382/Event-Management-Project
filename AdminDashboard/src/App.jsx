import React from 'react';
import AdminDashboard from './AdminDashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AdminRoute from "./AdminRoute"


function App() {
  return (
    <div className="App">
      <AdminRoute>
        <AdminDashboard/>
      </AdminRoute>
    </div>
  );
}

export default App;