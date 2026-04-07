import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';

function App() {
  return (

      <div className="app-container">
        <nav style={{ padding: '1rem', background: '#282c34', color: 'white' }}>
          <h1>Digital User Directory</h1>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </div>
    
  );
}

export default App;