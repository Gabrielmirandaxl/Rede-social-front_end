import React,{useState, useContext} from 'react'
import "./FormRegister.css"
import { AuthContext } from '../../context/AtuhContext'
import Axios from 'axios'
const FormRegister = () =>{
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  console.log({name, email, password, confirmPassword})

   const {setToken, signed} = useContext(AuthContext)
 console.log(signed)
const handleSubmit = (e) =>{
  e.preventDefault()


  if(!name || !email || !password || !confirmPassword){
    alert("Preencha todos os campos")
  }

  if(confirmPassword !== password){
    alert("As senhas não são iguais")
  }

  Axios.post("http://localhost:8080/register", {
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  })
  .then( (response) => {
    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    const {token} = response.data
    console.log(response)
    setToken(token)
    localStorage.setItem("token", token)

   

  })
  .catch( (response) => {
    console.log(response.response.data)
    if(response.response.data.error.includes("existe")){
      alert("Esse email já existe")
    }
  })

}


  return(
    <>
       <div className='container-register'>

<form className='form-register' onSubmit={handleSubmit} method='post'>
  <div className='register'>

  

    <div className='personal-register'>
      <label htmlFor="name">Username</label>
      <input 
      type="text"
      value={name} 
      className='name'
      autoComplete='off' 
      placeholder='Name'
      onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className='personal-register'>
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

    <div className='personal-register'>
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

    <div className='personal-register'>
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input 
      type="password"
      value={confirmPassword}  
      className='confirmPassword' 
      autoComplete='off'
      placeholder='ConfirmPassword'
      onChange={(e) => setConfirmPassword(e.target.value)}  
      />
    </div>
  </div>
 
  <div className='button-register'>
         <button >Sign up</button>
  </div>

</form>

</div>

    </>
  )
}

export default FormRegister