import Layout from "@/components/Layout";
//import Link from "next/link"
import ProductCard from "@/components/ProductCard";
import { Analytics } from '@vercel/analytics/react';


export default function Home({products}) {
  //console.log(products)
  

const renderProducts = () =>{
   if(products.length === 0) return <h1 className="text-center text-2xl font-bold">No Products yet!</h1>
  return products.map((product)=>(
    <>
    <div key={product._id}  className="flex justify-center"  >
      <ProductCard product={product}/></div>
 
  </>
))}

  return (
    <>
    <Layout>
  <div>
{renderProducts()}
   
  </div>

  
    </Layout>
    <Analytics />
    </>
  )
}


export const  getServerSideProps = async (context) => {
 {/*  
//const {data:products} = await  axios.get(`${process.env.NEXT_PUBLIC_SITEURL}/api/products`)
//const {data:products} = await  axios.get("https://mysqlcrud.vercel.app/api/products")
const {data:products} = await  axios.get(`${process.env.SITEURL}/api/products`)

  return{
    props:
    {products}
  }
  */}
  try {
    const response = await fetch(`${process.env.SITEURL}/api/products`);
    if (response.ok) {
      const products = await response.json();

      return {
        props: {
          products
        }
      };
    } else {
      console.error('Failed to fetch products');
      return {
        props: {
          products: []
        }
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      props: {
        products: []
      }
    };
  }
}
