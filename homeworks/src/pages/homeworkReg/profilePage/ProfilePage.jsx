import React, { useContext }  from 'react'

import UserContext from '../../../context';

import './ProfilePage.scss'

const ProfilePage = () => {
  const {user, signOut} = useContext(UserContext);
  return (
    <div className='user'>
      <div className='email'>{user.email}</div>
      <button onClick={signOut} className="out">sign out</button>
    </div>
  )
}

export default ProfilePage