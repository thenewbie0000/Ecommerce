'use client'
import React, { SyntheticEvent, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { getCSRFToken } from '@/lib'
import { IsLoggedInContext } from '@/contexts/IsLoggedIn'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext)

  // const csrfToken = getCSRFToken()

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const res = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': csrfToken!,
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await res.json()
    console.log('res: ', res)
    console.log('data: ', data)

    if (res.ok) {
      setMessage('Log in successful')
      setLoginSuccess(true)
      setIsLoggedIn(true)
      await router.push('/')
    } else {
      await router.push('/login')
      setMessage(data.detail)
    }
  }

  return (
    <div className='flex h-[calc(100vh-100px)] w-full items-center justify-center'>
      <h3 className={`${loginSuccess ? 'text-green-500' : 'text-red-500'}`}>
        {message}
      </h3>
      <form onSubmit={submit} className="text-black border rounded-xl shadow-xl w-[35%] h-[500px] flex flex-col items-center justify-center">
        <h1 className="my-4 text-2xl font-bold">Log in</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
          <Label htmlFor="email">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button className='my-4' type="submit">Log in</Button>
      </form>
    </div>
  )
}

export default Login