import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => { 
    return (
        <div className="min-h-screen h-fit sm:h-screen p-5 relative bg-[url('/images/signup_bg.jpg')] bg-cover bg-center flex items-center justify-center lg:justify-start xl:justify-center">
            {children}
        </div>
    )
}

export default AuthLayout