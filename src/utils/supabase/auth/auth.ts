import { supabase } from '@/utils/supabase/client'

type SignupData = {
  lastname: string
  firstname: string
  phone: string
  email: string
  password: string
  birthdate: string
}

type LoginData = {
  email: string
  password: string
}

const signup = async (signupData: SignupData) => {
  const { lastname, firstname, phone, email, password, birthdate } = signupData
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        lastname,
        firstname,
        phone,
        birthdate,
      },
    },
  })

  if (error) throw error
  return data
}

const login = async (loginData: LoginData) => {
  const { email, password } = loginData

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

const resendEmailConfirmation = async (email: string) => {
  const { data, error } = await supabase.auth.resend({
    email,
    type: 'signup',
  })

  if (error) throw error
  return data
}

const googleSignup = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      scopes: 'email',
    },
  })
  if (error) throw error
  return data
}

export { signup, login, resendEmailConfirmation, googleSignup }