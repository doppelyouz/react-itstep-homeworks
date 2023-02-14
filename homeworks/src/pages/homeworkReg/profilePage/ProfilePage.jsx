import React  from 'react'

import avatar from '../../../images/defAvatar.jpg';
import { Link } from 'react-router-dom';

import { signOut } from '../../../store/userSlice';

import {useSelector, useDispatch} from 'react-redux';

import './ProfilePage.scss'
import ProfileRouter from '../../../components/homeworkReg/profileRouter';

const ProfilePage = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const signOutFunc = () => {
    dispatch(signOut());
  }
  return (
    <>
    <ProfileRouter />
      <div className='user'>
        <div className='profile'>
          <div className="profile__info">
            <div className="profile__bio">
              <div className="profile__avatar">{user?.avatar ? <img src={user.avatar} alt="avatar" className='avatar yes'/> : <img src={avatar} alt="avatar" className='avatar'/>}</div>
              <div className="profile__personalData">
                <div className="profile__name">{user.name ? user.name : <h3>you don't have a nickname</h3>}</div>
                <div className="profile__email">Hello! {user.email}</div>
                <div className="profile__description">{user.description}</div>
                <button className='profile__follow'>
                  Follow
                </button>
              </div>
            </div>
            <div className="profile__buttons">
              <Link to="/settings" className="btn settings">Settings</Link>
              <button onClick={signOutFunc} className="btn out">Sign out</button>
            </div>
          </div>
          <div className="profile__posts">

          </div>
          <div className="profile__pagination">
            <button className='profile__pagination_button'>
              Prev
            </button>
            <button className='profile__pagination_button'>
              Next
            </button>
          </div>
        </div>
      </div>
      </>
  )
}

export default ProfilePage