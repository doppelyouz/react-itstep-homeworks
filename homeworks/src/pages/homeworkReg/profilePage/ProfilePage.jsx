import React  from 'react'

import avatar from './defAvatar.jpg';
import {Link} from 'react-router-dom';

import { signOut } from '../../../store/userSlice';

import {useSelector, useDispatch} from 'react-redux';

import './ProfilePage.scss'

const ProfilePage = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const signOutFunc = () => {
    dispatch(signOut());
  }
  return (
      <div className='user'>
        <div className='profile'>
          <div className="profile__info">
            <div className="profile__avatar">{user?.avatar ? <img src={user.avatar} alt="avatar" className='avatar yes'/> : <img src={avatar} alt="avatar" className='avatar'/>}</div>
            <div className="profile__nameAndEmail">
              <div className="profile__name">{user.name ? user.name : <h3>you don't have a nickname</h3>}</div>
              <div className="profile__email">Hello! {user.email}</div>
              <div className="profile__description">Hello! {user.description}</div>
            </div>
            <div className="profile__buttons">
              <Link to="/settings" className="btn settings">Settings</Link>
              <button onClick={signOutFunc} className="btn out">Sign out</button>
            </div>
          </div>
          <div className="profile__description">
            <div className="profile__description-text word-break">{user.description ? user.description : <h3>you don't have a description</h3>}</div>
          </div>
        </div>
      </div>
  )
}

export default ProfilePage