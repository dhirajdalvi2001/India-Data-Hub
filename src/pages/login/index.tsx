import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import DefaultLayout from '@/layouts/default'
import { authStateAtom } from '@/utils/global'
import AuthLayout from '@/layouts/auth'
import { initialLoginValues, loginValidationSchema, LoginValues } from '@/utils/validations'
import { addToast } from '@heroui/toast'

export default function LoginPage() {
    const [authState, setAuthState] = useAtom(authStateAtom)
    const navigate = useNavigate();

    const {handleSubmit, register, setValue, setError, formState: {errors}} = useForm({
        defaultValues: initialLoginValues,
        resolver: zodResolver(loginValidationSchema)
    })

    function autoFill() {
        setValue('email', 'admin@indiadatahub.com')
        setValue('password', 'Admin@123')
    }

    function checkValidation(values: LoginValues) {
        if (values.email === 'admin@indiadatahub.com' && values.password === 'Admin@123') {
            return true
        }

        return false
    }

    function onSubmit(data: LoginValues) {
        const isValid = checkValidation(data);

        if (isValid) {
            setAuthState(true)
            navigate('/')
            addToast({
                title: "Login Successfull!",
                description: "You have been logged in successfully.",
                variant:"solid",
                color:"primary"
            });
        } else {
            
            if (data.email !== 'admin@indiadatahub.com') {
                setError('email', {
                    type: 'manual',
                    message: 'Invalid email address'
                })
            }
            if (data.password !== 'Admin@123') {
                setError('password', {
                    type: 'manual',
                    message: 'Invalid password'
                })
            }
        }
    }

    useEffect(() => {
        if (authState) {
            navigate('/')
        }
    }, [authState])

  return (
    <DefaultLayout>
      <AuthLayout>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 sm:gap-6"
        >
          <Input
            placeholder="Email Address"
            required={true}
            variant="flat"
            className="rounded-sm"
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            {...register('email')}
          />
          <Input
            placeholder="Password"
            required={true}
            variant="flat"
            className="rounded-sm"
            errorMessage={errors.password?.message} 
            isInvalid={!!errors.password}
            {...register('password')}
          />
          <Button
            type="submit"
            color="primary"
            className="mt-4 bg-primary text-white rounded-sm"
            variant="solid"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-2 sm:mt-4 flex justify-between items-center gap-4">
          <a href="#" className="underline">Forgot password?</a>
          <a href="#" className="underline">Don&apos;t have an account? Sign Up</a>
        </div>
        <div className="p-1.5 px-4 fixed bottom-4 right-4 text-xs bg-primary/10 rounded-sm sm:rounded-md">
            <p>For this assignment just use the following credentials:</p>
            <ul>
                <li>Email: <span className='font-semibold'>admin@indiadatahub.com</span></li>
                <li>Password: <span className='font-semibold'>Admin@123</span></li>
            </ul>
            <Button size="sm" variant="solid" color="primary" className="mt-2 h-6 bg-primary text-white rounded-sm" onPress={autoFill}>Fill creds</Button>
        </div>
      </AuthLayout>
    </DefaultLayout>
  );
}
