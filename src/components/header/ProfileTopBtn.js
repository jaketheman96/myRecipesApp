import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';

function ProfileTopBtn() {
  const history = useHistory();

  return (
    <input
      type="image"
      data-testid="profile-top-btn"
      src={ profileIcon }
      alt="Profile Icon"
      onClick={ () => history.push('/profile') }
    />

  );
}

export default ProfileTopBtn;
