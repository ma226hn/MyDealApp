import React from "react";
import errorImg from './img/errorImg.png'
import './error.css'
// error form
 export default function Error(props)
 {
     
      return (
           <div className="error-div">
                <p> {props.message}</p>
                

               <img className="errorImg" src={errorImg} alt="" />
        
     </div>)
 }