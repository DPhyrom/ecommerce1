import { HousePlug, LogOut, Menu, ShoppingCart, UserRoundCog } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logout } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'




function MenuItem() {
  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
    {
      shoppingViewHeaderMenuItems.map(menuItem => <Link className='text-sm font-medium' key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
    }
  </nav>
}


function HeaderRightContent() {

  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()

  const handleLogout = () => {
    dispatch(logout()).then((data) => {
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

  return <div className='flex lg:items-center flex-col lg:flex-row gap-4'>
    <Button variant='outline' size='icon'>
      <ShoppingCart className='w-6 h-6' />
      <span className='sr-only'>User cart</span>
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-black'>
          <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">SM</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56">
        <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/shop/account")}>
          <UserRoundCog className='mr-2 h-4 w-4' />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  </div>
}


export default function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to="/shop/home" className='flex items-center gap-2'>
          <HousePlug className="h-6 w-6" />
          <span className='font-bold'>Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className='lg:hidden'>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
              <MenuItem />
              <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          {
            <MenuItem />
          }
        </div>
        <div className='hidden lg:block'>
          <HeaderRightContent />
        </div>
      </div>
    </header>
  )
}
