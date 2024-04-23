'use client'
import { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

export default function Home() {
  const [uploading, setUploading] = useState<boolean>(false)
  const [selectedimage, setSelectedimage] = useState<string>('')
  const [selectedfile, setSelectedfile] = useState<File>()

  const handleUpload = async () => {
    setUploading(true)
    try {
      if (!selectedfile) return
      const formData = new FormData()
      formData.append('myImage', selectedfile)
      const { data } = await axios.post('/api/image', formData)
      console.log(data)
    } catch (error: any) {
      console.log(error)
    }
    setUploading(false)
  }

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <label>
        <input
          type='file'
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file: File = target.files[0]
              setSelectedimage(URL.createObjectURL(file))
              setSelectedfile(file)
            }
          }}
        />
        <div className='w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer'>
          {selectedimage ? (
            <Image src={selectedimage} alt='Selected image' width={160} height={90}/>
          ) : (
            <span>Select image</span>
          )}
        </div>
      </label>

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ opacity: uploading ? '.5' : '1' }}
        className='bg-red-600 p-3 w-32 text-center rounded text-white'
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </main>
  )
}
