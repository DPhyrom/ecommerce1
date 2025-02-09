import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProduct from './pages/admin-view/product'
import AdminOrder from './pages/admin-view/order'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnAuthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from './components/admin-view/layout'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"


export default function App() {

  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()


  // run once when component mount
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) return <div className="flex flex-col space-y-3 justify-center items-center">
    <Skeleton className="h-1/2 w-1/2 rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[550px]" />
      <Skeleton className="h-4 w-[500px]" />
    </div>
  </div>

  return (
    <div className='flex flex-col overflow-hidden bg-white'>

      <Routes>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>

        }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProduct />} />
          <Route path='orders' element={<AdminOrder />} />
          <Route path='features' element={<AdminFeatures />} />
        </Route>
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        } >
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='account' element={<ShoppingAccount />} />
        </Route>
        <Route path='*' element={<NotFound />} />
        <Route path='unauth-page' element={<UnAuthPage />} />
      </Routes>
    </div>
  )
}
