import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileRouter from "../../../components/homeworkReg/profileRouter";
import User from "../../../components/homeworkReg/user";

import s from "./usersPage.module.scss";

const UsersPage = ({ users, friends }) => {
  const user = useSelector((state) => state.user);
  const usersAll = useSelector((state) => state.users);
  const howManyFriends = users.length <= 0;
  return (
    <>
      <ProfileRouter />
      <div className={s.users}>
        <div className={s.container}>
          <div className={s.users__title}>{friends ? "Friends" : "Users"}</div>
          {howManyFriends || (
            <>
              {usersAll.length <= 0 || (
                <>
                  <div className={s.users__list}>
                    {friends
                      ? usersAll.map((u) =>
                          users.map((f) =>
                            Number(f) === Number(u.id) ? (
                              <div key={f}>
                                  <User
                                    id={u.id}
                                    img={u.avatar}
                                    name={u.name}
                                    email={u.email}
                                  />
                              </div>
                            ) : null
                          )
                        )
                      : users.map((u) => (
                          <div key={u.id}>
                            {user.id === u.id ? (
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
                            )}
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
