'use client'
import { FormEvent, FormEventHandler, useState } from 'react'

export default function Home() {
  const [uploading, setUploading] = useState<boolean>(false)
  const [file, setFile] = useState<File>()

  const onSubmit: FormEventHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })

      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <form onSubmit={onSubmit}>
        <input type='file' onChange={(e) => setFile(e.target.files?.[0])} />

        <input
          type='submit'
          value={uploading ? 'Uploading...' : 'Upload'}
          disabled={uploading}
          style={{ opacity: uploading ? '.5' : '1' }}
          className='bg-red-600 p-3 w-32 text-center rounded text-white'
        />
      </form>
    </main>
  )
}
