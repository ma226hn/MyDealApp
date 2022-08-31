import React from 'react';
import Imageshow from '../ImageShow/Imageshow';
import imgLogo from './img/logo.png'
import './Offer.css'
// to shoe the offer.
export default function Offer (props)
{ 

const user = JSON.parse(sessionStorage.getItem('user'))?JSON.parse(sessionStorage.getItem('user')):null
const date = props.data.createdAt.split('T')
async function deletOffer(){
    try { let options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
'Authorization':  `Bearer ${sessionStorage.getItem('token')}`,
          'Accept-Encoding': 'gzip, deflate, br'

        },
        
        
      }
const res = await fetch(`https://cscloud8-19.lnu.se/my-deal/api/v1/offers/offers/${props.data.id}`,options)
if(res.status === 204)
{props.sendMessage('the offer has been deleted')
//return <Navigate to = '/' />
}
else if (res.status === 403)
props.sendMessage('you do not have the permission')
else if (res.status === 401)
props.sendMessage(' you should log out and log in again')
else 
props.sendMessage(' some thing went wrong try again later')
console.log(res.status)}
catch (e) {

props.sendMessage(' some thing went wrong try again later')
}
}

    return (
        <div className='Offers'>
         <div className='logo-div'>
             <img src= {imgLogo} alt = '' style={{width :' 12%' , height : '2 %' }}/>
             <h3>{(user.id === props.data.senderId)?'You have send offer for product':'You have recived  an offer for your product'}   <b style={{color : 'blue'}}> {props.data.sourceTitle} </b></h3>
            </div>
            <p style={{color : 'rgb(129, 92, 12)'}}> {props.data.title}</p> 
            <p> {props.data.description}</p>
            <div className='flex-div'>
          <Imageshow images = {props.data.images} />
          <div className='nested-div'>
            <p> <i > City </i>: {props.data.city}</p>
            <p> <i> Type </i>: {props.data.type}</p>
            <p> <i> FOr more information: </i> {props.data.contectMethod.type}:  {props.data.contectMethod.contact}</p>
            <p> <i>From</i> : {props.data.senderName}</p>
            <p>  {date[0]} </p>
       {(user?.id === props.data.senderId) && <button onClick={deletOffer} style={{color: 'red'}}> Delete</button>}
            </div>
            </div>
        </div>
    )
}