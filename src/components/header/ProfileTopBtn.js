import React from 'react';
import profileIcon from '../../images/profileIcon.svg';

function ProfileTopBtn() {
  return (
    <button type="button" data-testid="profile-top-btn" src={ profileIcon }>
      <img src={ profileIcon } alt="Profile Icon" />
    </button>
  );
}

export default ProfileTopBtn;
