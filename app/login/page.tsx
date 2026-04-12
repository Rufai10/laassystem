import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-white dark:bg-zinc-950 p-6 md:p-10">
      <div className="flex w-full max-w-[1200px] flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between">
        
        {/* Left Column: Abstract Image */}
        <div className="relative w-full md:w-[55%]">
          <div className="aspect-[4/5] overflow-hidden rounded-[40px] shadow-2xl">
            <img
              src="/login-bg.png"
              alt="Login Background"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="flex w-full flex-col items-center justify-center md:w-[40%]">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
