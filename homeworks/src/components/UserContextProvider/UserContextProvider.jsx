import React, {useState, useCallback, useMemo} from 'react'

import UserContext from '../../context';

const UserContextProvider = ({children}) => {
    const localData = JSON.parse(localStorage.getItem("User") || null);
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
    },[setUser])
    
    const changeAvatar = useCallback((avatar) => {
        setUser({
            ...user,
            avatar
        })
    },[setUser])
    
    const changeName = useCallback((name) => {
        setUser({
            ...user,
            name
        })
    },[setUser])

    const changeDescription = useCallback((description) => {
        setUser({
            ...user,
            description
        })
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