// import Image from "next/image";
import SignupForm from "@/components/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen h-fit sm:h-screen relative bg-[url('/images/signup_bg.jpg')] bg-cover bg-center">
      <SignupForm />
    </div>
  )
}

export default SignupPage;