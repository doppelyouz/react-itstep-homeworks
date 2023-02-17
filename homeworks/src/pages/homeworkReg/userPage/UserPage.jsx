import React, { useState, useEffect } from "react";

import ProfileRouter from "../../../components/homeworkReg/profileRouter";
import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getUserById, changeData } from "../../../store/userSlice";

import "./userPage.module.scss";

const UserPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, userById } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  const [friend, setFriend] = useState(null);
  const [hasPosts, setHasPosts] = useState(false);

  useEffect(() => {
    dispatch(getUserById(id));
    user.friends.find((friend) => {
      if (Number(friend) === Number(id)) {
        setFriend(true);
      }
    });
  }, [dispatch, id, user.friends]);

  useEffect(() => {
    posts.find((post) => {
      if (Number(post.user) === Number(id)) {
        setHasPosts(true);
      }
    });
  }, [id, posts]);

  const switchFriend = () => {
    if (!friend) {
      dispatch(changeData({ ...user, friends: [...user.friends, id] }));
      setFriend(true);
    } else {
      const friends = user.friends.filter((friend) => friend !== id);
      dispatch(changeData({ ...user, friends }));
      setFriend(false);
    }
  };

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
                  {userById?.name ? (
                    userById?.name
                  ) : (
                    <h3>He doesn't have a nickname</h3>
                  )}
                </div>
                <div className="profile__email">{user.email}</div>
                <div className="profile__description">{user.description}</div>
                <button className="profile__follow" onClick={switchFriend}>
                  {friend ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          </div>
          {hasPosts && (
            <>
              <div className="profile__posts">
                <div className="profile__posts_grid">
                  {posts.map((post) => {
                    if (Number(post.user) === Number(id)) {
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
                            <div className="post__userName">
                              {userById.name}
                            </div>
                            <div className="post__title">{post.title}</div>
                          </Link>
                        </div>
                      );
                    }
                  })}
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

export default UserPage;
