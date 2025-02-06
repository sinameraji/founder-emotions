import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { EditResourceModal } from './EditResourceModal';



interface ResourcesListProps {
  category: string;
  refetchResources: boolean;
  setRefetchResources: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResourcesList({ category, refetchResources, setRefetchResources }: ResourcesListProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);

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
    // Confirmation dialog
    if (window.confirm("Are you sure you want to delete this resource?")) {
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
      setDropdownOpen(null); // Close the dropdown menu
    }
  };

  const handleEdit = (resourceId: string) => {
    setSelectedResourceId(resourceId);
    setEditModalOpen(true);
    setDropdownOpen(null);
  };

  const toggleDropdown = (resourceId: string) => {
    setDropdownOpen(dropdownOpen === resourceId ? null : resourceId);
  };

  if (isLoading || isFetching) return <div className="flex justify-center items-center">Loading...<Loader2 className="animate-spin" /></div>;
  if (error) return <div>Error fetching data</div>;

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));

  
  return (
    <>
      <ul role="list" className="divide-y">
        {data?.map((resource) => (
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
              <div className="relative">
                <button onClick={() => toggleDropdown(resource.id)} title="Options">
                  <MoreVertical className="text-gray-500 hover:text-gray-700 h-4 w-4" />
                </button>
                {dropdownOpen === resource.id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <ul className="py-1 text-gray-700">
                      <li>
                        <button onClick={() => handleEdit(resource.id)} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Edit</button>
                      </li>
                      <li>
                        <button onClick={() => handleDelete(resource.id)} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Delete</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <Button onClick={prevPage} disabled={currentPage === 0} variant="outline">Previous</Button>
        <Button onClick={nextPage} disabled={data?.length ? data.length < itemsPerPage : false} variant="outline">Next</Button>
      </div>
      {editModalOpen && selectedResourceId && (
        <EditResourceModal
          resourceId={selectedResourceId}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          setRefetchResources={setRefetchResources}
        />
      )}
    </>
  );
}
