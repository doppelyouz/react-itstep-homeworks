import React from "react";
import { Link } from "react-router-dom";

import './posts.scss';

const Posts = ({ posts }) => {
  return (
      <div className="posts">
        <div className="posts_grid">
          {
            posts.map(post => {
                return (
                    <div className="grid__item" key={post.id}>
                        <Link to={"/posts/" + post.id}>
                            <div className="postImg">
                            <img src={post.img} alt="postImage" className="fill" />
                            </div>
                            <div className="post__userName">{post.userName}</div>
                            <div className="post__title">{post.title}</div>
                        </Link>
                    </div>
                )
            })
          }
        </div>
      </div>
  );
};

export default Posts;
