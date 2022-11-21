import React,{useState} from 'react'
import axios from 'axios'
import './Posts.css'

const Posts = () => {

   const [image, setimage] = useState("")
   const [title, setTitle] = useState("")

   axios.interceptors.request.use(function(config){
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
   })

   const handleSubmit = (e) =>{
    e.preventDefault()

    axios.post("http://localhost:8080/insertImage", {
      title: title,
      image: image,
    }, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      }
    })
    .then((response) => {
      console.log(response)
    })

   }

  return (
    <>
      <section className='post-create'>
       
           <form onSubmit={handleSubmit} method='post' >
              <div className='insert'>
                  

                <div className='data-insert'>
                   <label>
                       Escolha a foto para sua postagem
                   </label>

                   <input 
                   type="file" 
                   className='image'  
                   name='image'
                   onChange={(e) => setimage(e.target.files[0])}
                   />

                </div>

                <div className='data-insert'>
                   <label>
                    Titulo
                   </label>
                   <input 
                   type="text" 
                   className='title' 
                   name='title'
                   value={title}
                   onChange={(e) => setTitle(e.target.value)} 
                   />
                </div>
                
                <div className='button-insert'>
                   <button type='submit'>criar</button>
                </div>

              </div>
           </form>
        
      </section>
    </>
  )
}

export default Posts