import React, { useState } from 'react';
// Step 1: Import your new profile image
import profileImage from './pic.png'; 

function App() {
  const [formData, setFormData] = useState({ username: '', email: '', bio: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.username.trim()) tempErrors.username = true;
    if (!formData.bio.trim()) tempErrors.bio = true;
    if (!formData.email.trim()) {
      tempErrors.email = "required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "invalid";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#d1d5db',
      padding: '20px'
    },
    profileHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '30px'
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      border: '4px solid #3b82f6',
      // Step 2: Set the imported profile image
      backgroundImage: `url(${profileImage})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginBottom: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
    },
    card: {
      background: '#1f2937',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
      width: '100%',
      maxWidth: '450px',
      textAlign: 'left',
      position: 'relative',
      border: '1px solid #374151'
    },
    title: {
      margin: '0 0 10px 0',
      color: '#f3f4f6',
      fontSize: '28px',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#9ca3af',
      marginBottom: '30px',
      margin: 0
    },
    inputGroup: { marginBottom: '25px' },
    label: { display: 'block', marginBottom: '8px', color: '#9ca3af', fontWeight: '600', fontSize: '14px' },
    input: (isError) => ({
      width: '100%',
      padding: '14px',
      borderRadius: '10px',
      border: isError ? '2px solid #ef4444' : '1px solid #374151',
      fontSize: '16px',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease',
      outline: 'none',
      backgroundColor: isError ? '#1e293b' : '#374151', 
      color: '#f3f4f6'
    }),
    button: {
      width: '100%',
      padding: '16px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '17px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background 0.3s ease, transform 0.1s ease',
      boxShadow: '0 5px 15px rgba(59, 130, 246, 0.4)'
    },
    errorText: { color: '#ef4444', fontSize: '12px', marginTop: '6px' },
    successBox: {
      backgroundColor: '#059669', 
      color: 'white',
      padding: '15px',
      borderRadius: '12px',
      textAlign: 'center',
      fontSize: '14px',
      border: '1px solid #047857',
      marginBottom: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        {/* Your new profile avatar with correct image setting */}
        <div style={styles.avatar}></div>
        <h1 style={styles.title}>Atharva’s Developer Profile</h1>
        <p style={styles.subtitle}>FSD Assignment (A5) Form Submission</p>
      </div>

      <div style={styles.card}>
        
        {submitted && (
          <div style={styles.successBox}>
            ⚡ Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              name="username"
              placeholder="e.g. Atharva Hemade"
              value={formData.username}
              onChange={handleChange}
              style={styles.input(errors.username)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Professional Email</label>
            <input
              name="email"
              placeholder="hemadeatharva@gmail.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input(errors.email)}
            />
            {errors.email === "invalid" && <div style={styles.errorText}>This email format is invalid.</div>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Developer Bio</label>
            <textarea
              name="bio"
              rows="4"
              placeholder="Tell us about your tech stack and experience..."
              value={formData.bio}
              onChange={handleChange}
              style={{ ...styles.input(errors.bio), resize: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={(e) => e.target.style.background = '#2563eb'}
            onMouseOut={(e) => e.target.style.background = '#3b82f6'}
          >
            UPDATE PROFILE
          </button>
        </form>
      </div>

    </div>
  );
}

export default App;