import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <div className="card">
      <div className="avatar">
        {user.name.charAt(0)}
      </div>
      <h3>{user.name}</h3>
      <p className="username">@{user.username}</p>
      <p className="email">{user.email}</p>
      
      <Link to={`/user/${user.id}`} className="view-btn">
        View Profile
      </Link>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          border-color: #4f46e5;
        }
        .avatar {
          width: 60px;
          height: 60px;
          background: #eef2ff;
          color: #4f46e5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-weight: bold;
          font-size: 1.5rem;
        }
        h3 { margin: 0.5rem 0; font-size: 1.1rem; }
        .username { color: #64748b; font-size: 0.9rem; margin-bottom: 0.2rem; }
        .email { color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .view-btn {
          display: inline-block;
          background: #4f46e5;
          color: white;
          text-decoration: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: background 0.2s;
        }
        .view-btn:hover { background: #4338ca; }
      `}</style>
    </div>
  );
};

export default UserCard;