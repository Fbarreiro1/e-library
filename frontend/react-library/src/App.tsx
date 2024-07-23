import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage';
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export const App = () => {
  const history = useHistory();

  // Define styles for the Authenticator buttons
  const buttonStyles = {
    backgroundColor: 'green',
    border: 'none',
    color: 'white',
    fontSize: '0.8rem',
    padding: '5px 10px',
    margin: '20px',
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchBooksPage />
          </Route>
          <Route path='/reviewlist/:bookId'>
            <ReviewListPage />
          </Route>
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage />
          </Route>
          <div style={{ marginTop: '50px' }}> {/* Ajusta el valor según sea necesario */}
            <Authenticator>
              {({ signOut }) => (
                <main>
                  <header className='App-header'>
                    <Route path='/login'>
                      <Redirect to='/home' />
                    </Route>
                    <button 
                      onClick={signOut} 
                      style={buttonStyles} // Aplicar estilos en línea
                    >
                      Sign Out
                    </button>
                  </header>
                </main>
              )}
            </Authenticator>
          </div>
          <Route path='/shelf'>
            <ShelfPage />
          </Route>
          <Route path='/messages'>
            <MessagesPage />
          </Route>
          <Route path='/admin'>
            <ManageLibraryPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default withAuthenticator(App);
