import React, { useEffect, useState } from 'react';
import Showproduct from '../Showproduct/Showproduct';
import log1 from './img/logo192.png'
import {BiFilterAlt} from "react-icons/bi"
import './Home.css'

import Error from '../Error/Error';
export default function Home (props)
{
const [filteroption,setFilteroption] = useState({})
const [filterData,setFilterData] = useState([])
const [filter,setFilter] = useState(false)
 
 
const [dataProducts,setDataProducts] = useState([])
const [ errorMessage,setErrorMessage] =useState('')

useEffect(()=>{
// get the products
  async function getproducts(){
    try{
     
 
     
 const res= await  fetch('https://cscloud8-19.lnu.se/my-deal/api/v1/sources/sources/')
  let response = await res.json()
  console.log(res.status)
 if (res.status === 200)
 {
  response = response.reverse()
  console.log(response)
 setDataProducts(response)
 console.log(response)
 setErrorMessage('')
 }
 else {
   setErrorMessage(' there is problem in connection try again later')
 } 


    }catch{
      setErrorMessage('probem in network connection')
     
    }}
 

  getproducts()

},[props.sendMessage])
 function changeEvent(event){
   
  const {value,name} = event.target
 setFilteroption ((prev)=> {
  console.log(prev)
   return {
     ...prev,
     [name]:value
   }
   
 })
 }
 // to filter the product by the type and the city name.
 function filterevent(){
   setFilter((prev)=> ! prev)
   setFilterData(dataProducts)
   console.log(filterData)
 if(( filteroption.type) && (filteroption.type !== ''))
 {
 console.log()
     setFilterData((prev) => {
 return prev.filter(product => product.type === filteroption.type)
      } )
   
 }
  
 if(( filteroption.city)&& (filteroption.city !== ''))
 {
 
     setFilterData((prev) => {
 return prev.filter(product => product.city === (filteroption.city).toLowerCase())
      } )
   
 }
 console.log(filterData)
 }
    return (
        <div className='Home'>
           {(errorMessage!=='') ?<Error message= {errorMessage}/> : <div>
            <div className='home-div'>
                <img src={log1} alt='logo' />
                <div>
                <p> join us and Swap your Used Stuff   with other people.As the saying goes, one man's trash is another man's treasure </p>
           

           {  (props.logined) && <a href ='/addprodeuct' 
          className='linkaddproduct'  > Add product</a>}
               </div>
               <img src={log1} alt='logo2'/>
               </div>

               <div className='filter-div'>
              
           <label> City </label>
           <input type='text' name='city' onChange={changeEvent} />
           <label>Type </label>
           <select name="type" onChange={changeEvent} >
           <option value='' >  </option> 
              
               <option value='Toys' >--Toys-----</option> 
              <option value= 'Furniture'>--Furniture-----</option>   
              <option value='Electronic Devices'>--Electronic Devices-----</option> 
                <option value='Vehicles'>--Vehicles-----</option> 
                  <option value= 'clothes'>--clothes-----</option>  
                  <option  value='Baby stuff'>--Baby stuff-----</option>  
                  <option value='Books'>--Books-----</option> 
                  <option value='Other'>--Other--</option> 


           </select>
         
           <button onClick={filterevent}> {! filter ? 'Add Filter':'Remove filter'} <BiFilterAlt style={{width: '20px',height:'20px'}}  /></button>

 
               </div>
              

<Showproduct products={filter?filterData: dataProducts} sendMessage = {props.sendMessage} className="container" />
<br/> <br/>
<br/> <br/>
           
           </div>}
        </div>
    )
}
