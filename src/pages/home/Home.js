import React,{useState, useContext} from 'react'

import {BsSearch} from 'react-icons/bs'
import axios from 'axios'
import { AuthContext } from '../../context/AtuhContext'

//components
import Posts from '../../components/posts/Posts'

//css
import "./Home.css"

const Home = () =>{
  
  const {posts} = useContext(AuthContext)

  console.log(posts)
  return(    
  <>
   <section className='home-page'>
    

       <div className='posts-users'>
           {posts.map((post, key) =>{
            return(
              <>
               <Posts key={key}
               username={post.username}
               image={post.image}
               title={post.title}
               id={post._id}
               likes={post.likes.length}
               comment={post.commentes}
               />
              </>
            )
           })}
       </div>
   
   </section>
  </>
  )
}

export default Home