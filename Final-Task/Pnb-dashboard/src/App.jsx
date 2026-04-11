import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import QrDetails from './pages/QrDetails/QrDetails';
import LoginPage from './pages/Login/LoginPage';
import CallbackPage from './pages/CallbackPage';
import LanguageUpdate from './pages/LanguageUpdate/LanguageUpdate';
import TransactionReports from './pages/TransactionReports/TransactionReports';
import HelpSupport from './pages/HelpSupport/HelpSupport';
import { useAuth } from './auth/useAuth';
import './App.css'; // keeping this for arbitrary overrides but currently unused

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public login page */}
        <Route path="/" element={<LoginPage />} />

        {/* Callback endpoint handled by Authentik redirect */}
        <Route path="/redirected" element={<CallbackPage />} />

        {/* Protected Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Protected QR Details */}
        <Route 
          path="/qr-details" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <QrDetails />
              </MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Protected Transaction Reports */}
        <Route 
          path="/transaction-reports" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <TransactionReports />
              </MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Protected Language Update */}
        <Route 
          path="/language-update" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <LanguageUpdate />
              </MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Protected Help & Support */}
        <Route 
          path="/help-support" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <HelpSupport />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
