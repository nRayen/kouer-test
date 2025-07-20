import Image from 'next/image'
import React from 'react'

type AuthHeaderProps = {
  title: string
  className?: string
}

const AuthHeader = ({title, className}: AuthHeaderProps) => {
  return (
    <header className={`flex flex-col gap-2.5 justify-center items-center ${className}`}>
        <Image src={"/images/logo.png"} width={160} height={45} alt='logo'/>
        <h2 className='text-[20px] text-accent font-medium h-[30px]'>{title}</h2>
    </header>
  )
}

export default AuthHeader