import React,{useState, useEffect, createContext} from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

  const [token, setToken] = useState(null)
  console.log(token)

  useEffect(() => {

    
      const storageToken = localStorage.getItem("token")
  
      if(storageToken){
        setToken(storageToken)
      }
    

   
  }, [])

  return (
    <AuthContext.Provider value={{token, setToken, signed: !!token}}>
      {children}
    </AuthContext.Provider>
  )
}