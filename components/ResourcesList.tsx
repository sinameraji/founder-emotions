import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from 'lucide-react';
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
}

export default function ResourcesList({ category }: ResourcesListProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

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

  const { data, error, isLoading, isFetching } = useQuery(['resources', category, currentPage], () => fetchResources(currentPage));

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
