import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export default function CallbackPage() {
    const { handleCallback } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        handleCallback()
            .then(() => {
                // On successful authentication, navigate to dashboard
                navigate('/dashboard', { replace: true });
            })
            .catch((error) => {
                console.error("Authentication error:", error);
                // Optionally handle error here, e.g., redirect back to login
                navigate('/', { replace: true });
            });
    }, [handleCallback, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2>Authenticating...</h2>
        </div>
    );
}
