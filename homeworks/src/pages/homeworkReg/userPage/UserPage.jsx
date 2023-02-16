import React, {useState, useEffect, useCallback, useMemo} from 'react'
import axios from 'axios';
import defAvatar from '../../../images/defAvatar.jpg';
import ProfileRouter from '../../../components/homeworkReg/profileRouter';
import { Link, useParams } from 'react-router-dom';

import './userPage.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { changeData } from '../../../store/userSlice';

const endpoint = 'http://localhost:3001/';

const UserPage = () => {
    const {id} = useParams();

    const dispatch = useDispatch();

    const you = useSelector(state => state.user);

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [friend, setFriend] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(endpoint + 'posts');
            const user = await axios(endpoint + 'users/' + id);
            setUser(user.data);
            setPosts(result.data);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
      you.friends.find(f => {
        if(Number(f) === Number(id)) {
          setFriend(true)
        }
      })
    }, [id, you.friends])

    const addFriend = () => {
      if(!friend) {
        fetch(endpoint + 'users/' + you.id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              ...you,
              friends: [...you.friends, user.id]
          })
        })
        dispatch(changeData({
            ...you,
            friends: [...you.friends, user.id]
        }))
        setFriend(true)
      } else {
        fetch(endpoint + 'users/' + you.id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              ...you,
              friends: you.friends.filter(f => Number(f) !== Number(id))
          })
        })
        dispatch(changeData({
          ...you,
          friends: you.friends.filter(f => Number(f) !== Number(id))
      }))
        setFriend(false)
      }
    }

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
                <button className='profile__follow' onClick={addFriend}>
                  {friend ? "Unfollow" : "Follow"}
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
                          <div className="grid__item" key={post.id}>
                              <Link to={"/posts/" + post.id}>
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