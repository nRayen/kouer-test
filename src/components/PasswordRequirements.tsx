import React from 'react'
import Requirement from './ui/Requirement'

type PasswordRequirementsProps = {
  password: string
  isLongEnough: boolean
  hasNumber: boolean
  hasUppercase: boolean
  hasLowercase: boolean
  hasSpecialChar: boolean
}

const PasswordRequirements = ({ isLongEnough, hasNumber, hasUppercase, hasLowercase, hasSpecialChar }: PasswordRequirementsProps) => {

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