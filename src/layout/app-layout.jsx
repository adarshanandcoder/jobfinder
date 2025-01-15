import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <div className='grid-background'></div>
        <main className='min-h-screen w-full'>
            <Header />
            <Outlet />
        </main>
        <div>
        <div className="p-8" style={{backgroundColor :"#1D2328"}}>
            <div className="flex justify-center items-center">
              <p className="italic text-center">Made by <span className="text-red-500 font-semibold">Adarsh Anand</span></p>
            </div>
            <div className="lg:flex flex-row justify-between m-6">
              <p><span className="text-red-500 font-semibold">WhatsApp </span>: +91-7488235590</p>
              <p><span className="text-red-500 font-semibold">Email </span>: info@jobfinder.ac.in</p>
              <p><span className="text-red-500 font-semibold">Customer-Care </span>: +91-9064570736</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AppLayout