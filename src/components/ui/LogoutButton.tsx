"use client"

import React from 'react'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }
  return (
    <button onClick={() => handleLogout()} className='bg-accent text-white px-4 py-2 rounded-md cursor-pointer'>Déconnexion</button>
  )
}

export default LogoutButton