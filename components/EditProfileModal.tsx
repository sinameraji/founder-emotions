import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const EditProfileModal = () => {
  const [displayName, setDisplayName] = useState('');
  const [socialURL, setSocialURL] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('UserProfile')
          .select('displayName, socialLink')
          .eq('userId', user.data.user?.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setDisplayName(data.displayName || '');
          setSocialURL(data.socialLink || '');
        }
      }
    };

    fetchProfile();
  }, [supabase]);

  const updateProfile = async () => {
    const user = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('UserProfile')
        .update({
          displayName: displayName,
          socialLink: socialURL
        })
        .eq('userId', user.data.user?.id);

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        console.log('Profile updated:', data);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Profile</DialogTitle>
          <DialogDescription>
            Update your display name, social URL, and avatar.
          </DialogDescription>
        </DialogHeader>
        <Input 
          placeholder="Display Name" 
          value={displayName} 
          onChange={(e) => setDisplayName(e.target.value)} 
        />
        <Input 
          placeholder="Social URL" 
          value={socialURL} 
          onChange={(e) => setSocialURL(e.target.value)} 
        />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button onClick={updateProfile}>Save</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;