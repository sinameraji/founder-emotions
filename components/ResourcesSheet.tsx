"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PulsatingButton } from "./ui/pulsating-button"
import { AvatarCircles } from "./ui/avatar-circles"
import { createClient } from '@/utils/supabase/client'
import ResourcesList from './ResourcesList'
import { CreateResourceModal } from './CreateResourceModal'


const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ];

type Resource = {
  id: string;
  title: string;
  url: string;
  voteCount: number;
  userId: string;
}

export function ResourcesSheet({ category }: { category: string }) {
  // Initialize state with an empty array of Resource type
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const supabase = createClient();
      let { data, error } = await supabase
        .from('Resource')
        .select('*')
        .eq('category', category);

      if (error) {
        console.error('Error fetching resources:', error);
        setResources([]); // Ensure to set to empty array on error
      } else {
        setResources(data || []); // Ensure data is not null, fallback to empty array
      }

      setLoading(false);
    };

    fetchResources();
  }, [category]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex flex-col mt-4 items-center sm:items-start gap-4">
            <PulsatingButton>
              See {resources.length} resources for {category} emotions
            </PulsatingButton>
            <AvatarCircles numPeople={20} avatarUrls={avatars}/>
          </div>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Resources for {category} emotions</SheetTitle>
            <SheetDescription>

            </SheetDescription>
          </SheetHeader>
          <div className=" gap-4 px-4 h-[80%]">

              <ResourcesList resources={resources} />

          </div>
          
          <SheetFooter>
            <SheetClose asChild>
              <CreateResourceModal category={category} />
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
