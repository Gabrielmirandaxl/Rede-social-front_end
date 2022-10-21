
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import React,{useContext} from 'react'
//pages
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from './pages/profile/Profile'
// context
import { AuthContext } from "./context/AtuhContext";

//components
import Header from "./components/header/Header";

function App() {

  const {signed} = useContext(AuthContext)

  return (
  <>
 
  <Router>
     <Header/>
    <Routes>
      <Route path="/" element={ signed ? <Home/> : ''}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={ signed ? <Profile/> : ''} />
    </Routes>

  </Router>

  </>
  );
}

export default App;
