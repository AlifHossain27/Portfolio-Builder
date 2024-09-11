"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from './ui/button'

const Logout = () => {
    const router = useRouter()
    const logout = async() => {
        await fetch('http://localhost:8000/api/logout/',{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          credentials: 'include'
        })
        
        await router.push('/')
      }
  return (
    <Button variant="ghost" className='text-md text-gray-400' onClick={logout}>Logout</Button>
  )
}

export default Logout