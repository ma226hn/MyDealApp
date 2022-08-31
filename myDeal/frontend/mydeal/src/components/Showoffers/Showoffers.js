import React, { useState,useEffect } from "react";
import Offer from "../Offers/Offer";
import Error from '../Error/Error';
import './Showoffers.css'

export default function Showoffers (props){
 // container to show aLL INCOMING offers
const [data,setData] = useState ([])
const [ errorMessage,setErrorMessage] =useState('')
    useEffect(()=>{
 
        async function getoffers(){
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
           
       const res= await  fetch('https://cscloud8-19.lnu.se/my-deal/api/v1/offers/offers/incomingOffers',options)
        let response = await res.json()
        console.log(response)
        console.log(res.status)
       if (res.status === 200)
       {
        response = response.reverse()
        console.log(response)
       setData(response)
       console.log(response)
       setErrorMessage ('')
     
       }
       else if (res.status === 401) {
         setErrorMessage(' you do not have the permission try to logging in again')
       } 
       else 
       {
        setErrorMessage(' some thing went wrong try later ') 
       }
      
      
          }catch{
           setErrorMessage('Probem in  connection')
           
          }}
       
      
        getoffers()
      
      },[])
      
    const offers =  (data.length !== 0 ) ? data.map(offer => 
        <Offer key={offer.id} data = {offer}  sendMessage= {props.sendMessage} />) : <p className="noOffers"> No offers to show !!! </p>
      console.log(offers)
    return (
        <div className='showoffers'>
            {(errorMessage!=='') ?<Error message= {errorMessage}/> :
             <div >
            {offers}
            </div>}
        </div>
    )
}
