"use client"
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import Link from 'next/link'
import { LoaderCircle } from 'lucide-react';
import { Label } from '@/components/ui/label'


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, {
        message: "Password must be at least 4 characters.",
      }),
  })

const LoginPage = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
      const res = await fetch("http://localhost:8000/api/login/",{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          'email': values.email,
          'password': values.password
      })
    })
    if (res.ok){
      await router.refresh()
      await router.push("/")
    }else{
      await router.refresh()
    }
    }

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
    <Suspense fallback = {
            <div className='pt-20'>
              <LoaderCircle className= "animate-spin" size= "50"/>
            </div>
      }>
    <div className='flex'>
        <Card className='rounded-lg border-4 border-secondary h-max w-[350px]'>
                <CardHeader>
                    <CardTitle className='text-2xl'>
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                                <Label>Email:</Label>
                              <FormControl>
                                  <Input autoComplete='off' placeholder="Enter your Email" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                          <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                              <FormItem>
                                <Label>Password:</Label>
                              <FormControl>
                                    <Input type='password' placeholder="Enter your Password" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                          <div className='pt-2 pb-10'>
                          <Button className='text-center w-full h-12 text-lg' type="submit" >Login</Button>
                          </div>
                      </form>
                  </Form>
                </CardContent>
        </Card>
        
    </div>
    <h1 className='py-4 px-4'>Don't have an account?  &nbsp;
        <Link href="/signup" className='underline'>Sign in</Link>
    </h1>
    </Suspense>
    </div>
  )
}

export default LoginPage