import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { changeData } from "../../../store/userSlice";

import s from './user.module.scss';

const endpoint = "http://localhost:3001/";

const User = ({id, img, name, email}) => {
  const you = useSelector((state) => state.user);
  const [friend, setFriend] = useState(null);

  const dispatch = useDispatch();

  
  useEffect(() => {
    you.friends.find((f) => {
      if (Number(f) === Number(id)) {
        setFriend(true);
      }
    });
  }, [id, you.friends]);

  const addFriend = () => {

    if (!friend) {
      fetch(endpoint + "users/" + you.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...you,
          friends: [...you.friends, id],
        }),
      });
      dispatch(
        changeData({
          ...you,
          friends: [...you.friends, id],
        })
      );
      setFriend(true);
    } else {
      fetch(endpoint + "users/" + you.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...you,
          friends: you.friends.filter((f) => Number(f) !== Number(id)),
        }),
      });
      dispatch(
        changeData({
          ...you,
          friends: you.friends.filter((f) => Number(f) !== Number(id)),
        })
      );
      setFriend(false);
    }
  };

  return (
    <div className={s.user}>
        <Link to={/users/ + id}  className={s.link}>
          <div className={s.user__image}>
              <img src={img} alt="userImage" className={s.image}/>
          </div>
          <div className={s.user__info}>
              <div className={s.user__name}>{name}</div>
              <div className={s.user__email}>{email}</div>
          </div>
        </Link>
        { Number(you.id) === Number(id) || <button className={s.user__follow} onClick={addFriend}>{friend ? "Unfollow": "Follow"}</button> }
    </div>
  )
}

export default User