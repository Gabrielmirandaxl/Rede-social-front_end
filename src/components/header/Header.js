import React,{useContext, useState, useEffect} from 'react'

import "./Header.css"
import { AuthContext } from '../../context/AtuhContext'
import { Link, Navigate, NavLink } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import axios from 'axios'
import user from './pexels-justin-shaifer-1222271.jpg'

const Header = () =>{

const {signed, setToken} = useContext(AuthContext)
const [redirect, setRedirect] = useState(false)
const [search, setSearch] = useState("")
const [posts, setPosts] = useState([])
const [image, setImage] = useState()

const handleLogout = () =>{
   localStorage.removeItem("token")
   setRedirect(true)
   setToken(null)
   setRedirect(false)
}


axios.interceptors.request.use(function(config){
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
  console.log(config)
  return config
})

useEffect(() =>{
  axios.get("http://localhost:8080/profile")
  .then((response) => {
    console.log(response.data.profile)
    setImage(response.data.profile)
  
   
  }) 
}, [])

const handleSubmitSearch = (e) =>{
   e.preventDefault()

   axios.get(`http://localhost:8080/search?q=${search}`)
   .then((response) => setPosts(response.data))
  
}
console.log(posts)
  return(
    <>
    { redirect && <Navigate to="/login"/> }
    
    <header className='header'>
      <Link to="/" className='logo'>New<span className='logo2'>World</span></Link>

     {signed ?  <div className='search'>
          <form method="post" onSubmit={handleSubmitSearch}>
            <BsSearch className='icon-search'/>
              <input 
              type="text"
              name='q' 
              autoComplete='off'
              onChange={(e) => setSearch(e.target.value)} 
              />
          </form>
      </div> : ''}

      <nav className='nav'>
     
     <ul className='list-links'>

         { signed ? <img src={image} className='img-user'/> : ''}

         { signed ? <NavLink to="/profile" className='li'>Profile</NavLink> :  <NavLink to="/login" className='li'>
            Entrar
          </NavLink>}

         {signed ? <NavLink className='li'>Criar post</NavLink> :  <NavLink to="/register" className='li'>
          Cadastrar
          </NavLink>}

          {signed ? <NavLink onClick={handleLogout} className='logout'>Sair</NavLink> : ''}

         

        

        </ul>
     </nav>
    </header>
    
    </>
  )

}

export default Header