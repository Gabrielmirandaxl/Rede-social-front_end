import React,{useState, useEffect, createContext} from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

  const [token, setToken] = useState(null)
  const [posts, setPosts] = useState([])
  const [like, setLike] = useState()
 console.log(posts)

  useEffect(() => {

    
      const storageToken = localStorage.getItem("token")
  
      if(storageToken){
        setToken(storageToken)
      }
    

   
  }, [])

  return (
    <AuthContext.Provider value={{token, setToken, signed: !!token, posts, setPosts, like, setLike}}>
      {children}
    </AuthContext.Provider>
  )
}