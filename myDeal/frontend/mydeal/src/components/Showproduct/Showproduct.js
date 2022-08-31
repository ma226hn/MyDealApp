import React from 'react';
import Product from '../Product/Product';
import './Showproduct.css'
// container to show all products
export default function Showproduct (props)
{ 

    const products = (props.products.lenght !== 0) ? props.products.map(data => 
        <Product key={data.id} data = {data}  sendMessage= {props.sendMessage} />) : <p style={{margin : '20%', color: 'blue'}}> No Product to show !!!</p>
      
    return (
        <div className='showproduct'>
            {products}
        </div>
    )
}