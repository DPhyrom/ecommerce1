import { Barcode, ChartLine, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export default function AdminSidebar({open,setOpen}) {
  const navigate = useNavigate()
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-6">
          <SheetHeader>
            <SheetTitle>
              <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
                <ChartLine color="#000000" strokeWidth={2.5} />
                <h1 className='text-xl font-semibold'>Admin Panel</h1>
              </div>
            </SheetTitle>
            <SheetDescription>
                <nav className='mt-8 flex-col flex gap-2'>
                  <div onClick={() => navigate('/admin/dashboard')} className='cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground'>
                    <LayoutDashboard color="#000000" strokeWidth={2.5} />
                    <span>Dashboard</span>
                  </div>
                  <div onClick={() => navigate('/admin/products')} className='cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground'>
                    <ShoppingBasket color="#000000" strokeWidth={2.5} />
                    <span>Product</span>
                  </div>
                  <div onClick={() => navigate('/admin/orders')} className='cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground'>
                    <Barcode color="#000000" strokeWidth={2.5} />
                    <span>Order</span>
                  </div>
                </nav>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>


      <div className='hidden w-64 flex-col border-r  bg-background p-6 lg:flex'>
        <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
          <ChartLine color="#000000" strokeWidth={2.5} />
          <h1 className='text-xl font-semibold'>Admin Panel</h1>
        </div>
        <nav className='mt-8 flex-col flex gap-2'>
          <div onClick={() => navigate('/admin/dashboard')} className='cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground'>
            <LayoutDashboard color="#000000" strokeWidth={2.5} />
            <span>Dashboard</span>
          </div>
          <div onClick={() => navigate('/admin/products')} className='cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground'>
            <ShoppingBasket color="#000000" strokeWidth={2.5} />
            <span>Product</span>
          </div>
          <div onClick={() => navigate('/admin/orders')} className='cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground'>
            <Barcode color="#000000" strokeWidth={2.5} />
            <span>Order</span>
          </div>
        </nav>
      </div>
    </>
  )
}
