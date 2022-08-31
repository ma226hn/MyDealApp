import React, { useState  } from "react";
import { Navigate, useParams} from "react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as emailjs from "emailjs-com"

// for add a new offer
export default function AddOffer (props){
  

const param = useParams()

//success variable true when the user succes to add offer and false when user fail
const [success,setsuccess] = useState(false)
console.log(param.id)
const {register,handleSubmit,reset,formState:{errors}} = useForm({defaultValues:{
  title:'',
  description :'',
  city : '',
  type :'',
  contectMethod :{type :"",contact:""}
}})
const registerOptions = {
  title:{required : 'title is requried'},
  description :{required : 'description is requred'},
  city : {required : 'city is requred'},
  type :{required : 'Type is requred'},
  contectMethod :{required : 'Type is requred'}
  


  
 
}
const [sourceData,setSourceData] = useState('')

useEffect(()=>{
 // git product from the sourceApi to add the photo of the product and name to the offer.
    async function getproducts(){
      try{
        console.log('helo')
   const res= await  fetch(`https://cscloud8-19.lnu.se/my-deal/api/v1/sources/sources/${param.id}`,  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
'Authorization':  `Bearer ${sessionStorage.getItem('token')}`,
      'Accept-Encoding': 'gzip, deflate, br'

    },
    
    
  })
    const response = await res.json()
    
  
   
    
   if((res.status===404)||(res.status===404))
   {
     props.sendMessage('the page not found try again later')
     
   } else 
   {
     setSourceData({...response})
     console.log(sourceData,'soursdata')
   }
  
  
      }catch{
        
        props.sendMessage('some thing went wrong try later')
 
      }}
    
  
    getproducts()
  // eslint-disable-next-line
  },[])
  let imagesArray
  // to post the offer
 async function submiteValues(data)
 
 {

console.log(data,'data')
  const dataform = {...data,
    images:imagesArray
    ,sourceId: param.id,
    receiverId:sourceData.ownerId,
    sourceTitle :sourceData.title
  }
    
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
    
  
        const res = await fetch("https://cscloud8-19.lnu.se/my-deal/api/v1/offers/offers", options)
       
        console.log(res.status)

        if (res.status ===201)
        {
          setsuccess(true)
       
          props.sendMessage('offer has been  sent')
 
          var templateParams = {
          username: sourceData.ownerName,
           productTitle: sourceData.title,
           email:sourceData.ownerEmail
       };
        // to send email to the owner.
       emailjs.send('service_vmdtbhw', 'template_uv94wmh', templateParams,'xBYrZGHeX1QNw1EX7')
           .then(function(response) {
            props.sendMessage('Mail has been sent to the owner')

           }, function(error) {
            props.sendMessage('we  could not send a email to the owner')
              
           });
          
         
       
               
      } else 
       {
          props.sendMessage('some thing went wrong try logging in again')
      
       
        }
  
         
    
      } catch (error) {
       
        props.sendMessage('some thing went wrong try again later')
        
       
      } 


 }
 // to load the image and save them in base64
 async function encodeImageFileAsURL(element) {
  console.log(element.files.length)
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
      
      <form  onSubmit={handleSubmit( submiteValues)}>
      
             <div className="container">
           <div className='add-title'> <img src={sourceData.images?sourceData.images[0]: null}  alt=''/> <p> Send Offer</p> </div>
           <div className="row-div" >
           <label>Insert title </label>
           <input type='text'  name='title' {...register('title', registerOptions.title) }/>
           <p className="text-danger">
          {errors?.title && errors.title.message}
        </p>
           </div>
           <div className="row-div">
           <label> Add description</label>
           <textarea name="description" {...register('description', registerOptions.description) }></textarea>
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
           <label>Choose contact method </label>
           <select name=" contectMethod.type" {...register('contectMethod.type')}>

              
               <option value='mobile'  >--mobile-----</option>   
                   <option value='email' >--email-----</option>       
           </select>
          </div>
           <div className="row-div">
           <label>Insert your Email or your mobile number</label>
           <input type='text' name=' contectMethod.contact' {...register('contectMethod.contact')} />
           </div>
           <div className="row-div">
           <p> Load images </p>
           <input type="file"  accept="image/*"  multiple  name="image"  onChange= {(e)=>encodeImageFileAsURL(e.target)} />
           </div>
           <div className="row-div">
           <button > Send</button>
           <button type='reset'onClick={(event)=>{ reset()
         event.preventDefault()}}> cancel</button>
         {success  &&<Navigate to="/" /> }
           <br></br>
           <br></br>
           </div>
           <script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">
</script>


           </div>

       </form>
    )
}
