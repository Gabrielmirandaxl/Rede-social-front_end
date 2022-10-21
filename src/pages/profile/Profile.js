import React,{useState, useEffect} from 'react'
import axios from 'axios'
import './Profile.css'

const Profile = () =>{

  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  axios.interceptors.request.use(function(config){
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
  })

  useEffect(() =>{
    axios.get("http://localhost:8080/profile")
    .then((response) => {
      console.log(response.data)
      const {name, email} = response.data
      setName(name)
      setEmail(email)
    }) 
  }, [])

  const handleSubmit = (e) =>{
     e.preventDefault()

     axios.put("http://localhost:8080/updateProfile", {
       name: name,
       password: password,
       profileImage: image
       
     })
     .then((response) => {
      console.log(response)
    
     })

  }

  console.log(image)
  return(
    <>
    <div className='container-profile'>
        <form method='post' onSubmit={handleSubmit}>
          <div className='data-profile'>
               
               <div className='personal-profile'>
                 <label>Foto so usuário</label>
                 <input 
                 type="file"
                 onChange={(e) => setImage(e.target.files)} 
                 />
               </div>

               <div className='personal-profile'>
                 <label>Nome do usuário</label>
                 <input 
                 type="text" 
                 maxLength={8}
                 value={name}
                 onChange={(e) => setName(e.target.value)} 
                 />
               </div>

               <div className='personal-profile'>
                 <label>Email</label>
                 <input 
                 type="email" 
                 value={email}
                 disabled 
                 />
               </div>

               <div className='personal-profile'>
                 <label>Password</label>
                 <input 
                 type="password" 
                 onChange={(e) => setPassword(e.target.value)}
                 />
               </div>

               <div className='button'>
                 <button type='submit'>Atualizar</button>
               </div>

          </div>
        </form>
    </div>
    
    </>
  )
}

export default Profile