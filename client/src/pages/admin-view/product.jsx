import { Button } from '@/components/ui/button'
import { SheetContent, SheetHeader, SheetTitle, Sheet } from '@/components/ui/sheet'
import { Label } from '@radix-ui/react-label'
import React, { Fragment, useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/product-slice'
import { useToast } from '@/hooks/use-toast'
import AdminProductTile from '@/components/admin-view/product-tile'


export default function AdminProduct() {

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
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const dispatch = useDispatch()
  const { productList } = useSelector(state => state.adminProducts)
  const { toast } = useToast()
  const [currentEditedId, setCurrentEditedId] = useState(null)


  const addProduct = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }



  const SubmitForm = (event) => {
    event.preventDefault()
    currentEditedId == null ?

      dispatch(addNewProduct({
        ...formData,
        image: uploadImageUrl
      })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setOpenCreateProductDialog(false)
          setImageFile(null);
          setFormData(initialFormData)
          toast({
            title: 'Product add successfully'
          })
        }
      })
      :
      dispatch(editProduct({ id: currentEditedId, formData: formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setOpenCreateProductDialog(false)
          setFormData(initialFormData)
          toast({
            title: 'Product Edited ✔'
          })
        }
      })

  }

  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        toast({
          title: 'Product Deleted💥'
        })
      }
    })
  }

  // check form valid
  // 👉 Object.keys(formData) ➝ ["title", "description", "category", "brand", "price"]
  // 👉 map() ➝ [true, true, true, true, true] (all fields are not empty)
  // 👉 every() ➝ true ✅ (All fields are filled)
  function isFormValid() {
    return Object.keys(formData).map((key) => formData[key] !== "").every((item) => item)
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])


  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductDialog(true)} >Product (+)</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ?
            productList.map(productItem => <AdminProductTile key={productItem._id} setFormData={setFormData} setCurrentEditedId={setCurrentEditedId} setOpenCreateProductDialog={setOpenCreateProductDialog} product={productItem} handleDelete={handleDelete}/>) : null
        }
      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={() => {
        setOpenCreateProductDialog(false)
        setCurrentEditedId(null)
        setFormData(initialFormData)
      }}>
        <SheetContent side="left" className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="mb-5 font-bold text-xl text-slate-600">{currentEditedId !== null ? 'Edit Product' : 'Add New Product'}</SheetTitle>
          </SheetHeader>

          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} currentEditedId={currentEditedId} />

          <div className='py-6'>
            <form onSubmit={SubmitForm}>
              <div className='my-3 text-slate-600'>
                <Label className='font-bold'>Title</Label>
                <Input name="title" value={formData.title} onChange={addProduct} />
              </div>

              <div className='my-3 text-slate-600'>
                <Label className='font-bold'>Description</Label>
                <Textarea name="description" value={formData.description} onChange={addProduct} />
              </div>
              <div className='my-3 text-slate-600'>
                <Label className='font-bold'>Category</Label>
                <Select name="category" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='my-3 text-slate-600'>
                <Label className='font-bold'>Brand</Label>
                <Select name="brand" value={formData.brand} onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='my-3 text-slate-600'>
                <Label className='font-bold'>Price</Label>
                <Input type="number" name="price" value={formData.price} onChange={addProduct} />
              </div>
              <div className='my-3 text-slate-600'>
                <Label className='font-bold'>Sale Price</Label>
                <Input type="number" name="salePrice" value={formData.salePrice} onChange={addProduct} />
              </div>
              <div className='my-3 text-slate-600'>
                <Label className='font-bold'>Total Stock</Label>
                <Input type="number" name="totalStock" value={formData.totalStock} onChange={addProduct} />
              </div>
              <Button disabled={!isFormValid()} type='submit' className="w-full mt-3">{currentEditedId !== null ? 'Edit' : 'Submit'}</Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}
