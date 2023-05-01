import Layout from "@/components/Layout";
import Link from "next/link"
import ProductCard from "@/components/ProductCard";

import axios from "axios";

export default function Home({products}) {
  console.log(products)

const renderProducts = () =>{
   if(products.length === 0) return <h1 className="text-center text-2xl font-bold">No Products yet!</h1>
  return products.map((product)=>(
  <ProductCard key={product.id} product={product} />
))}

  return (
    <>
    <Layout>
  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
{renderProducts()}
   
  </div>

  
    </Layout>
    </>
  )
}

export const  getServerSideProps = async (context) => {
 
const {data:products} = await  axios.get(`${process.env.SITEURL}/api/products`)

  return{
    props:
    {products}
  }
}
