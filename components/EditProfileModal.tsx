import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useDropzone } from 'react-dropzone';
import { Loader2 } from 'lucide-react';

const EditProfileModal = () => {
  const [displayName, setDisplayName] = useState('');
  const [socialURL, setSocialURL] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const supabase = createClient();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await supabase.auth.getUser();

      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from('UserProfile')
          .select('displayName, socialLink, avatarUrl')
          .eq('userId', user.data.user?.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else if (profileData) {
          setDisplayName(profileData.displayName || '');
          setSocialURL(profileData.socialLink || '');
          if (profileData.avatarUrl) {
            const response = await supabase
              .storage
              .from('avatars')
              .getPublicUrl(profileData.avatarUrl);

            if (response.data) {
              setAvatarUrl(response.data.publicUrl);
            } else {
              console.error('Error fetching avatar URL');
            }
          }
        }
      }
    };

    fetchProfile();
  }, [supabase]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp']
    },
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setUploadError('Only PNG, JPG, and WEBP files are allowed.');
      } else {
        setAvatarFile(acceptedFiles[0]);
        setUploadError('');
      }
    }
  });

  const fetchAvatarUrl = async (avatarKey: string) => {
    setIsAvatarLoading(true);
    setTimeout(async () => {
      const response = await supabase
        .storage
        .from('avatars')
        .getPublicUrl(avatarKey);

      if (response.data) {
        setAvatarUrl(response.data.publicUrl);
      } else {
        console.error('Error fetching avatar URL');
      }
      setIsAvatarLoading(false);
    }, 1000);
  };

  const updateProfile = async () => {
    setIsLoading(true);
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
        setIsLoading(false);
      } else {
        console.log('Profile updated:', data);
        if (avatarFile) {
          const fileExt = avatarFile.name.split('.').pop();
          const timestamp = new Date().getTime();
          const fileName = `avatars/${user.data.user?.id}-${timestamp}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, avatarFile);

          if (uploadError) {
            console.error('Error uploading file:', uploadError);
            setIsLoading(false);
          } else {
            const { data, error } = await supabase
              .from('UserProfile')
              .update({ avatarUrl: fileName })
              .eq('userId', user.data.user?.id);

            if (error) {
              console.error('Error updating profile:', error);
              setIsLoading(false);
            } else {
              console.log('Profile updated:', data);
              setIsLoading(false);
              fetchAvatarUrl(fileName);
              setDialogOpen(false);
            }
          }
        } else {
          setIsLoading(false);
          setDialogOpen(false);
        }
      }
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {isAvatarLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Avatar className="cursor-pointer">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{displayName[0] || 'U'}</AvatarFallback>
          </Avatar>
        )}
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
        
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{displayName[0] || 'U'}</AvatarFallback>
              </Avatar>
              <Button className="border border-gray-300 hover:border-gray-500">Change Avatar</Button>
              {avatarFile && <p className="mt-2 text-sm text-gray-600">{avatarFile.name}</p>}
            </div>
          )}
        </div>
        {uploadError && <p className="error">{uploadError}</p>}
        <Button onClick={updateProfile} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
        <DialogClose asChild>

        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;