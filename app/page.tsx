'use client'
import { Button } from "@/components/ui/button"
import { AuthModal } from '@/components/AuthModal';
import { CallToAction } from '@/components/CTA';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react'
import { ModeToggle } from '@/components/ModeToggle';
import VibesGrid from '@/components/VibeGrid';
import { Footer } from "@/components/Footer";


export default function Home() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  async function signInWithEmail() {

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
      },
    })
  }

  const [authenticated, setAuthenticated] = useState(false)

  async function signOut() {
    await supabase.auth.signOut()
    setAuthenticated(false)
  }

  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      setAuthenticated(user.data.user !== null)
      

    })

  }, [])
  
  return (
   <div className="flex flex-col items-center justify-center h-full w-full relative">
    <div className="absolute top-4 right-4 flex items-center gap-1">
      {!authenticated ? 
        <>
          <ModeToggle />
          <AuthModal />
        </> : 
        <>
          <ModeToggle />
          <Button variant="outline" onClick={signOut}>Log out</Button>
        </>
      }
    </div>
    <VibesGrid />
    <CallToAction />
    <Footer />
   </div>
  );
}
