'use client'
import { createOrder } from '@/helpers/orders.helper';
import { IProduct, userSession } from '@/types';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Cart = () => {
  const [cart, setCart] = useState<IProduct[]>([])
  const [total, setTotal] = useState<number>(0)
  const [userData, setUserData] = useState<userSession>();

  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage){
      const userData: userSession = JSON.parse(localStorage.getItem("userSession")!)
      setUserData(userData)
      !userData?.token && redirect("/login")
    }
    
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    if(storedCart) {
      let totalcart = 0;
      storedCart?.map((item: IProduct) => {
        totalcart = totalcart + item.price
      })
      setTotal(totalcart)
      setCart(storedCart)
    }
  }, [])
  
  const handleClick = async () => {
      const idProducts = new Set(cart.map((product) => product.id))
      await createOrder(Array.from(idProducts), userData?.token!)

      alert("Buy successfully")
      setCart([])
      setTotal(0)
      localStorage.setItem("cart", "[]");
  }

  return (
    <div className='flex flex-row items-center w-full justify-between gap-4 px-4'>
      <div className='flex flex-col gap-4 '>
      {
        cart?.length > 0 ? (
            cart?.map((cart) => {
              return (
                <div key={cart.id}>
                  <div>
                    <p>{cart.name}</p>
                    <p>Price: ${cart.price}</p>
                  </div>
                </div>
              )
            })
        ) : (
          <div> 
             <p>You dont have any products in your cart yet</p>
          </div>
        )
      }
      </div>

      <div>
        <p>Total: ${total}</p>
        <button onClick={handleClick} className='rounded-sm bg-gray-200 hover:bg-gray-400 text-black p-2 mt-2'>Checkout</button>
      </div>
    </div>
  )
}

export default Cart;