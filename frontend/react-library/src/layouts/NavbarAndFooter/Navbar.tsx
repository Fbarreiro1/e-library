import { Link, NavLink } from "react-router-dom";
import { signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {
  const [authState, setAuthState] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setAuthState(user);
      } catch (error) {
        setAuthState(null);
      } finally {
        setLoading(false);
      }
    };

    // Check if authState is null or if a specific route was accessed (e.g., login route)
    if (!authState || window.location.pathname === '/login') {
      checkAuth();
    }
  }, [authState, window.location.pathname]); // Dependencies include authState and pathname

  if (loading) {
    return <SpinnerLoading />;
  }

  const handleLogout = async () => {
    try {
      await signOut();
      setAuthState(null);
      // Redirige a la página de inicio y recarga la página
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const res = async () => {
    try {
      await fetchAuthSession();
    } catch (error) {
      console.error('Error fetching auth session:', error);
    }
  };

  // Verifica si authState tiene el valor esperado
  console.log('authState:', authState);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark' style={{ backgroundColor: '#228B22' }}>
      <div className='container-fluid'>
        <span className='navbar-brand'>E-Library</span>
        <button className='navbar-toggler' type='button'
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown' aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/home'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>Search Books</NavLink>
            </li>
            {authState &&
              <li className='nav-item'>
                <NavLink className='nav-link' to='/shelf' style={{ color: 'white' }}>Shelf</NavLink>
              </li>
            }
            {authState && authState.signInUserSession?.idToken.payload.userType === 'admin' &&
              <li className='nav-item'>
                <NavLink className='nav-link' to='/admin'>Admin</NavLink>
              </li>
            }
          </ul>
          <ul className='navbar-nav ms-auto'>
            {!authState ? (
              <li className='nav-item'>
                <NavLink className='btn btn-outline-light' to='/sign-in'>Sign In</NavLink>
              </li>
            ) : (
              <li className='nav-item'>
                <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
