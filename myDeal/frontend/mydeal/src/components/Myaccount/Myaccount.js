import React from 'react';
import { useState,useEffect} from 'react';
import { Navigate } from 'react-router';
import Product from '../Product/Product';
import Offer from '../Offers/Offer';
import './Myaccount.css'
// my account to se the user products, sent offer , change email and password,
export default function Myaccount (props)
{
   const [message,setMessage] = useState('')
   

 
   const [logOut,setLogout] = useState(false)

    const [changePassword,setChangePassword] = useState(false)
    const [changeEmail,setChangeEmail] = useState(true)
    const [products,setproducts] = useState([])
    const [showProduct,setShowProduct] = useState(false)
    const [showoffers,setShowoffers] = useState(false)
    
    const [offers,setOffers] = useState([])
    const [data,setData] = useState({})
    function onChang(event){
        const {value, name}= event.target
        setData( {[name]:value})
      console.log(data)
       

    }
    useEffect (()=>{
        showmyoffers()
        showmyproduct()
        // eslint-disable-next-line
    },[props.sendMessage])

  // git all offers for the user
async function  showmyoffers (){
    try{
         
        let options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
    'Authorization':  `Bearer ${sessionStorage.getItem('token')}`,
              'Accept-Encoding': 'gzip, deflate, br'

            },
          
            
          }
         
        const res= await  fetch('https://cscloud8-19.lnu.se/my-deal/api/v1/offers/offers',options)
         let response = await res.json()
         console.log(res.status)
        if (res.status === 200)
        {
         response = response.reverse()
         console.log(response)

        setOffers(response.map(data => 
          <Offer  key={data.id} data = {data} sendMessage={props.sendMessage} />) )
        console.log(offers)
       
        }
        else {
          setMessage('some thing went wrong try logging in again')
        } 
       
       
           }catch{
            
               setMessage('some thing went wrong try again')
           }
}
 // get all products and filter the products in which the user is the owner.   
    async function showmyproduct(){
        try{
         
     
         
     const res= await  fetch('https://cscloud8-19.lnu.se/my-deal/api/v1/sources/sources/')
      let response = await res.json()
      console.log(res.status)
     if (res.status === 200)
     {
      response = response.reverse()
      console.log(response)
      response = response.filter ( source => source.ownerId === JSON.parse(sessionStorage.getItem('user')).id)

      console.log(response)
     setproducts(response.map(data => 
        <Product key={data.id} data = {data}  sendMessage= {props.sendMessage} />) )
     console.log(products)
    
     }
     else {
       setMessage('some thing went wrong try logging in again')
     } 
    
    
        }catch{
         
            setMessage('some thing went wrong try again')
        }}
        // to ccheck if that a vaild email or not
   async function handleChangeEmail (){
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( re.test(data.email) ) {
       
   
       try {
        console.log(JSON.stringify(data.email))
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
      'Authorization':  `Bearer ${sessionStorage.getItem('token')}`,
                'Accept-Encoding': 'gzip, deflate, br'
            },
            body: JSON.stringify(data)
           
            
          }
      
         
         
          const res = await fetch (`https://cscloud8-19.lnu.se/my-deal/api/v1/auth/${JSON.parse(sessionStorage.getItem('user')).id}`, options)
       console.log(res.status)
          if (res.status === 204) {
         
    
       setData('')
        props.sendMessage('The email has been changed')
           setMessage('The email has been changed')
            let user = sessionStorage.getItem('user')
            user = JSON.parse(user)
            user= {...user, email : data.email}
            console.log(user)
           
            sessionStorage.setItem('user',JSON.stringify(user)) 
            console.log(sessionStorage.getItem('user'))
    
        }
        else {
            setMessage('some thing went wrong try logging in again and try')
         }
    } catch (err) {
         
            setMessage ('Some thing went wrong try again')
            
        }}
        else
        setMessage ('Enter a valid email')
    }

    async function handleChangePassword (){
        try {
         console.log(JSON.stringify(data.email))
         let options = {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
                 'Accept': '*/*',
       'Authorization':  `Bearer ${sessionStorage.getItem('token')}`,
                 'Accept-Encoding': 'gzip, deflate, br'
             },
             body: JSON.stringify(data)
            
             
           }
       
          
          
           const res = await fetch (`https://cscloud8-19.lnu.se/my-deal/api/v1/auth/${JSON.parse(sessionStorage.getItem('user')).id}`, options)
        console.log(res.status)
           if (res.status === 204) {
          
     
        setData('')
         props.sendMessage('The password has been changed you should log in again')
            setMessage('The password has been changed you should log in again')
             setTimeout(() => {
                 setLogout(true)
                props.logedout()
             }, 4000);
     
         }
         else {
            setMessage('some thing went wrong try logging  in again and try')
         }
        } catch (err) {
          
             setMessage ('Some thing went wrong try again')
             
         }
     }
    return (
        <div className='myaccount'>
            <ul className='myaccount-ul'>
                <li className= {changeEmail ? 'active' : ''}>
                <button className='ul-button' onClick={()=> {
                     setMessage('')
                setChangePassword(false)
                setChangeEmail(true)
                setShowProduct(false)
                setShowoffers(false)
                }}> Change your email</button>
                </li>
                <li  className= {changePassword ? 'active' : ''}>
                <button className='ul-button'  onClick={()=> {
                     setMessage('')
                setChangePassword(true)
                setChangeEmail(false)
                setShowProduct(false)
                setShowoffers(false)
                }}> Change your passWord</button>   
                </li>
                <li className= {showProduct ? 'active' : ''}>
                <button className='ul-button'  onClick={()=> {
                     setMessage('')
                setChangePassword(false)
                setChangeEmail(false)
                setShowProduct(true)
                setShowoffers(false)
               
                }}> MY Product</button>
                </li>
                <li className= {showoffers ? 'active' : ''}>
                <button className='ul-button'  onClick={()=> {
                    setMessage('')
                setChangePassword(false)
                setChangeEmail(false)
                setShowProduct(false)
                setShowoffers(true)
               
                }}> Sent Offers</button> 
                </li>


            </ul>
            {showoffers && <div className='offers-div' > {offers} <p className='p-message'  > {(offers.length === 0) ? 'No offers to show':''}</p></div>}
               
               {showProduct && <div className='products-div' >{products} <p className='p-message' > {(products.length === 0) ? 'No products to show':''}</p> </div> }
            <div className='container'>
             {changeEmail &&<div className='active'> 
                  <h2> Insert your new email</h2>
                  <p style={{color:'blue'}}> {message}</p>
                  <input type="email" name = "email" value={data.email? data.email:''} placeholder = " Insert your email" style={{width : '400px'}} onChange = {onChang} ></input>
                  <button className='myacccount-button'  onClick={handleChangeEmail}> Change email</button>
                 
                 </div>}
           {changePassword &&  <div className='active'> <h2> Insert your new password</h2>
                  <p style={{color:'blue'}}> {message}</p>
                  <input type="text" name = "password" value={data.password? data.password:''} placeholder = " Inser a new password" style={{width : '400px'}} onChange = {onChang} ></input>
                  <button className='myacccount-button'  onClick={handleChangePassword}> Change password</button>
                 {logOut && <Navigate to = '/' />} </div>}
                 </div>
           
           
        </div>
    )
}