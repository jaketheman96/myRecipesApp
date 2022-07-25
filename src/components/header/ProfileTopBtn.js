import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import styles from './styles/ProfileTopBtn.module.css';

function ProfileTopBtn() {
  const history = useHistory();

  return (
    <input
      className={ styles.profile }
      type="image"
      data-testid="profile-top-btn"
      src={ profileIcon }
      alt="Profile Icon"
      onClick={ () => history.push('/profile') }
    />

  );
}

export default ProfileTopBtn;
