"use client"

import React, { useState } from 'react';
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
import ResourcesList from './ResourcesList'
import { CreateResourceModal } from './CreateResourceModal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShareDialog } from './ShareDialog'


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



// Create a client
const queryClient = new QueryClient();

export function ResourcesSheet({ category }: { category: string }) {
  const [refetchResources, setRefetchResources] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleResourceCreated = () => {
    setShareDialogOpen(true);
  };

  const handleCloseShareDialog = () => {
    setShareDialogOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex flex-col mt-4 items-center sm:items-start gap-4">
              <PulsatingButton>
                View resources
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

                <ResourcesList category={category} refetchResources={refetchResources} setRefetchResources={setRefetchResources} />

            </div>
            
            <SheetFooter>
              <SheetClose asChild>
                <CreateResourceModal category={category} setRefetchResources={setRefetchResources} onResourceCreated={handleResourceCreated} />
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        {shareDialogOpen && (
          <ShareDialog
            open={shareDialogOpen}
            onOpenChange={setShareDialogOpen}
            onClose={handleCloseShareDialog}
          />
        )}
      </div>
    </QueryClientProvider>
  );
}
