import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'


const  ProductForm = () => {
   const[product, setProduct] = useState({

    name:"",
    description:"",
    price:""
   })

   const router = useRouter();
   console.log(router.query)

    const handleSubmit = async (e)=>{
        e.preventDefault();
       
       try {
        if (router.query.id){
         // console.log("update")
         await axios.put('/api/products/'+ router.query.id, product)
         toast.success('Product updated successfully')
        }else{
        await axios.post('/api/products', product)
        toast.success('Product created successfully')
      }
        
      setTimeout(()=>{
        router.push("/");
      },3000) 
       } catch (error) {
        toast.error(error.response.data.message)
       }
    }
  
    const handleChange = ({target:{name, value}  })=>
       setProduct({...product, [name]: value })
    
    useEffect(()=>{
      const getProduct = async () => {
        const {data} = await axios.get('/api/products/'+ router.query.id)
        setProduct(data)
        //console.log(data)
      }
 
      if(router.query?.id){
        getProduct(router.query.id)
      }
    },[])


    return (
<div className="bg-gray-300">
  <form onSubmit={handleSubmit} 
  className="bg-grey shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap justify-center">
    
    <div className="flex flex-col w-full md:w-1/3 lg:w-1/4 mr-4">
      <label htmlFor="name" className="pr-2">Name:</label>
      <input type="text" name="name" onChange={handleChange} 
      className="shadow border rounded py-2 px-3 text-gray-700 w-full" 
      value={product.name}/>
    </div>

    <div className="flex flex-col w-full md:w-1/3 lg:w-1/4 mr-4">
      <label htmlFor="price" className="pr-2">Price:</label>
      <input type="text" name="price" id="price" onChange={handleChange} 
      className="shadow border rounded py-2 px-3 text-gray-700 w-full"
      value={product.price} />
    </div>

    <div className="flex flex-col w-full md:w-1/3 lg:w-1/4 mr-4">
      <label htmlFor="description" className="pr-2">Description:</label>
      <textarea name="description" rows="4" onChange={handleChange}
       className="shadow border rounded py-2 px-3 text-gray-700 w-full"
       value={product.description}></textarea>
    </div>

    <div className="flex items-center w-full md:w-auto">
    
      <button 
      className="bg-blue-500 font-bold text-white border hover:bg-violet-500 py-2 px-1 rounded 
      focus:outline-none focus:shadow-outline mt-3">
        {router.query.id? 'Update Product' :'Save Product'}   </button>
    </div>
    
  </form>
</div>
  )
}

export default ProductForm