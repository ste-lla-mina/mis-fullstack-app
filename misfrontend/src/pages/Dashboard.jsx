import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userRole, setUserRole] = useState("");
  const [data, setData] = useState([]);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', age: '', grade: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token || !role) {
      navigate('/');
    } else {
      setUserRole(role);
      fetchDashboardData(role); // Pass role directly to avoid "undefined" race condition
    }
  }, []);

  const fetchDashboardData = async (role) => {
    try {
      if (role === 'admin') {
        const res = await API.get('/students/all');
        setData(res.data);
      } else if (role === 'teacher') {
        const res = await API.get('/classes/my-students');
        setData(res.data.data);
      }
      // Add student specific fetch here if needed
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header>
        <div>
          <h2 style={{ margin: 0 }}>MIS Portal</h2>
          <small style={{ color: '#6366f1', fontWeight: 'bold' }}>
            {userRole ? userRole.toUpperCase() : "LOADING..."} ACCOUNT
          </small>
        </div>
        <button onClick={handleLogout} className="btn-primary" style={{ width: 'auto', background: '#ef4444' }}>
          Sign Out
        </button>
      </header>

      {/* ADMIN CONTENT */}
      {userRole === 'admin' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          <div className="card">
            <h3>Add New Student</h3>
            <form>
              <input type="text" placeholder="Name" onChange={(e) => setStudentForm({...studentForm, name: e.target.value})} />
              <input type="email" placeholder="Email" onChange={(e) => setStudentForm({...studentForm, email: e.target.value})} />
              <button type="button" className="btn-primary">Save Student</button>
            </form>
          </div>
          <div className="card">
            <h3>System Users (Students)</h3>
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {data.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><button style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer'}}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TEACHER CONTENT */}
      {userRole === 'teacher' && (
        <div className="card">
          <h3>Your Assigned Classes</h3>
          {data.map(cls => (
            <div key={cls._id} style={{ marginBottom: '2rem', borderBottom: '1px solid #eee' }}>
              <h4>{cls.className} - {cls.subject}</h4>
              <table>
                <thead><tr><th>Student Name</th><th>Email</th></tr></thead>
                <tbody>
                  {cls.students.map(s => (
                    <tr key={s._id}><td>{s.name}</td><td>{s.email}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;