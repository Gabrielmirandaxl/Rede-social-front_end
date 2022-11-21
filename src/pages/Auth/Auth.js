import React,{useState, useContext} from 'react'
import { Navigate } from 'react-router-dom'

//context
import { AuthContext } from '../../context/AtuhContext'
//components
import FormLogin from '../../components/formLogin/FormLogin'
import FormRegister from '../../components/formRegister/FormRegister'

//images
import planeta from '../../images/fluent-mdl2_world.png'
import UserImage from '../../images/undraw_login_re_4vu2 1.png'

//css
import './Auth.css'

const Auth = () =>{

 const [options, setOptions] = useState("")
 const {signed} = useContext(AuthContext)

 const handleOptions = (option) =>{
  setOptions(option)

  if(option === "login"){
    document.querySelector(".sign-in").classList.add("click")
    document.querySelector(".sign-up").classList.remove("click")
  }
  else{
    document.querySelector(".sign-up").classList.add("click")
  document.querySelector(".sign-in").classList.remove("click")
  }
  
  
 }

  return(
    <>

     {signed ? <Navigate to="/" replace={true}/> :  <section className='container'>

<div className='divs'>
   
    <div className='welcome'>

       <div className='message'>
        <img src={planeta} alt="world" />
        <h2>Welcome a new world</h2>
       </div>

       <div className='sign'>
          <img src={UserImage} alt="sign" />
       </div>

    </div>

    <div className='forms'>

      <div className='options'>
         <button className={"sign-in"} onClick={() => handleOptions("login")}>Sign in</button>
         <button className={"sign-up"} onClick={() => handleOptions("register")}>Sing up</button>
      </div>

      {options === "login" ? <FormLogin/> : <FormRegister/>}

    </div>

</div>

</section>}
     
    </>
  )
}

export default Auth