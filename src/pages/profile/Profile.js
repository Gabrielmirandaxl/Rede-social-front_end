import React,{useState, useEffect} from 'react'
import axios from 'axios'
import './Profile.css'
import Avatar from '@mui/material/Avatar';

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
      const {name, email, profileImage} = response.data
      setImage(profileImage)
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
       
     }, {
      headers: {   
          'Content-Type': 'multipart/form-data', 
      }
     })

     .then((response) => {
      console.log(response)

      
      window.location.reload()
     })

  }

  console.log(image)
  return(
    <>
    <div className='container-profile'>
        <form method='post' onSubmit={handleSubmit}>
          <div className='data-profile'>
               
               <div className='personal-profile'>
                 <label>Foto do usuário</label>
                 
                 <div className='img-profile'>
                  <Avatar src={`http://localhost:8080/uploads/${image}`} className='img'>{name}</Avatar>
                 </div>

                 <input 
                 type="file"
                 onChange={(e) => setImage(e.target.files[0])} 
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