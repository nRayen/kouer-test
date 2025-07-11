import Image from "next/image";
import SignupForm from "@/components/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen sm:h-screen relative">
        <Image src="/images/signup_bg.jpg" alt="logo" fill className="object-cover z-0 top-0 left-0 select-none" draggable={false} />
      <SignupForm />
    </div>
  )
}

export default SignupPage;