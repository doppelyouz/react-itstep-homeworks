import React, {useState, useCallback, useMemo} from 'react';

import UserContext from '../../context';

const UserContextProvider = ({children}) => {
    const localDataUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const localData = JSON.parse(localStorage.getItem("User") || null);
    const [users, setUsers] = useState(localDataUsers);
    const [user, setUser] = useState(localData);

    const signIn = useCallback((user) => {
        setUser(user)
    },[setUser])

    const signOut = useCallback(() => {
        setUser(null)
    },[setUser])
    
    const changeEmail = useCallback((email) => {
        setUser({
            ...user,
            email
        })
        localStorage.setItem("User", JSON.stringify(user));
    },[setUser])
    
    const changeAvatar = useCallback((avatar) => {
        setUser({
            ...user,
            avatar
        })
        localStorage.setItem("User", JSON.stringify(user));
    },[setUser])
    
    const changeName = useCallback ((name) => {
        setUser((prev) => ({ ...prev, name}))
        console.log(user);
        const newUsers = users.map((u) => {
            if(u.id === user.id) {
                return user;
            } else {
                return u;
            }
        })
        localStorage.setItem("users", JSON.stringify(newUsers));
        localStorage.setItem("User", JSON.stringify(user));
    },[user])

    const changeDescription = useCallback((description) => {
        setUser({
            ...user,
            description
        })
        localStorage.setItem("User", JSON.stringify(user));
    },[setUser])

    const providerValues = useMemo(() => ({
        user, setUser, signIn, signOut, changeEmail, changeAvatar, changeName, changeDescription
    }), [user, setUser, signIn, signOut, changeEmail, changeAvatar, changeName, changeDescription])

  return (
    <UserContext.Provider value={providerValues}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider