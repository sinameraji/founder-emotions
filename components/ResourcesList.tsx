import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import PaginationPrevious from './ui/pagination/PaginationPrevious';
import PaginationNext from './ui/pagination/PaginationNext';
type Resource = {
  id: string;
  title: string;
  url: string;
  voteCount: number;
  userId: string;
}

interface ResourcesListProps {
  resources: Resource[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ResourcesList({ resources }: ResourcesListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the number of pages
  const pageCount = Math.ceil(resources.length / itemsPerPage);

  // Get current resources to display
  const currentResources = resources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className='underline hover:text-blue-500'><p className="text-sm/6 font-semibold ">{resource.title}</p></a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
    </>
  )
}
