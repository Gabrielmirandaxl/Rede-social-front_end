
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import React,{useContext} from 'react'

//pages
import Home from "./pages/home/Home";
import Profile from './pages/profile/Profile'
import Auth from './pages/auth/Auth'
import Posts from './pages/Posts/Posts'

// context
import { AuthContext } from "./context/AtuhContext";

//components
import Header from "./components/header/Header";

function App() {

  const {signed} = useContext(AuthContext)

  return (
  <>
 
  <Router>

    {signed ?  <Header/> : ""}

    <Routes>
      <Route  path="/auth" element={signed ? "" : <Auth/> }/>
      <Route path="/" element={ signed ? <Home/> : ''}/>
      <Route path="/profile" element={ signed ? <Profile/> : ''} />
      <Route path="/create" element={signed ? <Posts/> : ""} />
    </Routes>


l
     </Router>
      </>
  );
}

export default App;
