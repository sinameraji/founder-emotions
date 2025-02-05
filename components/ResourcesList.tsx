import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

type Resource = {
  id: string;
  title: string;
  url: string;
  voteCount: number;
  userId: string;
  createdAt: string;
  UserProfile?: {
    displayName: string;
    avatarUrl: string;
    socialLink: string;
  };
}

interface ResourcesListProps {
  category: string;
  refetchResources: boolean;
  setRefetchResources: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResourcesList({ category, refetchResources, setRefetchResources }: ResourcesListProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchResources = async (page: number) => {
    const supabase = createClient();
    const offset = page * itemsPerPage;
    const { data, error } = await supabase
      .from('Resource')
      .select(`
        *,
        UserProfile (
          displayName,
          avatarUrl,
          socialLink
        )
      `)
      .eq('category', category)
      .order('createdAt', { ascending: false })
      .range(offset, offset + itemsPerPage - 1);

    if (error) {
      throw new Error('Error fetching resources');
    }

    // Fetch public URLs for avatars
    const resourcesWithAvatars = await Promise.all(data.map(async (resource) => {
      if (resource.UserProfile && resource.UserProfile.avatarUrl) {
        const response = await supabase
          .storage
          .from('avatars')
          .getPublicUrl(resource.UserProfile.avatarUrl);

        // Check if the publicUrl is undefined to handle errors
        if (!response.data.publicUrl) {
          console.error('Error fetching avatar URL');
          return resource; // Return resource without avatar URL modification if there's an error
        }

        return {
          ...resource,
          UserProfile: {
            ...resource.UserProfile,
            avatarUrl: response.data.publicUrl
          }
        };
      }
      return resource;
    }));

    return resourcesWithAvatars;
  };

  const { data, error, isLoading, isFetching, refetch } = useQuery(['resources', category, currentPage], () => fetchResources(currentPage));

  useEffect(() => {
    if (refetchResources) {
      refetch();
      setRefetchResources(false);
    }
  }, [refetchResources, refetch, setRefetchResources]);

  useEffect(() => {
    const fetchUserId = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      if (user.data.user) {
        setCurrentUserId(user.data.user.id);
      }
    };

    fetchUserId();
  }, []);

  const handleDelete = async (resourceId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('Resource')
      .delete()
      .match({ id: resourceId });

    if (error) {
      console.error('Error deleting resource:', error);
    } else {
      setRefetchResources(true);
      console.log('Resource deleted successfully');
    }
  };

  if (isLoading || isFetching) return <div className="flex justify-center items-center">Loading...<Loader2 className="animate-spin" /></div>;
  if (error) return <div>Error fetching data</div>;

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));

  
  return (
    <>
      <ul role="list" className="divide-y">
        {data?.map((resource: Resource & { UserProfile: { avatarUrl: string; displayName: string; socialLink?: string } }) => (
          <li key={resource.id} className="flex items-center justify-between gap-x-6 py-4">
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className='underline hover:text-blue-500 flex-1'>
              <p className="text-sm font-semibold">{resource.title}</p>
            </a>
            <a href={resource.UserProfile?.socialLink} target="_blank" rel="noopener noreferrer">
              <Avatar>
                <AvatarImage src={resource.UserProfile?.avatarUrl} alt={resource.UserProfile?.displayName} />
                <AvatarFallback>{resource.UserProfile?.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
            </a>
            {currentUserId === resource.userId && (
              <button onClick={() => handleDelete(resource.id)} title="Delete Resource">
                <Trash2 className="text-red-500 hover:text-red-700 h-4 w-4" />
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <Button onClick={prevPage} disabled={currentPage === 0} variant="outline" >Previous</Button>
        <Button onClick={nextPage} disabled={data?.length ? data.length < itemsPerPage : false} variant="outline" >Next</Button>
      </div>
    </>
  );
}
