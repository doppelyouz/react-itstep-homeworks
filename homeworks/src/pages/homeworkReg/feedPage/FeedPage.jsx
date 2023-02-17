import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import ProfileRouter from "../../../components/homeworkReg/profileRouter";

import { getPosts } from "../../../store/postsSlice";
import { getUsers } from "../../../store/userSlice";

import s from "./feedPage.module.scss";

const FeedPage = () => {
  const { posts } = useSelector((state) => state.posts);
  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <ProfileRouter />
      <div className={s.feed}>
        <div className={s.feed__content}>
          <div className={s.feed__title}>Recent posts</div>
          <Link to="/create">
            <button className={s.feed__add}>Add new post</button>
          </Link>
          {
          posts.length <= 0 || (
            <>
              <div className={s.feed__posts}>
                <ul className={s.feed__posts_grid}>
                  {
                    posts.map((post) => {
                      const {name} = users.find(user => {
                        if(Number(user.id) === Number(post.user)) {
                          return user; 
                        }
                      })
                      
                      return <div className={s.grid__item} key={post.id}>
                        <Link to={"/posts/" + post.id}>
                          <div className={s.postImg}>
                            <img
                              src={post.img}
                              alt="postImage"
                              className="fill"
                            />
                          </div>
                          <div className={s.post__userName}>
                            {
                              name
                            }
                          </div>
                          <div className={s.post__title}>{post.title}</div>
                        </Link>
                      </div>
                    })}
                </ul>
              </div>
              <div className={s.feed__pagination}>
                <button>Prev</button>
                <button>Next</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FeedPage;
