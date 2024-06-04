'use client'
import { getProductById } from '@/helpers/product.helper'
import { IProduct, userSession } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';

const DetailProduct = ({params} : {params: {productId: string}}) => {
const router = useRouter();
const [product, setProduct] = useState<IProduct>()
const {userData} = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const product = await getProductById(params.productId)
      setProduct(product)
    }
    fetchData()
  }, [])


  const handleAddToCart = (e: any) => {
    if(!userData?.token) {
      alert("You must be logged to buy!")
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const productExist = cart.some((product: IProduct) => {
        if(product.id === Number(e?.target?.id)) return true;
        return false;
      })
      if(productExist) {
        alert("This product exist in your cart!")
        router.push("/cart")
      } else {
        cart.push(product)
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to your cart!")
        router.push("/cart")
      }
    }
  };
 
  return (
    <div className='w-full items-center justify-center flex flex-col'>
        <div className='w-1/2 items-center justify-center flex flex-col bg-gray-200 p-6 rounded my-4'>
            <h2>{product?.name}</h2>
            <img src={product?.image} alt={product?.image} />
            <p>{product?.description}</p>
            <p>Price: {product?.price}</p>
            <p>Stock: {product?.stock}</p>
            <button id={product?.id.toString()} onClick={handleAddToCart} className='rounded-sm bg-white hover:bg-gray-400 text-black p-4 mt-2'>Buy now!</button>
        </div>
    </div>
  )
}

export default DetailProduct;