import React, { useState } from 'react';
import profileImage from './pic.png'; 

function App() {
  const [formData, setFormData] = useState({ 
    username: '', email: '', phone: '', collegeId: '', dept: '', bio: '' 
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.username.trim()) tempErrors.username = true;
    if (!formData.collegeId.trim()) tempErrors.collegeId = true;
    if (!formData.dept.trim()) tempErrors.dept = true;
    if (!formData.bio.trim()) tempErrors.bio = true;
    
    if (!emailRegex.test(formData.email)) tempErrors.email = true;
    if (!phoneRegex.test(formData.phone)) tempErrors.phone = true;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const handlePrint = () => window.print();

  const styles = {
    wrapper: {
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: '#1e293b'
    },
    container: {
      maxWidth: '700px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '25px',
      borderBottom: '2px solid #3b82f6',
      paddingBottom: '20px',
      marginBottom: '30px'
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '8px',
      backgroundImage: `url(${profileImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: '1px solid #cbd5e1'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px'
    },
    inputGroup: { marginBottom: '15px' },
    label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '5px' },
    input: (err) => ({
      width: '100%',
      padding: '10px',
      border: `1px solid ${err ? '#ef4444' : '#cbd5e1'}`,
      borderRadius: '6px',
      fontSize: '15px',
      boxSizing: 'border-box'
    }),
    btnPrimary: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      marginRight: '10px'
    },
    btnSecondary: {
      backgroundColor: '#64748b',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Hidden during normal view, visible during print via global CSS below */}
      <style>
        {`
          @media print {
            body { background: white !important; }
            .no-print { display: none !important; }
            .print-container { 
              box-shadow: none !important; 
              border: none !important; 
              width: 100% !important;
              max-width: 100% !important;
              padding: 0 !important;
            }
          }
        `}
      </style>

      <div style={styles.container} className="print-container">
        <div style={styles.header}>
          <div style={styles.avatar}></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px' }}>Student Profile: {formData.username || 'Atharva Hemade'}</h1>
            <p style={{ margin: '5px 0 0', color: '#64748b' }}>FSD Assignment A5 - Official Submission</p>
          </div>
        </div>

        {submitted && (
          <div style={{ color: '#15803d', backgroundColor: '#f0fdf4', padding: '10px', marginBottom: '20px', borderRadius: '6px' }} className="no-print">
            ✅ Form Validated. Ready for Print.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input name="username" style={styles.input(errors.username)} value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>College ID</label>
              <input name="collegeId" placeholder="e.g. 2021001" style={styles.input(errors.collegeId)} value={formData.collegeId} onChange={(e) => setFormData({...formData, collegeId: e.target.value})} />
            </div>
          </div>

          <div style={styles.grid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input name="email" style={styles.input(errors.email)} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <input name="phone" placeholder="10 Digits" style={styles.input(errors.phone)} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Department</label>
            <select style={styles.input(errors.dept)} value={formData.dept} onChange={(e) => setFormData({...formData, dept: e.target.value})}>
              <option value="">Select Dept</option>
              <option value="CS">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="AI">Artificial Intelligence</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Professional Bio</label>
            <textarea rows="4" style={styles.input(errors.bio)} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
          </div>

          <div className="no-print" style={{ marginTop: '20px' }}>
            <button type="submit" style={styles.btnPrimary}>VALIDATE FORM</button>
            {submitted && <button type="button" onClick={handlePrint} style={styles.btnSecondary}>PRINT TO PDF</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;