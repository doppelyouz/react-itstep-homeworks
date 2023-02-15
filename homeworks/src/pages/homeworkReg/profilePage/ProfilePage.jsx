import React, {useState, useEffect}  from 'react'
import axios from 'axios';

import avatar from '../../../images/defAvatar.jpg';
import { Link } from 'react-router-dom';

import { signOut } from '../../../store/userSlice';

import {useSelector, useDispatch} from 'react-redux';

import './ProfilePage.scss'
import ProfileRouter from '../../../components/homeworkReg/profileRouter';

const endpoint = 'http://localhost:3001/';

const ProfilePage = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const signOutFunc = () => {
    dispatch(signOut());
  }

  const [posts, setPosts] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
          const result = await axios(endpoint + 'posts');
          setPosts(result.data);
      };
      fetchData();
  }, []);

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
            <div className="profile__posts_grid">
            {
                posts.map((post) => {
                if(post.user.id === user.id) {
                       return <Link to={"/posts/" + post.id} key={post.id}>
                            <li className="grid__item">
                                <img src={post.img} alt="postImage" />
                                <div className="post__userName">{post.userName}</div>
                                <div className="post__title">{post.title}</div>
                            </li>
                        </Link>
                  }
              })
            }
              </div>
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