import React,{useState, useContext} from 'react'
import { AuthContext } from '../../context/AtuhContext'
import {FaUserCircle} from 'react-icons/fa'
import Axios from 'axios'

//css
import "./Login.css"
import { Navigate } from 'react-router-dom'

const Login = () =>{

  

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 

  const {setToken, signed} = useContext(AuthContext)


  const handleSubmit = (e) =>{
   e.preventDefault()

   Axios.post("http://localhost:8080/login", {
    email: email,
    password: password,
   })
   .then((response) => {
    console.log(response)
    const {token} = response.data
    console.log(response)
    setToken(token)
    localStorage.setItem("token", token)
    
    
   })
   .catch((response) => {
     console.log(response)
   })

  }


 

  return(
    <>
   

         { signed ? <Navigate to="/" /> :  <div className='container-login'>

<form className='form-login' onSubmit={handleSubmit}  method='post'>
  <div className='login'>

    <div className='user-login'>
      <FaUserCircle className='icon-user'/>
      <h2>Login</h2>
    </div>

      <div className='personal-login'>
        <label htmlFor="email">Email</label>
        <input 
        type="email"
        value={email} 
        className='email' 
        autoComplete='off'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        
        />
      </div>

      <div className='personal-login'>
        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        value={password}
        className='password' 
        autoComplete='off'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}  
        
        />
      </div>

      <div className='button-login'>
          <button>Sign in</button>
      </div>

  </div>

</form>

</div>}
       
    </>
  )
}

export default Login