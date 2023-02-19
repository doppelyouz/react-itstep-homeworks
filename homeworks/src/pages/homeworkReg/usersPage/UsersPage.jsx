import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProfileRouter from "../../../components/homeworkReg/profileRouter";
import User from "../../../components/homeworkReg/user";
import { getUsers } from "../../../store/userSlice";

import s from "./usersPage.module.scss";

const UsersPage = ({friendsPage}) => {
  const {user, users} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [friends, setFriends] = useState([]);
  
  const howManyFriends = friends.length <= 0;

  useEffect(() => {
    dispatch(getUsers);
    const friends = user.friends.map(friend => users.find(user => Number(user.id) === Number(friend)));
    setFriends(friends);
  }, [dispatch, user.friends, users]);


  return (
    <>
      <ProfileRouter />
      <div className={s.users}>
        <div className={s.container}>
          <div className={s.users__title}>{friendsPage ? "Friends" : "Users"}</div>
          {(howManyFriends && friendsPage) || (
            <>
              {users.length <= 0 || (
                <>
                  <div className={s.users__list}>
                    {friendsPage
                      ? friends.map((u) => (
                              <div key={u?.id}>
                                  <User
                                    id={u?.id}
                                    img={u?.avatar}
                                    name={u?.name}
                                    email={u?.email}
                                  />
                              </div>
                        ))
                      : users.map(u => (
                          <div key={u.id}>
                            {
                            Number(user.id) === Number(u.id) ? (
                              <Link to="/profile">
                                <User
                                  id={u.id}
                                  img={u.avatar}
                                  name={u.name}
                                  email={u.email}
                                />
                              </Link>
                            ) : (
                                <User
                                  id={u.id}
                                  img={u.avatar}
                                  name={u.name}
                                  email={u.email}
                                />
                            )
                            }
                          </div>
                        ))}
                  </div>
                  <div className={s.users__pagination}>
                    <button className={s.users__pagination_button}>Prev</button>
                    <button className={s.users__pagination_button}>Next</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersPage;
