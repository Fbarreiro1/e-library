import React, { useState, useEffect } from 'react';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { HistoryPage } from './components/HistoryPage';
import { Loans } from './components/Loans';
import { Redirect } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

export const ShelfPage = () => {
  const [historyClick, setHistoryClick] = useState(false);
  const [authState, setAuthState] = useState<{ username: string; userId: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();
        const { username, userId, signInDetails } = await getCurrentUser();

        // Log the user object to understand its structure
        console.log('User:', username);

        // Check if the session and user data are valid
        if (session && username && userId) {
          setAuthState({
            username: username || 'Unknown',
            userId: userId || 'Unknown'
          });
        } else {
          setAuthState(null);
        }
      } catch (error) {
        console.error('Error fetching auth session or user:', error);
        setAuthState(null);
      }
    };

    checkAuth();
  }, []);

  if (authState === null) {
    // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    return <Redirect to="/login" />;
  }

  return (
    <div className='container'>
      <div className='mt-3'>
        <nav>
          <div className='nav nav-tabs' id='nav-tab' role='tablist'>
            <button onClick={() => setHistoryClick(false)} className='nav-link active' id='nav-loans-tab' data-bs-toggle='tab'
              data-bs-target='#nav-loans' type='button' role='tab' aria-controls='nav-loans'
              aria-selected='true'>
              Loans
            </button>
            <button onClick={() => setHistoryClick(true)} className='nav-link' id='nav-history-tab' data-bs-toggle='tab'
              data-bs-target='#nav-history' type='button' role='tab' aria-controls='nav-history'
              aria-selected='false'>
              Your History
            </button>
          </div>
        </nav>
        <div className='tab-content' id='nav-tabContent'>
          <div className='tab-pane fade show active' id='nav-loans' role='tabpanel'
            aria-labelledby='nav-loans-tab'>
            <Loans />
          </div>
          <div className='tab-pane fade' id='nav-history' role='tabpanel'
            aria-labelledby='nav-history-tab'>
            {historyClick ? <HistoryPage /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}
