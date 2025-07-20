'use client'
import AuthHeader from '@/components/AuthHeader'
import React, { useState } from 'react'
import InputWithLabel from '@/components/ui/InputWithLabel'
import PasswordInput from '@/components/ui/PasswordInput'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import SeparatorWithText from './ui/SeparatorWithText'
import Image from 'next/image'
import { googleSignup } from '@/utils/supabase/auth/auth'
import { supabase } from '@/utils/supabase/client'

type LoginData = {
  email: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const [error, setError] = useState({
    email: false,
    password: false
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false
  })

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return email.trim().length > 0 && emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length > 0
  }

  // Field validation helper
  const validateField = (fieldName: string, value: string): boolean => {
    switch (fieldName) {
      case 'email':
        return validateEmail(value)
      case 'password':
        return validatePassword(value)
      default:
        return true
    }
  }

  // Handle blur events
  const handleBlur = (fieldName: string, value: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
    
    const isValid = validateField(fieldName, value)
    setError(prev => ({ ...prev, [fieldName]: !isValid }))
  }

  // Handle input changes
  const handleInputChange = (fieldName: string, value: string, setter: (value: string) => void) => {
    setter(value)
    
    // If field was touched and had error, revalidate on change
    if (touched[fieldName as keyof typeof touched]) {
      const isValid = validateField(fieldName, value)
      setError(prev => ({ ...prev, [fieldName]: !isValid }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({
      email: true,
      password: true
    })

    // Validate all fields
    const newErrors = {
      email: !validateField('email', email),
      password: !validateField('password', password)
    }

    setError(newErrors)

    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some(error => error)
    if (hasErrors) {
      return
    }

    const formData: LoginData = {
      email,
      password,
    }

    try {
      const { error } = await supabase.auth.signInWithPassword(formData)
      if (error) throw error
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  const handleGoogleLogin = async () => {
    const data = await googleSignup()
    console.log(data)
  }

  return (
    <div className='bg-white flex flex-col justify-center items-center mx-auto py-[40px] w-full sm:h-full sm:mx-0 rounded-[20px] sm:overflow-y-auto no-scrollbar px-7.5 sm:w-[520px] md:w-[600px] lg:w-[530px] xl:w-[600px]'>
        <AuthHeader title="Commencez l'aventure !" />
        <form className='flex flex-col w-full mt-10 justify-center max-w-[280px] sm:mt-15 sm:max-w-[340px]' onSubmit={handleSubmit}>
          {/* Inputs */}
          <div className='flex flex-col gap-5 justify-center w-full'>
            <InputWithLabel 
              id='email' 
              label={"Adresse mail"} 
              type='email' 
              value={email} 
              onChange={(e) => handleInputChange('email', e.target.value, setEmail)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              error={error.email}
              required
            />
            <PasswordInput 
              id='password' 
              label='Mot de passe' 
              value={password} 
              onChange={(e) => handleInputChange('password', e.target.value, setPassword)}
              onBlur={(e) => handleBlur('password', e.target.value)}
              error={error.password}
              required
            />
          </div>

          {/* Forgot password */}
          <Link href={'/forgot-password'} className='text-muted font-semibold text-[14px] mt-[15px] font-jakarta cursor-pointer underline underline-offset-6 decoration-1 w-fit'>Mot de passe oublié ?</Link>

          {/* Connexion */}
          <div className='flex flex-col gap-[15px] justify-center w-full mt-5'>
            <Button type='submit' variant='primary'>Se connecter</Button>
            <Button type='button' variant='secondary' onClick={() => router.push('/signup')}>Créer un compte</Button>
          </div>
        </form>

        <SeparatorWithText text='ou se connecter avec' className='w-full mt-7.5 max-w-[280px] sm:max-w-[420px]' />

        <button className='flex items-center justify-center mx-auto rounded-full h-[50px] w-[50px] mt-5 cursor-pointer border border-decoration' onClick={handleGoogleLogin}>
            <Image src={'/images/google.svg'} width={30} height={30} alt='google' />
          </button>
    </div>
  )
}

export default LoginForm