import { Button } from '@/components/ui/button'
import { SheetContent, SheetHeader, SheetTitle, Sheet } from '@/components/ui/sheet'
import { Label } from '@radix-ui/react-label'
import React, { Fragment, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductImageUpload from './productImageUpload'


export default function AdminProduct() {

  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)

  const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: ''
  }

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState('')

  const addProduct = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const SubmitForm = (event) =>{
    
  }

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductDialog(true)} >Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
      <Sheet open={openCreateProductDialog} onOpenChange={() => setOpenCreateProductDialog(false)}>
        <SheetContent side="left" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>

          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl}/>

          <div className='py-6'>
            <form onSubmit={SubmitForm}></form>
            <Label className=''>Title</Label>
            <Input name="title" value={formData.title} onChange={addProduct} />

            <Label className=''>Description</Label>
            <Textarea name="description" onChange={addProduct}/>

            <Label className=''>Category</Label>
            <Select name="category" value={formData.category} onValueChange={(value) => setFormData({...formData, category : value})}>
              <SelectTrigger className="w-full" >
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Label className=''>Brand</Label>
            <Select name="category" value={formData.brand} onValueChange={(value) => setFormData({...formData, brand : value})}>
              <SelectTrigger className="w-full" >
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Label className=''>Price</Label>
            <Input type="Number" name="price" value={formData.price} onChange={addProduct} />

            <Label className=''>Sale Price</Label>
            <Input type="Number" name="salePrice" value={formData.salePrice} onChange={addProduct} />

            <Label className=''>Total Stock</Label>
            <Input type="Number" name="totalStock" value={formData.totalStock} onChange={addProduct} />
            <Button className="w-full mt-3">Submit</Button>

          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}
