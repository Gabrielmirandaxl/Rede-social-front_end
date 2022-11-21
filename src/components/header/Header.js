import React,{useContext, useState, useEffect} from 'react'

import "./Header.css"
import { AuthContext } from '../../context/AtuhContext'
import { Link, NavLink, Navigate } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';


const Header = () =>{

const {signed, setToken, setPosts} = useContext(AuthContext)
const [redirect, setRedirect] = useState(false)
const [search, setSearch] = useState("")
const [image, setImage] = useState("")
const [name, setName] = useState("")


const handleLogout = () =>{
   localStorage.removeItem("token")
   setRedirect(true)
   setToken(null)
  
 
}


axios.interceptors.request.use(function(config){
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
  return config
})


useEffect(() =>{
  axios.get("http://localhost:8080/profile")
  .then((response) => {
    const {profileImage, name} = response.data
    setImage(profileImage)
    setName(name)
  console.log(response)
   
  }) 
}, [])


const heandleSearch = (e) =>{
  setSearch(e.target.value)
}

  useEffect(() =>{
    axios.get(`http://localhost:8080/search?q=${search}`)
    .then((response) => setPosts(response.data))
  }, [search])




  return(
    <>
    
    {redirect ? <Navigate to="/auth"/> : ""}
    
    <header className='header'>
      <Link to="/" className='logo'>New<span className='logo2'>World</span></Link>

     {signed ?  <div className='search'>
         
            <BsSearch className='icon-search'/>
              <input 
              type="text"
              name='q' 
              autoComplete='off'
              onChange={(e) => heandleSearch(e)} 
              />
       
        
      </div> : ''}

      <nav className='nav'>
     
     <ul className='list-links'>

         { signed ? <Avatar src={`http://localhost:8080/uploads/${image}`} className="img-user">{name.split("")[0]}</Avatar> : ''}

         { signed ? <NavLink to="/profile" className='li'>Profile</NavLink> :  ""}

         {signed ? <NavLink to="/create" className='li'>Criar post</NavLink> :  ""}

          {signed ? <NavLink onClick={handleLogout} className='logout'>Sair</NavLink> : ''}

         

        

        </ul>
     </nav>
    </header>
    
    </>
  )

}

export default Header