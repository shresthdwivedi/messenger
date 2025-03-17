"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { FiGithub } from "react-icons/fi"
import { FaGoogle } from "react-icons/fa"
import { useCallback, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "sonner";
import { signIn, useSession }  from "next-auth/react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginSchema, signupSchema, SignupSchema } from "@/lib/types/authSchema";

type Variant = 'LOGIN' | 'REGISTER'

export default function AuthForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const { setTheme } = useTheme();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router])

  useEffect(() => {
    setTheme("dark"); 
    return () => setTheme("system"); 
  }, [setTheme]);

  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset,
  } = useForm<(SignupSchema | LoginSchema)>({
    resolver: zodResolver(variant === 'REGISTER' ? signupSchema : loginSchema),
  })

  const toggleVariant = useCallback(() => {
    if(variant === 'LOGIN') {
      setVariant('REGISTER');
    }
    else {
      setVariant('LOGIN');
    }
  }, [variant, reset])

  const onSubmit: SubmitHandler<SignupSchema | LoginSchema> = async(data: SignupSchema | LoginSchema) => {

    setIsLoading(true);

    if (variant === 'REGISTER') {
      await axios.post('api/register', data)
    }

    const loginPromise = signIn('credentials', { ...data, redirect: false })

    toast.loading('Loading...')
    
    loginPromise
    .then((callback) => {
      if (callback?.error) {
        toast.dismiss();
        return Promise.reject(new Error(callback.error));
      } 
      else if (callback?.ok) {
        toast.dismiss();
        if (variant ==='REGISTER' && 'name' in data) {
          toast.success(`Hello ${data.name}`,{
            description: 'Welcome to Messenger!',
          })
        } else {
          toast.success(`Logged in to ${data.email}`,{
            description: 'Welcome back!',
          })
        }
        router.push('/users');
        reset();
      }
    })
    .catch((error) => {
      toast.error('An error occurred', {
        description: error.message,
      });
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    const loginPromise = signIn(action, { redirect: false })
    
    toast.promise(loginPromise, {
      loading: 'Loading...',
      success: 'Redirecting...',
      error: (error) => error.message || 'An error occurred',
    });
    
    loginPromise
    .then((callback) => {
      if (callback?.error) {
        return Promise.reject(new Error(callback.error));
      } 
      else {
        router.push('/users');
      }
    })
    .catch((error) => {
      toast.error(error.message || 'An error occurred');
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className={cn("flex flex-row gap-6", className)} {...props}>
      <Card className="min-w-[5rem] sm:min-w-[25rem]">
        <CardHeader className="text-center items-center justify-center">
          <Image src="/black-chat.png" alt="logo" height={50} width={50} className="rounded-xl"/>
          <CardTitle className="text-3xl">
            Messenger
          </CardTitle>
          <CardDescription>
            {variant === 'LOGIN' ? 'Login with your Google or GitHub account' : 'Sign up using Google or GitHub'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" disabled={isLoading} onClick={() => socialAction('github')} className="w-full">
                  <FiGithub />
                  GitHub
                </Button>
                <Button variant="outline" disabled={isLoading} onClick={() => socialAction('google')} className="w-full">
                  <FaGoogle />
                  Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-neutral-200 dark:after:border-neutral-800">
                <span className="relative z-10 bg-white px-2 text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                {variant === 'REGISTER' && (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tyler Durden"
                      disabled={isLoading}
                      {...register('name', { required: 'Name is required!' })}
                      errors={errors}
                      required
                    />
                    {'name' in errors && errors.name && (
                      <p className="text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="cn@example.com"
                    disabled={isLoading}
                    {...register('email', { required: 'Email is required!' })}
                    errors={errors}
                    required
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    disabled={isLoading}
                    {...register('password', { required: 'Password is required!' })}
                    errors={errors} 
                    required
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                  )}
                </div>
                {variant === 'REGISTER' && (
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      disabled={isLoading}
                      {...register('confirmPassword', { required: 'ConfirmPassword is required!' })}
                      errors={errors}
                      required
                    />
                  {'confirmPassword' in errors && errors.confirmPassword && (
                    <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                  )}
                  </div>
                )}
                <Button type="submit" disabled={isLoading} className="w-full font-semibold">
                  {variant=== 'LOGIN' ? 'Login' : 'Register'}
                </Button>
              </div>
              {variant === 'LOGIN' ? (
                <div className="text-center text-sm">
                  Don&apos;t have an account?{""}
                  <Button variant={'link'} onClick={toggleVariant} disabled={isLoading} type="submit" className="px-0.5">
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="text-center text-sm">
                  Already have an account?{""}
                  <Button variant={'link'} onClick={toggleVariant} disabled={isLoading} type="submit" className="px-0.5">
                  Log In
                  </Button>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      {/* <div className="text-balance text-center text-xs text-neutral-500 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-neutral-900  dark:text-neutral-400 dark:[&_a]:hover:text-neutral-50">

      </div> */}
    </div>
  )
}

