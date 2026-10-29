'use client'

import { ChangeEvent, useEffect, useState } from 'react'

type UploadRecord = { _id: string; originalName: string; url: string; mimeType: string; size: number }

export default function UploadsPage() {
  const [files, setFiles] = useState<UploadRecord[]>([])
  const [message, setMessage] = useState('')
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  const token = typeof window !== 'undefined' ? localStorage.getItem('researchradar_token') : null

  async function loadFiles() {
    try {
      const response = await fetch(`${apiUrl}/api/uploads`, { headers: { Authorization: `Bearer ${token}` } })
      if (response.ok) setFiles(await response.json())
    } catch { setMessage('Unable to load uploaded files') }
  }

  useEffect(() => { if (token) loadFiles() }, [])

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setMessage('')
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch(`${apiUrl}/api/uploads`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData,
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Upload failed')
      setFiles((current) => [data, ...current])
      setMessage(`${file.name} uploaded successfully`)
      event.target.value = ''
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Upload failed') }
  }

  async function remove(id: string) {
    const response = await fetch(`${apiUrl}/api/uploads/${id}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
    })
    if (response.ok) setFiles((current) => current.filter((file) => file._id !== id))
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Upload research files</h1>
        <p className="mt-2 text-sm text-slate-500">PDF, Word, JPEG, or PNG. Maximum file size: 5 MB.</p>
        <label className="mt-6 block rounded-xl border border-dashed border-slate-300 p-8 text-center font-semibold text-blue-600">
          Choose a file
          <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={upload} className="hidden" />
        </label>
        {message && <p className="mt-4 text-sm font-medium">{message}</p>}
        <div className="mt-6 space-y-2">
          {files.map((file) => (
            <div key={file._id} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
              <a href={`${apiUrl}${file.url}`} target="_blank" rel="noreferrer" className="truncate text-sm font-semibold text-blue-600">{file.originalName}</a>
              <button onClick={() => remove(file._id)} className="ml-4 text-sm font-semibold text-red-600">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
