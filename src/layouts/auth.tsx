import React from 'react'
import { Lock } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-10 sm:py-20 flex flex-col justify-center items-center gap-6 sm:gap-8 h-full">
      <div className="flex flex-col items-center">
        <div className="p-2 sm:p-3 w-fit bg-primary rounded-full">
          <Lock className="w-6 sm:w-10 h-6 sm:h-10 text-white" />
        </div>
        <h3 className='text-center text-primary text-xl sm:text-3xl'>Sign in</h3>
      </div>
      <div className="max-w-md w-full">{children}</div>
    </div>
  );
}
