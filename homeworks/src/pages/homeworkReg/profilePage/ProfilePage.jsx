import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "../../../store/userSlice";
import { getPosts } from "../../../store/postsSlice";

import ProfileRouter from "../../../components/homeworkReg/profileRouter";

import "./ProfilePage.scss";

const ProfilePage = () => {
  const {user} = useSelector(state => state.user)
  const {posts} = useSelector(state => state.posts)

  const [havePosts, setHavePosts] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    posts.find((post) => {
      if (Number(post.user) === Number(user.id)) {
        setHavePosts(true);
      }
    });
  }, [posts, user.id])

  const signOutFunc = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <ProfileRouter />
      <div className="user">
        <div className="profile">
          <div className="profile__info">
            <div className="profile__bio">
              <div className="profile__avatar">
                  <img src={user.avatar} alt="avatar" className="avatar" />
              </div>
              <div className="profile__personalData">
                <div className="profile__name">
                  {user.name ? user.name : <h3>you don't have a nickname</h3>}
                </div>
                <div className="profile__email">Hello! {user.email}</div>
                <div className="profile__description">{user.description}</div>
              </div>
            </div>
            <div className="profile__buttons">
              <Link to="/settings" className="btn settings">
                Settings
              </Link>
              <button onClick={signOutFunc} className="btn out">
                Sign out
              </button>
            </div>
          </div>
          {
          havePosts && (
            <>
              <div className="profile__posts">
                <div className="profile__posts_grid">
                  {
                    posts.map((post) => {
                      if (Number(post.user) === Number(user.id)) {
                        return (
                          <div className="grid__item" key={post.id}>
                            <Link to={"/posts/" + post.id}>
                              <div className="postImg">
                                <img
                                  src={post.img}
                                  alt="postImage"
                                  className="fill"
                                />
                              </div>
                              <div className="post__title">{post.title}</div>
                            </Link>
                          </div>
                        );
                      }
                    })
                  }
                </div>
              </div>
              <div className="profile__pagination">
                <button className="profile__pagination_button">Prev</button>
                <button className="profile__pagination_button">Next</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
