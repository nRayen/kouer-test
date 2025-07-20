import React from 'react'
import AuthHeader from '@/components/AuthHeader'
import Image from 'next/image'
import SeparatorWithText from '@/components/ui/SeparatorWithText'
import Link from 'next/link'
import { resendEmailConfirmation } from '@/utils/supabase/auth/auth'

type MailValidationProps = {
  email: string
}

const MailValidation = ({ email }: MailValidationProps) => {

    const handleResendEmail = async () => {
        try {
            await resendEmailConfirmation(email)
            alert('Email de confirmation renvoyé !')
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className='bg-white flex flex-col items-center mx-auto px-5 py-[40px] h-fit w-full sm:py-[60px] sm:px-10 sm:mx-0 rounded-[20px] sm:overflow-y-auto no-scrollbar  sm:w-[520px] md:w-[600px] lg:w-[530px] xl:w-[600px]'>
        <AuthHeader title="Validatez votre email" className='mb-7.5' />
        <div className='font-jakarta text-foreground'>
            <p className='mb-5'>Merci pour ton inscription !</p>
            <p>Nous t&apos;avons envoyé un email de confirmation à l&apos;adresse suivante : {email}</p>
            <p>Clique sur le lien dans cet email pour activer ton compte.</p>

            <section className='flex flex-col gap-5 p-5 bg-bg-secondary rounded-[10px] mt-10'>
                <div className='flex items-center gap-2.5'>
                    <Image src="/images/forgot_password.svg" alt="lock" width={24} height={24} />
                    <p>Pas reçu l&apos;email ?</p>
                </div>
                <p>Vérifie ton dossier spam ou courrier indésirable.<br/><br/>
                ou <button className='text-accent decoration-accent underline cursor-pointer' onClick={handleResendEmail}>renvoyer l&apos;email de confirmation</button></p>
            </section>

            <SeparatorWithText text='Mauvaise adresse ?' className='mt-10' />

            <p className='mt-10'>Tu peux changer ton adresse : <Link href={`/signup?email=${email}`} className='text-accent decoration-accent underline cursor-pointer'>Modifier mon adresse email</Link></p>
        </div>
    </div>
  )
}

export default MailValidation