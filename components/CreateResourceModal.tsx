import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid'; // Ensure you have 'uuid' installed

type ResourceForm = {
  title: string;
  url: string;
};

export function CreateResourceModal({ category }: { category: string }) {
  const [formData, setFormData] = useState<ResourceForm>({ title: '', url: '' });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async (user) => {
      if (user.data.user) {
        setUserId(user.data.user.id);
      }
    })

    
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error('User must be logged in to add a resource');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const newResourceId = uuidv4(); // Generate a new UUID for the resource
    const { data, error } = await supabase
      .from('Resource')
      .insert([{
        id: newResourceId, // Include the generated UUID in the insert data
        title: formData.title,
        url: formData.url,
        category: category,
        voteCount: 0, // Default vote count
        userId: userId // Use the actual user ID from the session
      }]);
    setLoading(false);
    if (error) console.error('Error inserting resource:', error);
    else console.log('Resource added:', data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Resource</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Resource</DialogTitle>
        <DialogDescription>Enter details for the new resource.</DialogDescription>
        <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <Input name="url" placeholder="URL" value={formData.url} onChange={handleChange} />
        <Button onClick={handleSubmit} disabled={loading || !userId}>
          {loading ? 'Adding...' : 'Add Resource'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}