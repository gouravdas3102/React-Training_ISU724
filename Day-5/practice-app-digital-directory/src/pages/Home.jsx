import { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Loading directory...</div>;

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Team Members</h2>
        <p style={{ color: '#64748b' }}>A directory of all users currently in the system.</p>
      </header>

      <div className="user-grid">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <style jsx>{`
        .user-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default Home;