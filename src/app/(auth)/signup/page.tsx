// import Image from "next/image";
'use client'
import SignupForm from "@/components/SignupForm";
import MailValidation from "@/components/MailValidation";
import { useState } from "react";

const SignupPage = () => {
  const [step, setStep] = useState<'signup' | 'validation'>('signup')
  const [email, setEmail] = useState<string | null>(null)

  const handleFormCompletion = (email: string) => {
    setEmail(email)
    setStep('validation')
  }

  return step === 'signup' ? (
    <SignupForm handleFormCompletion={handleFormCompletion} />
  ) : (
    email && <MailValidation email={email} />
  )

}

export default SignupPage;