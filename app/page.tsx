'use client'


import { AuthModal } from '@/components/AuthModal';
import { CallToAction } from '@/components/CTA';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react'

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
      console.log(user)

    })

  }, [])
  
 
  return (
   <div className="flex flex-col items-center justify-center h-screen">
    <p>{email}</p>
    {!authenticated ? 
    <AuthModal />
     :
      <button className="bg-blue-500 text-white rounded-md p-2" onClick={signOut}>Log out</button>
    }
    <CallToAction />
   </div>
  );
}
