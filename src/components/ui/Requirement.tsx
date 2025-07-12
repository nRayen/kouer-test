import Image from 'next/image'
import React from 'react'

type RequirementProps = {
  isValid: boolean
  text: string
}

const Requirement = ({ isValid, text }: RequirementProps) => {
  return (
    <div className='flex items-center text-[14px]'>
        <Image src={isValid ? '/images/valid_check.svg' : '/images/invalid_cross.svg'} alt='eye' width={24} height={24} />
        <p className={`${isValid ? 'text-accent' : 'text-[#F25C5C]'}`}>{text}</p>
    </div>
  )
}

export default Requirement