'use client'
import Image from 'next/image'
import { useState } from 'react'

type PasswordInputProps = {
    id: string
    label: string
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    error?: boolean
    required?: boolean
}

const PasswordInput = ({id, label, placeholder, value, onChange, onBlur, error, required = false}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='flex flex-col'>
        <label htmlFor={id} className='text-muted text-[16px] pl-5'>{label}</label>
        <div className={`flex items-center justify-between bg-bg-secondary rounded-full h-11 overflow-hidden border ${error ? 'border-error' : 'border-transparent'}`}>
            <input 
              type={showPassword ? 'text' : 'password'} 
              id={id} 
              name={id} 
              placeholder={placeholder} 
              className={`w-full py-2.5 px-5 text-[16px] placeholder:text-muted focus:outline-none`} 
              value={value} 
              onChange={onChange}
              onBlur={onBlur}
              required={required}
            />
            <button type='button' onClick={() => setShowPassword(!showPassword)} className='text-accent mr-4.5 cursor-pointer'>
                <Image src={showPassword ? '/images/eye_open.svg' : '/images/eye_closed.svg'} alt='eye' width={24} height={24} />
            </button>
        </div>
    </div>
  )
}

export default PasswordInput