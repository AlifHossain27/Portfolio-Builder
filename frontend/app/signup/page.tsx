"use client"
import React, { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import Link from 'next/link'
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters."
    }),
    lastName: z.string().min(2, {
      message: "Last Name must be at least 2 characters."
    }),
    age: z.string().min(1, {
      message: "Age is required"
    }).max(3).refine(val => !isNaN(val as unknown as number)),
    role: z.string().min(4, {
      message: "Role is required"
    }),
    aboutMe: z.string().min(4, {
      message: "About Me is required"
    }),
    quote: z.string(),
    skills: z.string(),
    experience: z.string(),
    email: z.string().email(),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters."
    })
  });
  

const SignupPage = () => {
    const [formStep, setFormStep] = useState(0)
    const router = useRouter()

    const nextStep = async () => {
      let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = [];
    
      if (formStep === 0) {
        fieldsToValidate = ["firstName", "lastName", "age"];
      } else if (formStep === 1) {
        fieldsToValidate = ["quote", "aboutMe"];
      } else if (formStep === 2) {
        fieldsToValidate = ["role", "skills", "experience"];
      } else if (formStep === 3) {
        fieldsToValidate = ["email", "password"];
      }

      const isValid = await form.trigger(fieldsToValidate);
      if (isValid) {
        setFormStep((currentStep) => currentStep + 1);
      }
    };
    const prevStep = () => setFormStep((currentStep) => currentStep - 1)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          age: "",
          role: "",
          aboutMe: "",
          quote: "",
          skills: "",
          experience: "",
          email: "",
          password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
      const skillsArray = values.skills.split(",").map(skill => skill.trim());
      const experienceArray = values.experience.split(",").map(exp => exp.trim());
      const res = await fetch("http://localhost:8000/api/signup/",{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          'email': values.email,
          'password': values.password
      })
    })
    if (res.ok){
      console.log(res.json())
    }else{
      await router.refresh()
    }


    const res2 = await fetch("http://localhost:8000/api/profile/", {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        "first_name": values.firstName,
        "last_name": values.lastName,
        "age": Number(values.age),
        "email": values.email,
        "role": values.role,
        "about_me": values.aboutMe,
        "quote": values.quote,
        "skills": String( "[" + skillsArray + "]"),
        "experience": String("[" + experienceArray + "]")
      })
    })
    console.log(res2.json())
    if (res2.ok) {
      router.push("/login")
    }
    else {
      router.refresh()
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
        <Card className='rounded-lg border-2 border-secondary h-max w-[350px]'>
                <CardHeader>
                    <CardTitle className='text-2xl'>
                        Signup
                    </CardTitle>
                    <CardDescription>
                        Start your journey with us
                    </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                      {formStep === 0 && (
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                              <FormItem>
                                <Label>First Name: *</Label>
                              <FormControl>
                                  <Input autoComplete='off' placeholder="Enter your First Name" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                              <FormItem>
                                <Label>Last Name: *</Label>
                              <FormControl>
                                  <Input autoComplete='off' placeholder="Enter your Last Name" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          /> 
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                              <FormItem>
                                <Label>Age: *</Label>
                              <FormControl>
                                  <Input autoComplete='off' type='number' placeholder="Enter your Age" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                      </div>
                      )}

                    {formStep === 1 && (
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="quote"
                          render={({ field }) => (
                              <FormItem>
                                <Label>Favourite Quote</Label>
                              <FormControl>
                                  <Input autoComplete='off' placeholder="Enter your favourite quote" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                        <FormField
                          control={form.control}
                          name="aboutMe"
                          render={({ field }) => (
                              <FormItem>
                                <Label>About me: *</Label>
                              <FormControl>
                                  <Textarea autoComplete='off' placeholder="Enter your About me" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                      </div>
                      )}

                    {formStep === 2 && (
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                              <FormItem>
                                <Label>Role: *</Label>
                              <FormControl>
                                  <Input autoComplete='off' placeholder="Enter your Role" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                        <FormField
                          control={form.control}
                          name="skills"
                          render={({ field }) => (
                              <FormItem>
                                <Label>Skills:</Label>
                              <FormControl>
                                  <Textarea autoComplete='off' placeholder="Enter the skill you have" {...field} />
                              </FormControl>
                              <FormDescription>
                                Separate the skills using ","
                              </FormDescription>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                              <FormItem>
                                <Label>Experience:</Label>
                              <FormControl>
                                  <Textarea autoComplete='off' placeholder="Enter your Experience" {...field} />
                              </FormControl>
                              <FormDescription>
                                Separate the experiences using ","
                              </FormDescription>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                        </div>
                      )}

                    {formStep === 3 && (
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                                <Label>Email: *</Label>
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
                                <Label>Password: *</Label>
                              <FormControl>
                                    <Input type='password' placeholder="Enter your Password" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                        </div>
                      )}

                      <div className='flex py-5 gap-4'>
                        {formStep > 0 && (
                          <Button className="text-center h-12 text-lg" variant="ghost" type='button' onClick={prevStep}>
                            Previous
                          </Button>
                        )}
                        {formStep < 3 ? (
                          <Button className='text-center h-12 text-lg' type="button" onClick={nextStep}>
                            Next Step
                            <ArrowRight className="w-4 h-4 ml-2"/>
                          </Button>
                        ) : (
                          <Button className='text-center h-12 text-lg' type="submit">Submit</Button>
                        )}
                      </div>
                      </form>
                  </Form>
                </CardContent>
        </Card>
        
    </div>
    <h1 className='py-4 px-4'>Already signed in?  &nbsp;
        <Link href="/login" className='underline'>Login</Link>
    </h1>
    </Suspense>
    </div>
  )
}

export default SignupPage
