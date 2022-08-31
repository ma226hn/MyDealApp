import React from 'react';
import './product.css'
import Imageshow from '../ImageShow/Imageshow';
import logoImg from './img/logo192.png'
// to show the product

export default function Product (props)
{ 
    const user = JSON.parse(sessionStorage.getItem('user'))?JSON.parse(sessionStorage.getItem('user')):null
 
    const date = props.data.createdAt.split('T')
    async function deleteproduct (event)
    {   
         event.preventDefault()
       try { let options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
    'Authorization':  `Bearer ${sessionStorage.getItem('token')}`,
              'Accept-Encoding': 'gzip, deflate, br'

            },
            
            
          }
const res = await fetch(`https://cscloud8-19.lnu.se/my-deal/api/v1/sources/sources/${props.data.id}`,options)
if(res.status === 204)
{props.sendMessage('the product has been deleted')
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
        <div className='product'>
        
            <div className='title'> <img src={logoImg} alt= "logo " /> <p>{props.data.title}</p>  
           </div>
            <div className='product-img'> 
            <Imageshow  images={props.data.images} key={props.data.id}/>
            </div>
            <div className='description'><p> {props.data.description} </p> </div>
            <div className='products-inf'> 
                <ul className='product-ul'>
                    <li> Date:{date[0]}</li>
                    <li> City : {props.data.city}</li>
                    <li> Type: {props.data.type}</li>
                    {(user?.id ===props.data.ownerId)? <li>
                        <a href= '/' className='linkproduct' onClick={deleteproduct}>Delete </a>
                        <a href= {`/Update/${props.data.id}`} className='linkproduct' >Modify</a>
                    </li>: 
                   (user) ? <li> Do you want send offer click here
            <a href={ `/addoffer/${props.data.id}`}> Send offer</a>  </li>: <li> You should  rigester and log in to send offer</li>}
                </ul>
            </div>
            
            </div>

    )
}