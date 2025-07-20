import React from 'react'


type InputWithLabelProps = {
  id: string
  label: string
  type: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  className?: string
  error?: boolean
  required?: boolean
}

const InputWithLabel = ({ id, label, type, placeholder, value, onChange, onBlur, className, error = false, required = false }: InputWithLabelProps) => {
  return (
    <div className='flex flex-col flex-1'>
        <label htmlFor={id} className='text-muted text-[16px] pl-5'>{label}</label>
        <div className={`flex bg-bg-secondary rounded-full h-11 overflow-hidden border ${error ? 'border-error' : 'border-transparent'}`}>
            <input 
              type={type} 
              id={id} 
              name={id} 
              placeholder={placeholder} 
              className={`no-calendar-picker w-full p-2.5 pl-5 text-[16px] placeholder:text-muted focus:outline-none appearance-none ${className}`} 
              value={value} 
              onChange={onChange}
              onBlur={onBlur}
              required={required}
            />
        </div>
    </div>
  ) 
}

export default InputWithLabel