import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '', 
    role: 'student' 
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Registration Successful! Please login.');
      navigate('/'); 
    } catch (err) {
      alert(err.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="Username" required
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
        /><br/>
        <input 
          type="password" placeholder="Password" required
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        /><br/>
        <select onChange={(e) => setFormData({...formData, role: e.target.value})}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select><br/>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/">Login here</Link></p>
    </div>
  );
};

export default Register;