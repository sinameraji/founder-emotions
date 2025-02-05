import React, { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import PaginationPrevious from './ui/pagination/PaginationPrevious';
import PaginationNext from './ui/pagination/PaginationNext';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Resource = {
  id: string;
  title: string;
  url: string;
  voteCount: number;
  userId: string;
  avatarUrl?: string;
  createdAt: string;
  socialLink?: string;
}

interface ResourcesListProps {
  resources: Resource[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ResourcesList({ resources }: ResourcesListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 7;
  const supabase = createClient();

  useEffect(() => {
    const fetchAvatars = async () => {
      setLoading(true);
      const userIds = resources.map(resource => resource.userId);
      const { data, error } = await supabase
        .from('UserProfile')
        .select('userId, avatarUrl, socialLink')
        .in('userId', userIds);

      if (error) {
        console.error('Error fetching avatars:', error);
      } else {
        const avatarMap = new Map();
        for (const item of data) {
          if (item.avatarUrl) {
            const { data: urlData } = await supabase
              .storage
              .from('avatars')
              .getPublicUrl(item.avatarUrl);

            avatarMap.set(item.userId, { url: urlData.publicUrl, socialLink: item.socialLink });
          }
        }
        resources.forEach(resource => {
          const avatarInfo = avatarMap.get(resource.userId) || { url: 'default-avatar.png', socialLink: '#' };
          resource.avatarUrl = avatarInfo.url;
          resource.socialLink = avatarInfo.socialLink;
        });
      }
      setLoading(false);
    };

    fetchAvatars();
  }, [resources, supabase]);

  // Sort resources by createdAt date
  const sortedResources = resources.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const pageCount = Math.ceil(sortedResources.length / itemsPerPage);
  const currentResources = sortedResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      Loading...<Loader2 className="animate-spin"/></div>;
  }

  return (
    <>
    <Pagination className="flex justify-start my-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: pageCount }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <ul role="list" className="divide-y">
        {currentResources.map((resource) => (
          <li key={resource.id} className="flex items-center justify-between gap-x-6 py-4">
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className='underline hover:text-blue-500 flex-1'>
              <p className="text-sm font-semibold">{resource.title}</p>
            </a>
            <a href={resource.socialLink} target="_blank" rel="noopener noreferrer">
              <Avatar className="w-8 h-8">
                <AvatarImage src={resource.avatarUrl} alt="Avatar" />
                <AvatarFallback>{resource.title.charAt(0)}</AvatarFallback>
              </Avatar>
            </a>
          </li>
        ))}
      </ul>
      
    </>
  )
}
