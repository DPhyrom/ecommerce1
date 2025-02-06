import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
  userName: '',
  email: '',
  pws: ''
}

export default function AuthRegister() {

  const [formData, setFormData] = useState(initialState)
  console.log(formData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast()

  function onChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if(data.payload.success){
        toast({
          title: data?.payload?.message,
        })
        return navigate('/auth/login')
      }else {
        toast({
          variant: "destructive",
          title: data?.payload?.message,
        })
      }
    })
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className='mt-2'>Already have an account</p>
        <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>Login</Link>
      </div>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-3 '>
          <div className='grid w-full gap-1.5'>
            <Label>User name</Label>
            <Input name="userName" placeholder="input username" type="text" value={formData.userName} onChange={onChange}/>
            <Label>Email</Label>
            <Input name="email" placeholder="input email" type="email" value={formData.email} onChange={onChange}/>
            <Label>Password</Label>
            <Input name="pws" placeholder="input password" type="password" value={formData.pws} onChange={onChange}/>
          </div>
        </div>
        <Button type="submit" className='mt-2 w-full'>Register</Button>
      </form>
    </div>
  )
}
