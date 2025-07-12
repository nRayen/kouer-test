import Image from 'next/image'
import React from 'react'


type SelectInputProps = {
  id: string
  label: string
  placeholder?: string
  options: string[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectInput = ({ id, label, placeholder, options, value, onChange }: SelectInputProps) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor={id} className='text-muted text-[16px] pl-5'>{label}</label>
        <div className='flex bg-bg-secondary rounded-full h-11 overflow-hidden relative'>
            <select id={id} name={id} className={`w-full p-2.5 pl-5 text-[16px] placeholder:text-muted focus:outline-none appearance-none invalid:text-muted `} required value={value} onChange={onChange}>
                <option value='' disabled hidden>{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <div className='absolute right-[5px] top-1/2 -translate-y-1/2 pointer-events-none bg-white w-[35px] h-[35px] flex items-center justify-center rounded-full'>
                <Image src={'/images/chevron_down.svg'} alt='arrow_down' width={25} height={25} className='pointer-events-none' />
            </div>
        </div>
    </div>
  )
}

export default SelectInput