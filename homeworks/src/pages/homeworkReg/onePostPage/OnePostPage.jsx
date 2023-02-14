import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import devAvatar from '../../../images/defAvatar.jpg';

import ProfileRouter from '../../../components/homeworkReg/profileRouter';

import s from './onePostPage.module.scss';

const endpoint = 'http://localhost:3001/';

const OnePostPage = () => {
  const  { id } = useParams();  
  const user = useSelector((state) => state.user)
  
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  useEffect(() => {
      const fetchData = async () => {
          const result = await axios(endpoint + 'posts');
          setPosts(result.data);
      };
      fetchData();
      const post = posts.find(p => p.id === id);
      setPost(post);
  }, []);
  return (
    <>
      <ProfileRouter />
      <div className={s.onePost}>
        <div className={s.onePost__container}>
          <div className={s.onePost__title}>{post?.title}</div>
          <div className={s.onePost__info}>
            {post?.img ? <img src={post.img} alt="postImage" className={s.onePost__image} /> : <img src={devAvatar} alt="postImage" className={s.onePost__image} /> }
            <div className={s.onePost__desc}>
              {post?.text}
            </div>
          </div>
          <div className={s.onePost__profile}>
            <img src={user.avatar} alt="userAvatar"  className={s.onePost__profile_avatar}/>
            <div className={s.onePost__profile_name}>{user.name}</div>
          </div>
          <div className={s.onePost__settings}>
            <button className={s.onePost__delete}>Delete</button>
            <button className={s.onePost__edit}>Edit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default OnePostPage