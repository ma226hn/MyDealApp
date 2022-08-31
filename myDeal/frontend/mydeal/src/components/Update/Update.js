import React from "react";
import { Navigate, useParams} from "react-router";
import { useEffect , useState,useRef} from "react";
import { useForm } from "react-hook-form";
import logoImg from './img/logo.png'
import Imageupdate from "../Imageupdate/Imageupdate";
import './Update.css'
// modify product.
 export default function Update(props)
 {

   
    const [sourceData,setSourceData] = useState('')
    const [success,setsuccess] = useState(false)
    const {register,handleSubmit,reset,formState:{errors}} = useForm()
    const registerOptions = {
        title:{required : 'title is requried'},
        description :{required : 'description is requred'},
        city : {required : 'city is requred'},
        type :{required : 'Type is requred'},
        
        
      
    }

    const[imageList,setImageList]  = useState([])
const imagesArray = useRef([])


    
    const param = useParams()
     
    useEffect(()=>{
      async function uploadSource() {
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
        
      
       
        
       if(res.status===404)
       {
         props.succesmessage(' the product not found')
       } else  if(res.status===403)
       {
        props.succesmessage('  you do not have the permission')
      }  else  if(res.status===200)
       {
         setSourceData({...response})
         
      
         
       }else  
       {
        props.succesmessage('  some thing went wrong try to logging in again')
      } 
      
      
          }catch (e){
            
            props.succesmessage('  some thing went wrong try again')
          }
        }
        uploadSource()
        // eslint-disable-next-line
    },[param.id])
    
   
  function deletImageEvent(id)
    {
  
     imagesArray.current =imagesArray.current.filter((image,index)=> index !==id)
      setImageList([...imagesArray.current.map((image,index)  => <Imageupdate image= {image}  key= {index} onDelete ={ deletImageEvent} index= {index}/>)])
   
      console.log(imageList, 'imagesarray afterbutton')
    

    }

  
 useEffect(() => {
    let defaultValues = {}
    defaultValues.title = sourceData.title
    defaultValues.type = sourceData.type
    defaultValues.images = sourceData.images
    defaultValues.description =sourceData.description
    defaultValues.city = sourceData.city
    defaultValues.images = sourceData.images
    reset({ ...defaultValues })
    imagesArray.current = sourceData.images ? [...sourceData.images]: []
    console.log (imagesArray,'imagesarray')
     
    setImageList( [...imagesArray.current.map((image,index)  => <Imageupdate image= {image}  key= {index} onDelete ={ deletImageEvent} index= {index}/>)])
    // eslint-disable-next-line
  }, [sourceData,reset]);
 

    async function updateValues(data){
     
       
      const dataform = {...data,
        images:[...imagesArray.current]}
        console.log(dataform)

        try{
            
        let options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
    'Authorization':  `Bearer ${sessionStorage.getItem('token')}`,
              'Accept-Encoding': 'gzip, deflate, br'

            },
            body: JSON.stringify(dataform)
            
          }
         
    
          const res = await fetch(`https://cscloud8-19.lnu.se/my-deal/api/v1/sources/sources/${param.id}`, options)
         console.log(res.status)

          if (res.status ===204)
          {
            setsuccess(true)
            props.succesmessage('product is updated')
           
           
         
                 
        } else 
          
        props.succesmessage('a problem occurred and the product was not added try log in again')
    
           
      
        } catch (error) {
         
          props.succesmessage('a problem occurred and the product was not added try again later')
         
        } 

    }
    async function encodeImageFileAsURL(element) {
      
       
    

        for (let i=0;i<element.files.length; i++)
        {
        let file = element.files[i];
       
        let reader = new FileReader();
       reader.readAsDataURL(file);
        reader.onloadend = function() {
        
            
      imagesArray.current.push(reader.result)

      
          
        }
    
        
        }
    
   
      }
    
    return(
      <>
     
       <form  onSubmit={handleSubmit( updateValues)}>
           <div className="container">
           <div className='add-title'> <img src={logoImg} alt="logo deal" /> <p>Modify product</p></div>
           <div className="row-div" >
           <label> Title </label>
           <input type='text'  name='title'  {...register('title', registerOptions.title) }/>
           <p className="text-danger">
          {errors?.title && errors.title.message}
        </p>
           </div>
           <div className="row-div">
           <label> Add description</label>
           <textarea name="description"  {...register('description', registerOptions.description) }></textarea>
           <p className="text-danger">
          {errors?.description && errors.description.message}
        </p>          
           </div>
          
           <div className="row-div">
           <label>Insert your city name </label>
           <input type='text' name='city'  {...register('city', registerOptions.city) } />
           <p className="text-danger">
          {errors?.city && errors.city.message}
        </p>
           </div>
           
           <div className="row-div">
           <label>Type </label>
           <select name="type"  {...register('type', registerOptions.type) }>

              
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
           <div className="images-row" style={{}}>
       {imageList}
           </div>
         
           <div className="row-div">
          

           <p> Load more images </p>
           <input type="file"  accept="image/*"  multiple  name="image"  onChange= {(e)=>encodeImageFileAsURL(e.target)} />
           </div>
           <div className="row-div">
           <button > Update</button>
           <button type='reset'onClick={()=> {
           
               setsuccess(true)
               props.succesmessage('you cancled the procces')
              
              
           }}> Cancel</button>
           <br></br>
           <br></br>
           </div>
           </div>
       </form>
       {success && <Navigate to = '/'/>}
       </>
    )

 }
 