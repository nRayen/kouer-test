import React from 'react'
import { createClient } from '@/utils/supabase/server'
import LogoutButton from '@/components/ui/LogoutButton'
import Link from 'next/link'

const DashboardPage = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return user ? (
        <div className='flex flex-col gap-5 items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Dashboard</h1>
            <p>Connecté en tant que : {user?.email}</p>
            <LogoutButton />
        </div>
    ) : (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Aucun utilisateur connecté</h1>
            <Link href='/login'>Se connecter</Link>
            <Link href='/signup'>Créer un compte</Link>
        </div>
    )
}

export default DashboardPage