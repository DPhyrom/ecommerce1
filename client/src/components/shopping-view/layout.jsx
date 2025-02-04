import React from 'react'
import ShoppingHeader from './header'
import { Outlet } from 'react-router-dom'

export default function ShoppingLayout() {
  return (
    <div>
      <div className='flex flex-col bg-white overflow-hidden'>
        {/* common header */}
        <ShoppingHeader />
        <main className='flex flex-col w-full'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
