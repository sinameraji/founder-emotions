import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid'; 
import { AuthModal } from './AuthModal';

type ResourceForm = {
  title: string;
  url: string;
};

export function CreateResourceModal({ category, setRefetchResources }: { category: string, setRefetchResources: (refetch: boolean) => void }) {
  const [formData, setFormData] = useState<ResourceForm>({ title: '', url: '' });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then((user) => {
      if (user.data.user) {
        setUserId(user.data.user.id);
      } else {
        setShowAuthModal(true);
      }
    });
  }, []);

  useEffect(() => {
    if (open) {
      setSuccess(false);
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error('User must be logged in to add a resource');
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const newResourceId = uuidv4(); 
    const { data, error } = await supabase
      .from('Resource')
      .insert([{
        id: newResourceId, 
        title: formData.title,
        url: formData.url,
        category: category,
        voteCount: 0, 
        userId: userId
      }]);
    if (error) {
      console.error('Error inserting resource:', error);
      setSuccess(false);
    } else {
      console.log('Resource added:', data);
      setSuccess(true);
      setRefetchResources(true);
      setOpen(false);
      setFormData({ title: '', url: '' });
    }
    setLoading(false);
  };

  return (
    <>
      {showAuthModal && <AuthModal />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => userId ? setOpen(true) : setShowAuthModal(true)} disabled={!userId}>
            Add New Resource
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add New Resource</DialogTitle>
          <DialogDescription>Enter details for the new resource.</DialogDescription>
          <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
          <Input name="url" placeholder="URL" value={formData.url} onChange={handleChange} />
          <Button onClick={handleSubmit} disabled={loading || !userId || success}>
            {loading ? 'Adding...' : success ? 'Added :)' : 'Add Resource'}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}