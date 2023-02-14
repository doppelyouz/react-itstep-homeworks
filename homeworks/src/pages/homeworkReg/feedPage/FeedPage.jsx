import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

import ProfileRouter from '../../../components/homeworkReg/profileRouter';

import s from './feedPage.module.scss'

const endpoint = 'http://localhost:3001/';

const FeedPage = () => {
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
      <div className={s.feed}>
        <div className={s.feed__content}>
          <div className={s.feed__title}>Recent posts</div>
          <Link to="/create">
            <button className={s.feed__add}>Add new post</button>
          </Link>
          <div className={s.feed__posts}>
            <ul className={s.feed__posts_grid}>
              {
                posts.map((post) => 
                <Link to={"/posts/" + post.id} key={post.id}>
                    <li className={s.grid__item}>
                        <img src={post.img} alt="postImage" />
                        <div className={s.post__userName}>{post.userName}</div>
                        <div className={s.post__title}>{post.title}</div>
                    </li>
                </Link>
                )
              }
            </ul>
          </div>
          <div className={s.feed__pagination}>
            <button>
              Prev
            </button>
            <button>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedPage