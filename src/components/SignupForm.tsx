'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import InputWithLabel from '@/components/ui/InputWithLabel'
import PasswordInput from '@/components/ui/PasswordInput'
import Link from 'next/link'
import PasswordRequirements from '@/components/PasswordRequirements'
import { googleSignup, signup } from '@/utils/supabase/auth/auth'
import AuthHeader from '@/components/AuthHeader'
import SeparatorWithText from '@/components/ui/SeparatorWithText'
import Button from '@/components/ui/Button'

type FormData = {
  lastname: string
  firstname: string
  phone: string
  email: string
  password: string
  birthdate: string
}

type SignupFormProps = {
  handleFormCompletion: (email: string) => void
}

const SignupForm = ({ handleFormCompletion }: SignupFormProps) => {
  const [lastname, setLastname] = useState<string>('')
  const [firstname, setFirstname] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [birthdate, setBirthdate] = useState<string>('')

  const [error, setError] = useState({
    lastname: false,
    firstname: false,
    phone: false,
    email: false,
    password: false,
    birthdate: false
  })

  const [touched, setTouched] = useState({
    lastname: false,
    firstname: false,
    phone: false,
    email: false,
    password: false,
    birthdate: false
  })

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^0[1-9]\d{8}$/
    return phoneRegex.test(phone)
  }

  const isLongEnough = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password)

  const validatePassword = (): boolean => {
    return isLongEnough && hasNumber && hasUppercase && hasLowercase && hasSpecialChar
  }

  const validateField = (fieldName: string, value: string): boolean => {
    switch (fieldName) {
      case 'lastname':
      case 'firstname':
        return value.trim().length > 0
      case 'email':
        return value.trim().length > 0 && validateEmail(value)
      case 'phone':
        return value.trim().length > 0 && validatePhone(value)
      case 'birthdate':
        return value.trim().length > 0
      case 'password':
        return value.length > 0 && validatePassword()
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
    
    setTouched({
      lastname: true,
      firstname: true,
      phone: true,
      email: true,
      password: true,
      birthdate: true
    })

    const newErrors = {
      lastname: !validateField('lastname', lastname),
      firstname: !validateField('firstname', firstname),
      phone: !validateField('phone', phone),
      email: !validateField('email', email),
      password: !validateField('password', password),
      birthdate: !validateField('birthdate', birthdate)
    }

    setError(newErrors)

    const hasErrors = Object.values(newErrors).some(error => error)
    if (hasErrors) {
      return
    }
    
    const formData: FormData = {
      lastname,
      firstname,
      phone,
      email,
      password,
      birthdate
    }
    
    try {
      const response = await signup(formData)
      if (response) handleFormCompletion(email)
    } catch (error) {
      console.error(error)
    }
  }

  const handleGoogleSignup = async () => {
    const data = await googleSignup()
    console.log(data)
  }

  return (
        <div className='bg-white flex flex-col min-h-full h-full mx-auto py-[60px] sm:max-h-full sm:mx-0 rounded-[20px] sm:overflow-y-auto no-scrollbar px-7.5 sm:max-w-[520px] md:max-w-[600px] lg:max-w-[530px] xl:max-w-[600px]'>
          {/* Logo */}
          <AuthHeader title="Commencez l'aventure !" />

          {/* Google */}
          <button className='flex items-center justify-center w-[260px] mx-auto gap-2.5 text-[16px] text-muted font-medium font-jakarta rounded-full h-[44px] mt-7.5 sm:mt-10 cursor-pointer border border-decoration sm:w-[300px] sm:py-[10px]' onClick={handleGoogleSignup}>
            <Image src={'/images/google.svg'} width={30} height={30} alt='google' />
            <p>Continuer avec google</p>
          </button>

          {/* Create account */}
          <SeparatorWithText text='Ou créer un compte Kouer' />

          {/* Form */}
          <form className='flex flex-col w-full mt-7.5' onSubmit={handleSubmit}>
            {/* Inputs */}
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-5 sm:flex-row sm:gap-5'>
                <InputWithLabel 
                  id='lastname' 
                  label={"Nom"} 
                  type='text' 
                  value={lastname} 
                  onChange={(e) => handleInputChange('lastname', e.target.value, setLastname)}
                  onBlur={(e) => handleBlur('lastname', e.target.value)}
                  error={error.lastname} 
                  required 
                />
                <InputWithLabel 
                  id='firstname' 
                  label={"Prénom"} 
                  type='text' 
                  value={firstname} 
                  onChange={(e) => handleInputChange('firstname', e.target.value, setFirstname)}
                  onBlur={(e) => handleBlur('firstname', e.target.value)}
                  error={error.firstname} 
                  required 
                />
              </div>
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
              <div className='flex flex-col gap-5 sm:flex-row sm:gap-5'>
                <InputWithLabel 
                  id='phone' 
                  label={"Numéro de téléphone"} 
                  type='tel' 
                  value={phone} 
                  onChange={(e) => handleInputChange('phone', e.target.value, setPhone)}
                  onBlur={(e) => handleBlur('phone', e.target.value)}
                  error={error.phone} 
                  required 
                />
                <InputWithLabel 
                  id='birthdate' 
                  label={"Date de naissance"} 
                  type='date' 
                  value={birthdate} 
                  onChange={(e) => handleInputChange('birthdate', e.target.value, setBirthdate)}
                  onBlur={(e) => handleBlur('birthdate', e.target.value)}
                  placeholder='JJ/MM/AAAA' 
                  error={error.birthdate} 
                  required 
                />
              </div>
              <PasswordInput 
                id='password' 
                label='Mot de passe' 
                value={password} 
                onChange={(e) => handleInputChange('password', e.target.value, setPassword)}
                onBlur={(e) => handleBlur('password', e.target.value)}
                error={error.password} 
                required 
              />

              {/* Password control */}
              <PasswordRequirements password={password} isLongEnough={isLongEnough} hasNumber={hasNumber} hasUppercase={hasUppercase} hasLowercase={hasLowercase} hasSpecialChar={hasSpecialChar} />
            </div>

            {/* Conditions */}
            <div className='flex gap-2.5 mt-5'>
              <input type='checkbox' id='conditions' className='w-[14px] h-[14px] flex-shrink-0 bg-decoration appearance-none rounded-xs border-transparent checked:bg-accent' required/>
              <label htmlFor='conditions' className='text-foreground text-[14px]'>En créeant un compte vous acceptez les <Link href={'https://www.kouer.fr/cgv-cgu'} target='blank' className='underline'>Conditions Générales d&apos;Utilisation</Link> et les <Link href={'https://www.kouer.fr/cgv-cgu'} target='blank' className='underline'>Conditions Générales de Vente</Link> & <Link href={'https://www.kouer.fr/politique-de-confidentialite'} target='blank' className='underline'>Politique de confidentialité</Link> de Kouer.</label>
            </div>
          
            {/* Button */}
            <Button type='submit' variant='primary' className='mt-5'>Je crée mon compte</Button>
          
            {/* Connexion */}
            <p className='text-muted font-medium text-base mt-[15px] font-jakarta'>J&apos;ai déjà un compte<Link href={'/login'} className='text-accent ml-2.5'>Se connecter</Link></p>
          </form>
      </div>
  )
}

export default SignupForm