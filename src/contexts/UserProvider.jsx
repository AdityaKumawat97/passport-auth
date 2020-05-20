import React, { createContext, useState, useEffect } from 'react'

const context = createContext(null)


const UserProvider = () => {
    const [user, setUser] = useState({})

    useEffect(()=>{
        fetch('/user')
            .then(res=>res.json())
            .then(res=>setUser(res))
            .catch(err=>{
                console.log(err)
            })
    }, [])

    return(
        <context.Provider value={user}>
        </context.Provider>
    )
}
export default UserProvider