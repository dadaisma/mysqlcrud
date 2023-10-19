import Layout from "@/components/Layout";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";


const ProductPage= ({ product }) => {
  
    const router = useRouter();
    // console.log(product)
      const handleDelete = async (id) => {
        try {
      await axios.delete("/api/products/" + id);
      toast.success("Product Deleted!")
      setTimeout(()=>{
        router.push("/");
      },3000)
      
    }
    catch (error) {
    toast.error(error.response.data.message)
  }}
  

 

  return (
    <Layout>
      <div className="bg-gray-300  shadow border-2 rounded grid grid-cols-1 md:grid-cols-4 justify-center text-center ml-10 mr-10  items-center ">
      <p className='font-bold text-xl'>{product.name} </p>
      <p className='italic'>{product.description}</p>
      <p>€ {product.price}</p>
      <div className="flex items-center justify-center mt-3 mb-3">
      <button
        className="bg-orange-500 text-white font-bold px-3 hover:bg-purple-500 mr-5 rounded "
        onClick={() =>  router.push("/products/edit/"+ product.id)}
      >
       Edit
      </button>
      <button
        className="bg-red-500 text-white font-bold px-3 hover:bg-purple-500 rounded "
        onClick={() => handleDelete(product.id)}
      >
        Delete
      </button>
     
      </div>  </div>
    </Layout>
  );
};

{/*  
export const getServerSideProps = async (context) => {
  const { data: product } = await axios.get(
    
    `${process.env.SITEURL}/api/products`  + context.query.id
   // "https://mysqlcrud.vercel.app/api/products/" + context.query.id
  );

  return {
    props: {
      product,
    },
  };
};
*/}
export const getServerSideProps = async (context) => {
  try {
    const response = await fetch(
      `${process.env.SITEURL}/api/products/${context.query.id}`
    );

    if (response.ok) {
      const product = await response.json();

      return {
        props: {
          product,
        },
      };
    } else {
      console.error('Failed to fetch product data');
      return {
        props: {
          product: {},
        },
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      props: {
        product: {},
      },
    };
  }
};



export default ProductPage;
