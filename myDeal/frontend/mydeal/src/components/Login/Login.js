import React from 'react';

import './login.css'
import { Navigate } from 'react-router-dom';

export default function Login (props)
{
    

    function changeEvent(event)
    {
      
        const {value,name} = event.target
        props.onloginDataChange(value,name)
    }

    return (
        <div className='login'>
            <form onSubmit={(event)=> { event.preventDefault()
                props.loginSubmit()}} >
            <p> Insert your name and the password </p>
           
            <p> User name </p>
            <input type="text" id='Name-input' name='username' 
            onChange={changeEvent} value= {props.loginData.username} ></input>
            <p>
                Password
            </p>
            <input type="password" id='passowrd-input' name='password'
             placeholder=' insert password'  onChange={changeEvent} value={props.loginData.password}   />
            <br/>
            { ((props.fellogning )&& (<p id='felmessage'> Wrong name or password try again</p>))}
            <br/>
            { (props.logined &&<Navigate to="/" />) }
            <br/>
            <button  className='login-send' disabled= {((props.loginData.password==='')||(props.loginData.username===''))}> Log in </button>
            </form>
        </div>
    )
}