'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId) return

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = () => {
      const google = (window as typeof window & { google?: any }).google
      if (!google) return
      google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: { credential: string }) => {
          setError('')
          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
            const result = await fetch(`${apiUrl}/api/auth/google`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ credential: response.credential }),
            })
            const data = await result.json()
            if (!result.ok) throw new Error(data.message || 'Google authentication failed')
            localStorage.setItem('researchradar_token', data.token)
            router.push('/')
          } catch (caught) {
            setError(caught instanceof Error ? caught.message : 'Google authentication failed')
          }
        },
      })
      google.accounts.id.renderButton(document.getElementById('google-sign-in'), { theme: 'outline', size: 'large', width: 360 })
    }
    document.head.appendChild(script)
    return () => { script.remove() }
  }, [router])

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const body = mode === 'login' ? { username, password } : { username, password, name, email }
    try {
      const response = await fetch(`${apiUrl}/api/auth/${mode}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Authentication failed')
      localStorage.setItem('researchradar_token', data.token)
      router.push('/')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Authentication failed')
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-slate-50 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">{mode === 'login' ? 'Sign in' : 'Create account'}</h1>
        {mode === 'register' && <>
          <label className="mt-5 block text-sm font-semibold">Name</label>
          <input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5" />
          <label className="mt-4 block text-sm font-semibold">Email</label>
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5" />
        </>}
        <label className="mt-5 block text-sm font-semibold">Username</label>
        <input required value={username} onChange={(event) => setUsername(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5" autoComplete="username" />
        <label className="mt-4 block text-sm font-semibold">Password</label>
        <input required minLength={mode === 'register' ? 8 : undefined} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
        <button className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white">{mode === 'login' ? 'Sign in' : 'Register'}</button>
        <div id="google-sign-in" className="mt-4 flex justify-center" />
        <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="mt-4 w-full text-sm font-semibold text-blue-600">
          {mode === 'login' ? 'Create an account' : 'Already have an account? Sign in'}
        </button>
      </form>
    </main>
  )
}
