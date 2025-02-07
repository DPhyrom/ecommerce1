import { useToast } from '@/hooks/use-toast'
import { logout } from '@/store/auth-slice'
import { LogOut, Menu } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function AdminHeader({setOpen}) {

  const dispatch = useDispatch()
  const {toast} = useToast()

  const Userlogout = () => {

    dispatch(logout()).then(() => {
      if (data.payload.success) {
        toast({
          title: data?.payload?.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: data?.payload?.message,
        })
      }
    })
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <button onClick={()=>setOpen(true)} className='lg:hidden sm:block bg-black text-white rounded-lg p-2'>
        <Menu />
        <span className='sr-only'>Toggle Menu</span>
      </button>
      <div className='flex flex-1 justify-end'>
        <button onClick={Userlogout} className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-black text-white'>
          <LogOut />
          Lougout
        </button>
      </div>
    </header>
  )
}
