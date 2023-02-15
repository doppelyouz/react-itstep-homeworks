import React, {useState, useEffect} from 'react'
import axios from 'axios';

import defAvatar from '../../../images/defAvatar.jpg';
import ProfileRouter from '../../../components/homeworkReg/profileRouter';
import { Link, useParams } from 'react-router-dom';

import './userPage.module.scss'

const endpoint = 'http://localhost:3001/';

const UserPage = () => {
    const {id} = useParams();

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(endpoint + 'posts');
            const user = await axios(endpoint + 'users/' + id);
            setUser(user.data);
            console.log(user);
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
              <div className="profile__avatar">{user.avatar ? <img src={user.avatar} alt="avatar" className='avatar yes'/> : <img src={defAvatar} alt="avatar" className='avatar'/>}</div>
              <div className="profile__personalData">
                <div className="profile__name">{user.name ? user.name : <h3>He doesn't have a nickname</h3>}</div>
                <div className="profile__email">{user.email}</div>
                <div className="profile__description">{user.description}</div>
                <button className='profile__follow'>
                  Follow
                </button>
              </div>
            </div>
          </div>
          <div className="profile__posts">
            <div className="profile__posts_grid">
            {
                posts.map((post) => {
                if(Number(post.user.id) === Number(id)) {
                       return (
                          <div className="grid__item">
                              <Link to={"/posts/" + post.id} key={post.id}>
                                <div className="postImg">
                                  <img src={post.img} alt="postImage" className="fill"/>
                                </div>
                                <div className="post__userName">{post.user.name}</div>
                                <div className="post__title">{post.title}</div>
                              </Link>
                          </div>
                       )
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

export default UserPage