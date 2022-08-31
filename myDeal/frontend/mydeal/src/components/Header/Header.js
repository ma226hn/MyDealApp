import React from 'react';
import './Header.css';
export default function Header (props)
{
   
     
    return (
        <div className='header'>
           <div> 
               <img src='logo192.png' alt='kjkk'/>
            </div>
            <ul className='header-nav'>
                <li>
                <a href="/" className='link'>Home</a>   
                </li>
                <li> 
              {(props.logined)? <a  href="/" className='alink' onClick={props.logedout} > Logout </a> : <a href="/login"className='link' >Log in</a>   }
                </li>
                 <li>
                { !(props.logined) && <a href="/rigester" className='link' >Rigester</a> }  
                </li>
                 <li>
               {(props.logined)&& <a href="/myaccount" className='link' >My Account</a> }  
                </li>
                 <li>
                 {(props.logined)&& <a href="/showoffers" className='link' > New Offers</a> }  
                </li>
            </ul>
          
        </div>
   )
}