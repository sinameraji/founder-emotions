import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createClient } from '@/utils/supabase/client';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
      }),
  })

export function AuthModal() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
        },
      })


      const supabase = createClient()
      async function signInWithEmail(email: string) {

        const { data, error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            shouldCreateUser: true,
          },
        })
      }
      function onSubmit(values: z.infer<typeof formSchema>) {
        
          signInWithEmail(values.email)
      }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in to contribute</DialogTitle>
          <DialogDescription>
          Hey there! 👋 You need to sign in to add a new emotion. Don't worry, it's quick and easy!
          </DialogDescription>
        </DialogHeader>


            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send Magic Link ✨</Button>
      </form>
    </Form>

        <DialogFooter>
        <p className="text-sm text-gray-500">We'll send you a magic link to sign in. No password needed! It's like magic, but real. 🎩✨</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
