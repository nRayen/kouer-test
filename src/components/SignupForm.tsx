import Image from 'next/image'
import React from 'react'

const SignupForm = () => {
  return (
    <div className={`w-full h-full sm:absolute inset-0 z-10 sm:p-5`}>
      <div className='bg-white flex flex-col gap-10 h-full max-w-[530px] mx-auto px-5 py-[60px] sm:mx-0 sm:rounded-3xl'>
          <header className='flex flex-col gap-2.5 justify-center items-center'>
            <Image src={"/images/logo.png"} width={160} height={45} alt='logo'/>
            <h2 className='text-[20px] text-accent font-medium h-[30px]'>Commencez l&apos;aventure !</h2>
          </header>

          <form className='flex flex-col w-full h-[1200px]'>
          </form>
      </div>
    </div>
  )
}

export default SignupForm