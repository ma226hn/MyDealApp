import React from 'react';

import { useState } from 'react';
import './ImageShow.css'

// component to show the images. if there is more than one the user can  use option next and prev to se all. 

export default function Imageshow (props)
{
    let [ currientIndex,setCurrientIndex] = useState(0)
    console.log(props.images.length)
    
  
   
    return (
        <div className='images'>
          {(props.images.length === 0) ? < > <p className= "nophoto"> No photo to show </p> </>:
          <>
             <div className='buttons'>
           {   ( (currientIndex < props.images.length-1) && <button className= "next"  onClick={()=> {setCurrientIndex( (prevState)=> { return currientIndex = prevState +1;} )
           }} > </button>) }
          
          { ( (currientIndex > 0) && <button className= "pervious"  onClick={()=> {setCurrientIndex( (prevState)=> { return currientIndex = prevState -1;} )
           }} ></button>) }
          
            
           </div>   
          
          
          {((props.images.length)!== 0) && <img src={props.images[currientIndex]} alt ='product' className='product-image'/>}
           
          </>}
           
               
            </div>

    )
}