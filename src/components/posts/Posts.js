import axios from 'axios'
import React,{useState} from 'react'
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import {AiOutlineComment} from 'react-icons/ai'
import {AiFillLike} from 'react-icons/ai'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const Posts = ({username, image, title, id, likes, comment}) =>{


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [commentUser, setCommentUser] = useState("")
  const [open, setOpen] = useState(false);
  const [openComments, setOpenComments] = useState(false)


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenComment = () => setOpenComments(true);
  const handleCloseComment = () => setOpenComments(false);

  axios.interceptors.request.use(function(config){
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
  })
console.log(comment)
  const handleLike = (id) =>{
     
    axios.put(`http://localhost:8080/likeImage/${id}`)
    .then((response) => {
      console.log(response)

      window.location.reload()
    })
    .catch((response) => {
      if(response.data.erro.includes("curtiu")){
        alert("Você já curtiu essa foto")
      }
    })


  }

   const handleCommentPost = (id) =>{
    
    axios.put(`http://localhost:8080/comment/${id}`, {
      comment: commentUser,
    })
    .then((response) => {
      console.log(response)
      window.location.reload()
    })

   }

 
  return(
    <>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="text-comment">
            Digite alguma coisa
          </Typography>
         <input 
         type="text" 
         name="comment" 
         className='comment-user' 
         onChange={(e) => setCommentUser(e.target.value)}
         />
        
        <Button 
        variant="contained" 
        color="success"
        onClick={() => handleCommentPost(id)}
        >
           Enviar
        </Button>

        </Box>
      </Modal>

        
      <Modal
        open={openComments}
        onClose={handleCloseComment}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="text-comment">
           Comentários:
          </Typography>
          {
            comment.map((item) => {
              return (
                <>
                 <h3 className="text" > {item.name}:  <p>{item.comment}</p></h3>
                </>
              )
            })
          }
        </Box>
      </Modal>

   
      <div className='post'>
             
         <div className='user'>
           
           <Avatar>{username.split("")[0]}</Avatar>

           <h3>{username}</h3>
             
         </div>

          <div className='post-image'>
            <img src={`http://localhost:8080/uploads/${image}`} alt="" />
          </div>

          <div className='actions'>
              <AiFillLike className='like' onClick={() => handleLike(id)}/> <p className='likes'>{likes}</p> <AiOutlineComment className='comment' onClick={handleOpen}/> <p className='commentes' onClick={handleOpenComment} >{comment.length}</p>
          </div>

          <div className='message'>
             <h4>{username}:</h4> <p>{title}</p>
          </div>

      </div>
    </>
  )
}

export default Posts