import React from 'react';
import logoImg from './img/header1.jpg'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom';


import './rigester.css'
export default function Rigester (props)
{ 
  const [message,setMessage] = useState('')
  const {register,handleSubmit, formState:{errors},reset}=  useForm({defaultValues:{
    firstName:"",
    lastName :'',
    username:'',
    email:'',
    password:''

  }})
  const registerOptions = {
     firstName : {required : " first Name is required"},
      lastName : {required : " last Name is required"},
      username : {required : "user is required"},
      password: {
          required: "Password is required",
          minLength: {
            value: 10,
            message: "Password must have at least 10 characters"
          }},
        email: { required: 'Email is required',
      pattern: {
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Please enter a valid email',
      }},
      }
 
 
    const [registerad,SetRegisterad] =useState(false)
   async function submiteValues(data){
        try{
            setMessage('')
        let options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Accept-Encoding': 'gzip, deflate, br'
            },
            body: JSON.stringify(data)
            
          }
          let respons
    
          const res = await fetch("https://cscloud8-19.lnu.se/my-deal/api/v1/auth/register", options)
          respons = await (res.json())
          console.log(respons)
          if (respons.status ===409)
          {
              console.log('lkjkljlkjkljlkj')
            SetRegisterad(() => false)
          if (respons.cause.message.includes("username"))
          {
              setMessage('username is used choose another name')
          }
          else
          {
            setMessage('email is used choose another email') 
          }
                 
        } else 
         {
         
            

            SetRegisterad(() => true)
            console.log(registerad)
            props.succesmessage('you are registerad now . log in to enjoy with us')
          }
    
           
      
        } catch (error) {
          SetRegisterad(() => false)
          setMessage('Connection error try again') 
        console.log(error)
         
        } 

    }
    
  
   

        return (
        <div className='rigester'>
     <img src={logoImg} alt='deal and logo'  className='img-register'/>
        <p className='p-register'> Rigester in the website and enjoy with  our wonderfull deals </p>
        <form className='register-form' onSubmit={handleSubmit( submiteValues)}>
            <label> First name : </label>
        <input type="text" placeholder='insert yourfirst name' name="firstName"   {...register('firstName', registerOptions.firstName) }></input>
        <p className="text-danger">
          {errors?.firstName && errors.firstName.message}
        </p>
        
     
        <br/>
        <label> Last name : </label>
        <input type="text" placeholder='insert your second name' name='lastName'   {...register('lastName',registerOptions.lastName)}></input>
        <p className="text-danger">
          {errors?.lastName && errors.lastName.message}
        </p>
        <br/> 
     
        <label> Username : </label>
        <input type="text" placeholder='insert username' name='username' {...register('username',registerOptions.username)}></input>
        <p className="text-danger">
          {errors?.username && errors.username.message}
        </p>
        <br/> 
       

        <label> Email : </label>
        <input type='text' placeholder ='insert your email'name='email'  {...register('email',registerOptions.email)}></input>
        <p className="text-danger">
          {errors?.email && errors.email.message}
        </p>
        <br/>
       
        <label> Password : </label>
        <input type='text' placeholder= 'insert your password' name='password'  {...register('password',registerOptions.password)}></input>
        <p className="text-danger">
          {errors?.password && errors.password.message}

        </p>
        <br/>
   

     <p className="text-danger">{message}</p>
       
        <button className='rigester-button' > Reigester</button>
        <button  className='rigester-button' onClick={(event)=>{ reset()
         event.preventDefault()}} > cancel</button>
       
        <br/>
         <br/>
          <br/>
        </form>

        { ((registerad) && <Navigate to="/login" />) }
        </div>
    )
}