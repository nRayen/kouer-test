'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import InputWithLabel from './ui/InputWithLabel'
import PasswordInput from './ui/PasswordInput'
import Link from 'next/link'
import SelectInput from './ui/SelectInput'
import PasswordRequirements from './PasswordRequirements'

type EntrepriseType = 'Entreprise' | 'Particulier' | ''
type LocalisationType = 'Île de France' | 'Bretagne' | 'Provence-Alpes-Côte d\'Azur' | ''

type FormData = {
  entreprise: string
  type: EntrepriseType
  localisation: LocalisationType
  phone: string
  email: string
  password: string
  confirmPassword: string
}
const SignupForm = () => {

  const [entreprise, setEntreprise] = useState<string>('')
  const [type, setType] = useState<EntrepriseType>('')
  const [localisation, setLocalisation] = useState<LocalisationType>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const isLongEnough = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!entreprise || !type || !localisation || !phone || !email) return alert('Veuillez remplir tous les champs')
    if (!isLongEnough || !hasNumber || !hasUppercase || !hasLowercase || !hasSpecialChar) return alert('Le mot de passe ne respecte pas les critères de sécurité')
    if (password !== confirmPassword) return alert('Les mots de passe ne correspondent pas')
    
    const formData: FormData = {
      entreprise,
      type,
      localisation,
      phone,
      email,
      password,
      confirmPassword
    }
    console.log(formData)
    alert('Votre compte a été créé avec succès')
  }

  return (
    <div className={`w-full h-screen inset-0 z-10 sm:p-5`}>
      <div className='bg-white flex flex-col gap-10 min-h-full h-full max-w-[530px] mx-auto py-[60px] sm:max-h-full sm:mx-0 sm:rounded-3xl sm:overflow-y-auto no-scrollbar'>
          <header className='flex flex-col gap-2.5 justify-center items-center'>
            <Image src={"/images/logo.png"} width={160} height={45} alt='logo'/>
            <h2 className='text-[20px] text-accent font-medium h-[30px]'>Commencez l&apos;aventure !</h2>
          </header>

          <form className='flex flex-col w-full px-[45px]' onSubmit={handleSubmit}>

            {/* Inputs */}
            <div className='flex flex-col gap-5'>
              <InputWithLabel id='entreprise' label={"Nom de l'entreprise"} type='text' value={entreprise} onChange={(e) => setEntreprise(e.target.value)} />
              <SelectInput id='type' label={"Type d'entreprise"} options={['Entreprise', 'Particulier']} placeholder='Sélectionner un type d&apos;entreprise' value={type} onChange={(e) => setType(e.target.value as EntrepriseType)} />
              <SelectInput id='localisation' label={"Localisation"} options={['Île de France', 'Bretagne', 'Provence-Alpes-Côte d\'Azur']} placeholder='Sélectionner une région' value={localisation} onChange={(e) => setLocalisation(e.target.value as LocalisationType)} />
              <InputWithLabel id='phone' label={"Numéro de téléphone"} type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} />
              <InputWithLabel id='email' label={"Adresse mail"} type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

              <PasswordInput id='password' label='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />

              {/* Password control */}
              <PasswordRequirements password={password} isLongEnough={isLongEnough} hasNumber={hasNumber} hasUppercase={hasUppercase} hasLowercase={hasLowercase} hasSpecialChar={hasSpecialChar} />

              <PasswordInput id='confirm_password' label='Confirmer le mot de passe' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            {/* Conditions */}
            <p className='text-foreground text-[14px] mt-5'>En créeant un compte vous acceptez les <Link href={'https://www.kouer.fr/cgv-cgu'} target='blank' className='underline'>Conditions Générales d&apos;Utilisation</Link> et les <Link href={'https://www.kouer.fr/cgv-cgu'} target='blank' className='underline'>Conditions Générales de Vente</Link> & <Link href={'https://www.kouer.fr/politique-de-confidentialite'} target='blank' className='underline'>Politique de confidentialité</Link> de Kouer.</p>
          
            {/* Button */}
            <button type='submit' className='bg-accent text-white text-[16px] font-medium rounded-full h-11 mt-[15px] cursor-pointer'>Je crée mon compte</button>
          
            {/* Connexion */}
            <p className='text-muted font-medium text-base mt-[15px] font-jakarta'>J&apos;ai déjà un compte<Link href={'/login'} className='text-accent ml-2.5'>Se connecter</Link></p>
          </form>
      </div>
    </div>
  )
}

export default SignupForm