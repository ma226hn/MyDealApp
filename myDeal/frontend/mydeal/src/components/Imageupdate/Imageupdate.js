import React from "react";
import {HiXCircle} from "react-icons/hi"
export default function Imageupdate(props)

{ 
  
 
// i use this copmonent ro make a choise to the user to delet a image for the product.
   
     return ( 
 <div> 
   <img src= {props.image}   style={{position : 'relative', width : '150px'} } alt = 'products'/>
   <HiXCircle onClick={(e) =>{ e.preventDefault()
    console.log(props.index,'index')
       props.onDelete(props.index) }}  style={{ color: 'red', position : 'absolute'}}/>
       </div>)
    
}