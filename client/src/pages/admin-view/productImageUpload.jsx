import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@radix-ui/react-label'
import axios from 'axios';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react'

export default function ProductImageUpload({imageFile, setImageFile, uploadImageUrl, setUploadImageUrl, setImageLoadingState, imageLoadingState, currentEditedId}) {


  const inputRef = useRef(null)
  function handleImageFileChange(event) {
    const seletedFile = event.target.files?.[0]
    if (seletedFile) setImageFile(seletedFile)

  }
  function handleDrop(event){
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile)
  }
  function handleDragOver(event) {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile)
  }
  function handleRemoveImage() {
    setImageFile(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }


  async function uploadImageToCloudinary(){
    setImageLoadingState(true)
    const data = new FormData();
    data.append('my_file', imageFile)
    const response =  await axios.post('http://localhost:5000/api/admin/products/upload-image', data)

    if(response.data?.success){
      setUploadImageUrl(response.data.result.url)
      setImageLoadingState(false)
    }

  }

  useEffect(()=>{
    if(imageFile !== null){
      uploadImageToCloudinary()
    }
  },[imageFile])

  return (
    <div>
      <div className='w-full max-w-md mx-auto'>
        <Label className='text-lg font-semibold mb-2 block text-slate-500'>Upload Image</Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4'>
          {
            currentEditedId == null ? <Input id="image-upload" className='hidden' type="file" ref={inputRef} onChange={handleImageFileChange} /> : ""
          }
          {
            !imageFile ? (
              <Label htmlFor='image-upload' className={`${currentEditedId !== null ? "opacity-20 cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}>
                <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                <span>Drag & drop or click to upload image</span>
              </Label>) : (
                imageLoadingState ?
                <Skeleton className='h-10 bg-gray-100'/> : 
                <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <FileIcon className='w-8 text-primary mr-2 h-8' />
                </div>
                <p className='text-sm font-medium'>{imageFile.name}</p>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                  <XIcon className='w-4 h-4' />
                </Button>
              </div>)
          }
        </div>
      </div>
    </div>
  )
}
