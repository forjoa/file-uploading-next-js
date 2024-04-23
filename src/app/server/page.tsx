import { writeFile } from 'fs/promises'
import { join } from 'path'

export default function ServerUploadPage() {
  async function upload(data: FormData) {
    'use server'

    const file: File | null = data.get('file') as unknown as File

    if (!file) throw new Error('no file uploaded')

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = join(process.cwd(), '/', 'tmp', file.name)
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    return { success: true }
  }
  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <form action={upload}>
        <input type='file' name='file' />
        <input
          type='submit'
          value='Upload'
          className='bg-red-500 p-3 rounded'
        />
      </form>
    </main>
  )
}
