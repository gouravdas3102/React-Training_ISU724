import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loader">Loading profile...</div>;

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Directory
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{user.name.charAt(0)}</div>
          <div>
            <h1 className="profile-name">{user.name}</h1>
            <p>@{user.username} • {user.website}</p>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <label>Email</label>
            <p>{user.email}</p>
          </div>
          <div className="info-item">
            <label>Phone</label>
            <p>{user.phone}</p>
          </div>
          <div className="info-item">
            <label>Company</label>
            <p>{user.company.name}</p>
          </div>
          <div className="info-item">
            <label>Location</label>
            <p>{user.address.city}, {user.address.street}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .back-btn {
          background: none;
          border: none;
          color: #4f46e5;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1.5rem;
          padding: 0;
        }
        .profile-card {
          background: white;
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 2rem;
          margin-bottom: 2rem;
        }
        .profile-avatar {
          width: 80px;
          height: 80px;
          background: #4f46e5;
          color: black;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
        }
        .profile-name {
          margin: 1.5rem 0;
          color: rgb(22, 23, 24);
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .info-item label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgb(22, 23, 24);
          margin-bottom: 0.5rem;
        }
        .info-item p {
          font-weight: 500;
          font-size: 1.1rem;
          margin: 0;
        }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;