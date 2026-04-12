import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://127.0.0.1:5000';

function App() {
  const [passengers, setPassengers] = useState([]);
  const [formData, setFormData] = useState({
    passengerName: '', from: '', to: '', departureDate: '', arrivalDate: '', phoneNumber: '', emailId: ''
  });

  const fetchPassengers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/view`);
      setPassengers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchPassengers(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/add`, formData);
      alert("Booking Successful!");
      // Reset form
      e.target.reset(); 
      setFormData({
        passengerName: '', from: '', to: '', departureDate: '', arrivalDate: '', phoneNumber: '', emailId: ''
      });
      fetchPassengers();
    } catch (err) {
      alert("Error adding booking. Possible duplicate phone number.");
    }
  };

  const deletePassenger = async (phone) => {
    if(window.confirm(`Are you sure you want to delete the booking for ${phone}?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/delete/${phone}`);
        fetchPassengers();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const updatePassenger = async (phone) => {
    const newEmail = prompt("Enter new Email ID:");
    if (newEmail) {
      try {
        await axios.put(`${API_BASE_URL}/update/${phone}`, { emailId: newEmail });
        fetchPassengers();
      } catch (err) {
        console.error("Update error:", err);
      }
    }
  };

  return (
    <div className="App">
      <header className="header-visual">
        <div className="airplane-icon">✈️</div>
        <h1>FLIGHT BOOKING SYSTEM</h1>
        <p>Lab 6 Submission - MERN Stack CRUD</p>
      </header>
      
      <main className="content">
        <form onSubmit={handleSubmit} className="booking-form">
          <h2>New Booking</h2>
          <div className="form-grid">
            <div className="input-group">
              <label>Passenger Name</label>
              <input name="passengerName" placeholder="e.g. John Doe" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>From</label>
              <input name="from" placeholder="e.g. New York" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>To</label>
              <input name="to" placeholder="e.g. London" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Departure Date</label>
              <input name="departureDate" type="date" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Arrival Date</label>
              <input name="arrivalDate" type="date" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Phone Number (Unique ID)</label>
              <input name="phoneNumber" placeholder="e.g. 9876543210" onChange={handleChange} required />
            </div>
            <div className="input-group full-width">
              <label>Email ID</label>
              <input name="emailId" placeholder="e.g. john@example.com" onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="submit-btn">Confirm Booking</button>
        </form>

        <div className="records-container">
          <h2>Passenger Records</h2>
          <div className="table-responsive">
            <table className="passenger-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {passengers.length > 0 ? (
                  passengers.map(p => (
                    <tr key={p.phoneNumber}>
                      <td>{p.passengerName}</td>
                      <td>{p.from}</td>
                      <td>{p.to}</td>
                      <td>{p.phoneNumber}</td>
                      <td>{p.emailId}</td>
                      <td className="actions-cell">
                        <button className="edit-btn" onClick={() => updatePassenger(p.phoneNumber)}>Edit Email</button>
                        <button className="delete-btn" onClick={() => deletePassenger(p.phoneNumber)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" className="no-data">No bookings found. Try adding a new booking.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;