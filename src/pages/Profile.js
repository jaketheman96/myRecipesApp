import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/header/Header';

function Profile() {
  const user = JSON.parse(localStorage.user);
  const history = useHistory();

  return (
    <div>
      <Header />
      <div>
        <h1 data-testid="profile-email">{ user.email }</h1>
        <br />
        <br />
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes

        </button>
        <br />
        <br />
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes

        </button>
        <br />
        <br />
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            window.localStorage.clear();
            history.push('/');
          } }
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
