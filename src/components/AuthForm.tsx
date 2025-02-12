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
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

type Variant = 'LOGIN' | 'REGISTER'

export default function AuthForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(true);

  const { 
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const toggleVariant = useCallback(() => {
    if(variant === 'LOGIN') {
      setVariant('REGISTER');
    }
    else {
      setVariant('LOGIN');
    }
  }, [variant])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if(variant === 'REGISTER') {
      //axios register
    } else if (variant === 'LOGIN') {
      //nextauth signin
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    //nextauth sso
  }

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
                      type="name"
                      placeholder="Tyler Durden"
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      required
                    />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="cn@example.com"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    disabled={isLoading}
                    register={register}
                    errors={errors} 
                    required
                  />
                </div>
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
