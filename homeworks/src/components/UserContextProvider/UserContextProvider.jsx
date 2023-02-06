import React, {useState, useCallback, useMemo, useEffect} from 'react';

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
        const newData = {...user, email}
        setUser(newData)
        const newUsers = users.map((u) => {
            if(u.id === user.id) {
                return newData;
            }
            return u;
        })
        localStorage.setItem("users", JSON.stringify(newUsers));
        localStorage.setItem("User", JSON.stringify(newData));
    },[user, setUser, users])
    
    const changeAvatar = useCallback((avatar) => {
        const newData = {...user, avatar}
        setUser(newData)
        const newUsers = users.map((u) => {
            if(u.id === user.id) {
                return newData;
            }
            return u;
        })
        localStorage.setItem("users", JSON.stringify(newUsers));
        localStorage.setItem("User", JSON.stringify(newData));
    },[user, setUser, users])
    const changeName = useCallback ((name) => {
        const newData = {...user, name}
        setUser(newData)
        const newUsers = users.map((u) => {
            if(u.id === user.id) {
                return newData;
            }
            return u;
        })
        localStorage.setItem("users", JSON.stringify(newUsers));
        localStorage.setItem("User", JSON.stringify(newData));
    },[user, setUser, users])

    const changeDescription = useCallback((description) => {
        const newData = {...user, description}
        setUser(newData)
        const newUsers = users.map((u) => {
            if(u.id === user.id) {
                return newData;
            }
            return u;
        })
        localStorage.setItem("users", JSON.stringify(newUsers));
        localStorage.setItem("User", JSON.stringify(newData));
    },[user, setUser, users])

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