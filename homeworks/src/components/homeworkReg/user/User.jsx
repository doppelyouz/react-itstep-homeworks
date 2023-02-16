import React from 'react'

import s from './user.module.scss';

const User = ({img, name, email}) => {
  return (
    <div className={s.user}>
        <div className={s.user__image}>
            <img src={img} alt="userImage" className={s.image}/>
        </div>
        <div className={s.user__info}>
            <div className={s.user__name}>{name}</div>
            <div className={s.user__email}>{email}</div>
        </div>
    </div>
  )
}

export default User