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
      <h1 className='font-bold border border-black text-center  '>{product.name} </h1>
      <p>{product.description}</p>
      <p>€ {product.price}</p>
      <button
        className="bg-red-500 text-white font-bold px-3 hover:bg-purple-500 rounded mt-4"
        onClick={() => handleDelete(product.id)}
      >
        Delete
      </button>
      <button
        className="bg-orange-500 text-white font-bold px-3 hover:bg-purple-500 ml-5 rounded mt-4"
        onClick={() =>  router.push("/products/edit/"+ product.id)}
      >
       Edit
      </button>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { data: product } = await axios.get(
    "https://mysqlcrud.vercel.app/api/products/" + context.query.id
  );

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
