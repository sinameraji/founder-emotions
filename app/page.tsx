'use client'
import { Button } from "@/components/ui/button"
import { AuthModal } from '@/components/AuthModal';
import { CallToAction } from '@/components/CTA';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react'
import { ModeToggle } from '@/components/ModeToggle';
import VibesGrid from '@/components/VibeGrid';
import { Footer } from "@/components/Footer";
import { v4 as uuidv4, v4 } from 'uuid'; 
import EditProfileModal from '@/components/EditProfileModal';


export default function Home() {
  const supabase = createClient()
  const [authenticated, setAuthenticated] = useState(false)

  async function signOut() {
    await supabase.auth.signOut()
    setAuthenticated(false)
  }

  useEffect(() => {
    supabase.auth.getUser().then(async (user) => {
      if (user.data.user) {
        setAuthenticated(true);
        const { data, error } = await supabase
          .from('UserProfile')
          .select('*')
          .eq('userId', user.data.user.id)
          .single();

        if (error && error.message !== 'No rows found') {
          console.error('Error fetching user profile:', error);
        } else if (data) {

        } else {
          // No profile exists, insert new
          const { error: insertError } = await supabase
            .from('UserProfile')
            .insert([{
              id: uuidv4(),
              displayName: user.data.user.email?.split('@')[0] || '',
              avatarUrl: '',
              socialLink: '',
              userId: user.data.user.id
            }]);
          if (insertError) {
            console.error('Error inserting new user profile:', insertError);
          }
        }
      }
    });
  }, []);
  
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
          <EditProfileModal />
        </>
      }
    </div>
    <VibesGrid />
    <CallToAction />
    <Footer />
   </div>
  );
}
