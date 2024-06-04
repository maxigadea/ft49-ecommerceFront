'use client'
import { userSession } from '@/types';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [userData, setUserData] = useState<userSession>();

  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage){
      const userData = localStorage.getItem("userSession")
      setUserData(JSON.parse(userData!))
    }
  }, [])

  return (
    <div className=''>
      <h1> Bienvenido {userData?.userData?.name} </h1>
      <p> Tu dirección: {userData?.userData?.address} </p>
    </div>
  )
}

export default Dashboard;