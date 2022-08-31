import React from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from './components/Home/Home';
import Rigester from './components/Rigester/Rigester';
import Login from './components/Login/Login';
import Myaccount from './components/Myaccount/Myaccount';
import AddOffer from './components/AddOffer/AddOffer';
import { useState } from 'react';
import Update from './components/Update/Update';
import Showoffers from './components/Showoffers/Showoffers';
import './App.css'

import {

  Routes,
  Route,
} from "react-router-dom";
import Addproduct from './components/Addproduct/Addproduct';



function App() {

  const [felLogin, setFelLogin] = useState(false)
  const [temproryMessaage, setTemproryMessage] = useState("")
 
  const [loginData, setloginData] = useState(
    { username: "", password: "" })
    const [logined, setLogined] = useState(()=>{
      return (sessionStorage.getItem('token')!==null)
    })
 
  async function handelLoginSubmitEvent() {
    try {

      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate, br'
        },
        body: JSON.stringify(loginData)
        
      }
      let respons

      const res = await fetch("https://cscloud8-19.lnu.se/my-deal/api/v1/auth/login", options)
      if (res.status === 201) {
        respons = await (res.json())

    
    
        sessionStorage.setItem('token',respons.access_token)
        sessionStorage.setItem('user',JSON.stringify(respons.user)) 
       
       setLogined(true)
        
        setFelLogin(() => false)
        setmessage("you are logged in successfully")
        

      }
      else {
        setFelLogin(true)
      }
    } catch  {
     
      setmessage("problem in net connection")
        
    }

  }
  function changeloginEvent(value, name) {
   
    setloginData(prevloginData => {
      return {
        ...prevloginData,
        [name]: value
      }
    })
  
 
  }

 
  
  function logout() {
     setLogined(false)
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
   setmessage("you are logged out successefully")
    
  }
 
 
 
 
 function setmessage(string)
  { console.log('xxxx')
    
    setTemproryMessage(() =>string)

  setTimeout(() => {
    setTemproryMessage(() => '')
  }, 3000);
    
  }

  return (
    <div className='app'>
     
      <Header logined={logined} logedout={logout} />
       <p id='message'  className={(temproryMessaage !== '') ? 'show': 'hidden' } style={{position : 'fixed' }} >{temproryMessaage}</p>
     
      <div className='main'>
        <Routes >

          <Route index path="/" element={<Home logined={logined} sendMessage={setmessage} />} />

          <Route path="/showoffers" element={<Showoffers  sendMessage={setmessage}/>} />
          <Route path="/login" element={<Login loginSubmit={handelLoginSubmitEvent} logined={logined} onloginDataChange={changeloginEvent} loginData={loginData} fellogning={felLogin} />} />
          <Route path="/rigester" element={<Rigester succesmessage={setmessage} />} />
          <Route path='/myaccount' element={<Myaccount sendMessage={setmessage} logedout={logout} />} />
          <Route path='/addoffer/:id' element={<AddOffer sendMessage={setmessage} />} />
          <Route path='/addprodeuct' element={<Addproduct succesmessage={setmessage} />} />
          <Route path='/update/:id' element={<Update succesmessage={setmessage} />} />
          

        </Routes>
      </div>
      <Footer />

    </div>

  );

}

export default App;
