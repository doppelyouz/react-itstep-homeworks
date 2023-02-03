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

    const providerValues = useMemo(() => ({
        user, setUser, signIn, signOut
    }), [user, setUser, signIn, signOut])

  return (
    <UserContext.Provider value={providerValues}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider