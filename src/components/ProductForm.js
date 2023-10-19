
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'


const  ProductForm = () => {
   const[product, setProduct] = useState({

    name:"",
    description:"",
    price:""
   })


const clear = () =>{
  setProduct({ name:"",
  description:"",
  price:""})
}

   const router = useRouter();
   //console.log(router.query)

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (router.query.id) {
        // Update an existing product
        const response = await fetch(`/api/products/${router.query.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        if (response.ok) {
          toast.success('Product updated successfully');
        } else {
          const data = await response.json();
          toast.error(data.message);
        }
      } else {
        // Create a new product
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        if (response.ok) {
          toast.success('Product created successfully');
        } else {
          const data = await response.json();
          toast.error(data.message);
        }
      }

      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing your request');
    }
  };
  
    const handleChange = ({target:{name, value}  })=>
       setProduct({...product, [name]: value })
    
       useEffect(() => {
        const getProduct = async () => {
          try {
            const response = await fetch(`/api/products/${router.query.id}`);
            if (response.ok) {
              const data = await response.json();
              setProduct(data);
            } else {
              console.error('Failed to fetch product data');
            }
          } catch (error) {
            console.error('Error while fetching product data:', error);
          }
        };
 
      if(router.query?.id){
        getProduct(router.query.id)
      }
    },[router.query.id])


    return (
<div className="bg-gray-300 h-[50vh] flex flex-col items-center justify-center">
  <form onSubmit={handleSubmit} 
  className="bg-grey shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
    
    
      <label htmlFor="name" className="pr-2">Name:</label>
      <input type="text" name="name" onChange={handleChange} 
      className="shadow border rounded py-2 px-3 text-gray-700 w-full" 
      value={product.name} required/>
    

   
      <label htmlFor="price" className="pr-2">Price:</label>
      <input type="number" name="price" id="price" onChange={handleChange} 
      className="shadow border rounded py-2 px-3 text-gray-700 w-full"
      value={product.price} required />
    

    
      <label htmlFor="description" className="pr-2">Description:</label>
      <textarea name="description" rows="4" onChange={handleChange}
       className="shadow border rounded py-2 px-3 text-gray-700 w-full"
       value={product.description}></textarea>
   

    <div className="flex items-center justify-between w-full md:w-auto">
    
      <button 
      className="bg-blue-500 font-bold text-white border hover:bg-violet-500 py-2 px-1 rounded 
      focus:outline-none focus:shadow-outline mt-3">
        {router.query.id? 'Update Product' :'Save Product'}   </button>
        <button  onClick={clear}
      className="bg-blue-500 font-bold text-white border hover:bg-violet-500 py-2 px-1 rounded ml-10
      focus:outline-none focus:shadow-outline mt-3">
        Clear   </button>
    </div>
    
  </form>
</div>
  )
}

export default ProductForm
