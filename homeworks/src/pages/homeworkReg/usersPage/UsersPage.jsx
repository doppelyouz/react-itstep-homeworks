import React from 'react'
import { Link } from 'react-router-dom';
import ProfileRouter from '../../../components/homeworkReg/profileRouter';
import User from '../../../components/homeworkReg/user';

import s from './usersPage.module.scss';

const UsersPage = ({users, friends}) => {
  return (
    <>
      <ProfileRouter/>
      <div className={s.users}>
        <div className={s.container}>
          <div className={s.users__title}>
            {friends ? "Friends" : "Users"}
          </div>
          <div className={s.users__list}>
            {
              users.map(u =>
                <div>
                  <Link to={/users/ + u.id}>
                    <User img={u.avatar} name={u.name} email={u.email}/>
                  </Link>
                </div>
              )
            }
          </div>
          <div className={s.users__pagination}>
            <button className={s.users__pagination_button}>
              Prev
            </button>
            <button className={s.users__pagination_button}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UsersPage