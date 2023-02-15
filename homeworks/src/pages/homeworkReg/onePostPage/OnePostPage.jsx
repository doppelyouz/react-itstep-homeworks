import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import devAvatar from '../../../images/defAvatar.jpg';
import ProfileRouter from '../../../components/homeworkReg/profileRouter';

import s from './onePostPage.module.scss';

const endpoint = 'http://localhost:3001/';

const OnePostPage = () => {
  const  { id } = useParams();  
  
  const [post, setPost] = useState({});
  useEffect(() => {
    const fetchData = async () => {
        const result = await axios(endpoint + 'posts');
        const post = result.data.find(p => p.id === id);
        setPost(post);
    };
    fetchData();
}, [id]);

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
            <img src={post?.user?.avatar} alt="userAvatar"  className={s.onePost__profile_avatar}/>
            <div className={s.onePost__profile_name}>{post?.user?.email}</div>
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