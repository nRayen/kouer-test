import React from 'react'


type InputWithLabelProps = {
  id: string
  label: string
  type: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputWithLabel = ({ id, label, type, placeholder, value, onChange }: InputWithLabelProps) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor={id} className='text-muted text-[16px] pl-5'>{label}</label>
        <div className='flex bg-bg-secondary rounded-full h-11 overflow-hidden'>
            <input type={type} id={id} name={id} placeholder={placeholder} className={`w-full p-2.5 pl-5 text-[16px] placeholder:text-muted focus:outline-none`} value={value} onChange={onChange} />
        </div>
    </div>
  )
}

export default InputWithLabel