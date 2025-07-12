import React from 'react'
import Requirement from './ui/Requirement'

type PasswordRequirementsProps = {
  password: string
}

const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {

    const isLongEnough = password.length >= 8
    const hasNumber = /\d/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password)


  return (
    <div className='flex flex-col gap-2.5'>
        <Requirement isValid={hasLowercase} text='1 caractère minuscule' />
        <Requirement isValid={hasUppercase} text='1 caractère majuscule' />
        <Requirement isValid={hasNumber} text='1 chiffre' />
        <Requirement isValid={hasSpecialChar} text='1 caractère spécial' />
        <Requirement isValid={isLongEnough} text='Minimum 8 caractères' />
    </div>
  )
}

export default PasswordRequirements