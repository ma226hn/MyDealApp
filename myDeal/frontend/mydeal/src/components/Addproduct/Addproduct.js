import React from "react";
import './Addproduct.css'
import logoImg from './img/logo.png'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate } from "react-router";

// add a new product
export default function Addproduct (props){
  const [success,setsuccess] = useState(false)
    const {register,handleSubmit,reset,formState:{errors}} = useForm({defaultValues:{
        title:'',
        description :'',
        city : '',
        type :'',
        images : []
    }})
    const registerOptions = {
        title:{required : 'title is requried'},
        description :{required : 'description is requred'},
        city : {required : 'city is requred'},
        type :{required : 'Type is requred'},
      
    }
let imagesArray
// post the value to sources Api
    async function submiteValues(data){
       
       const dataform = {...data,
        images:imagesArray}
        try{
            
        let options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
    'Authorization':  `Bearer ${sessionStorage.getItem('token')}`,
              'Accept-Encoding': 'gzip, deflate, br'

            },
            body: JSON.stringify(dataform)
            
          }
         
    
          const res = await fetch("https://cscloud8-19.lnu.se/my-deal/api/v1/sources/sources/", options)
         

          if (res.status ===201)
          {
            setsuccess(true)
            props.succesmessage('product has been sent')
           
           
         
                 
        } else 
          // if res.message were invalid token or bad request
        props.succesmessage('There was aproblem and the product was not added try log in again')
    
           
      
        } catch (error) {
         
          props.succesmessage('There was aproblem and the product was not added try again later')
         
        } 

    }
    async function encodeImageFileAsURL(element) {
      
        const imgValue=[]
        for (let i=0;i<element.files.length; i++)
        {
        let file = element.files[i];
       
        let reader = new FileReader();
       reader.readAsDataURL(file);
        reader.onloadend = function() {
            
            imgValue.push(reader.result) 
          
        }
    
        
        }
      imagesArray =imgValue
       

      }
    
    return(
      <>
       <form  onSubmit={handleSubmit( submiteValues)}>
           <div className="container">
           <div className='add-title'> <img src={logoImg} alt="logo deal" /> <p>Add new product</p></div>
           <div className="row-div" >
           <label>Insert title </label>
           <input type='text'  name='title' {...register('title', registerOptions.title) }/>
           <p className="text-danger">
          {errors?.title && errors.title.message}
        </p>
           </div>
           <div className="row-div">
           <label> Add description</label>
           <textarea style={{height:'150px'}} name="description" {...register('description', registerOptions.description) }></textarea>
           <p className="text-danger">
          {errors?.description && errors.description.message}
        </p>          
           </div>
          
           <div className="row-div">
           <label>Insert your city name </label>
           <input type='text' name='city' {...register('city', registerOptions.city) } />
           <p className="text-danger">
          {errors?.city && errors.city.message}
        </p>
           </div>
           
           <div className="row-div">
           <label>Type </label>
           <select name="type" {...register('type', registerOptions.type) }>

              
               <option value='Toys' >--Toys-----</option> 
              <option value= 'Furniture'>--Furniture-----</option>   
              <option value='Electronic Devices'>--Electronic Devices-----</option> 
                <option value='Vehicles'>--Vehicles-----</option> 
                  <option value= 'clothes'>--clothes-----</option>  
                  <option  value='Baby stuff'>--Baby stuff-----</option>  
                  <option value='Books'>--Books-----</option> 
                  <option value='Other'>--Other--</option> 


           </select>
           <p className="text-danger">
          {errors?.type && errors.type.message}
        </p>
           </div>
         
           <div className="row-div">
          

           <p> Load images </p>
           <input type="file"  accept="image/*"  multiple  name="image"  onChange= {(e)=>encodeImageFileAsURL(e.target)} />
           </div>
           <div className="row-div">
           <button > Add</button>
           <button type='reset'onClick={(event)=>{ reset()
         event.preventDefault()}}> Cancel</button>
           <br></br>
           <br></br>
           </div>
           </div>
       </form>
       {success && <Navigate to = '/'/>}
       </>
    )
}
    