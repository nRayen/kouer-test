import React from 'react'

const SeparatorWithText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={`flex gap-2.5 items-center mt-7.5 px-2.5 ${className}`}>
        <div className='w-full h-[1px] bg-decoration'></div>
        <h3 className='text-[16px] text-muted font-medium font-jakarta text-nowrap'>{text}</h3>
        <div className='w-full h-[1px] bg-decoration'></div>
    </div>
  )
}

export default SeparatorWithText