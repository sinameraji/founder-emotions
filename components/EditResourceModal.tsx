import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from '@/utils/supabase/client';

type ResourceForm = {
  title: string;
  url: string;
};

interface EditResourceModalProps {
  resourceId: string;
  open: boolean;
  onClose: () => void;
  setRefetchResources: (refetch: boolean) => void;
}

export const EditResourceModal = ({ resourceId, open, onClose, setRefetchResources }: EditResourceModalProps) => {
  const [formData, setFormData] = useState<ResourceForm>({ title: '', url: '' });
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchResource = async () => {
      const { data, error } = await supabase
        .from('Resource')
        .select('title, url')
        .eq('id', resourceId)
        .single();

      if (error) {
        console.error('Error fetching resource:', error);
      } else if (data) {
        setFormData({ title: data.title, url: data.url });
      }
    };

    if (resourceId) {
      fetchResource();
    }
  }, [resourceId, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('Resource')
      .update({
        title: formData.title,
        url: formData.url
      })
      .eq('id', resourceId);

    if (error) {
      console.error('Error updating resource:', error);
    } else {
      console.log('Resource updated successfully');
      setRefetchResources(true);
      onClose();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen => setOpen ? null : onClose()}>
      <DialogTrigger asChild>
        <Button>Edit Resource</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Resource</DialogTitle>
        <DialogDescription>Update the details of the resource.</DialogDescription>
        <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <Input name="url" placeholder="URL" value={formData.url} onChange={handleChange} />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EditResourceModal; 