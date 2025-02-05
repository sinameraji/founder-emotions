import { useTheme } from 'next-themes';

import { AvatarCircles } from "./ui/avatar-circles"
import { PulsatingButton } from "./ui/pulsating-button"
import React, { useState, useEffect } from 'react';
import { ResourcesSheet } from './ResourcesSheet';

export default function VibesGrid() {

  const { theme } = useTheme();
  const imageSrc = theme === 'dark' ? "trench-dark.png" : "trench.png";

  return (
    <div className=" py-12 sm:py-12">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <img src={imageSrc} alt="Trench Image" className="mx-auto w-full sm:w-[40%] h-auto" />

        <h1 className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight sm:text-5xl">
          Emotional Compass For The Trenches <img src="trenches.png" alt="" className="inline  h-12 w-12"/>
        </h1>

        <h2 className="text-2xl text-center mt-8"> The best free content for the realest startup vibes, curated by founders who have seen things</h2>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg  lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden  rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-2xl font-bold tracking-tight italic   max-lg:text-center">
                  "It's so over"
                </p>
                <p className="mt-2 max-w-lg text-sm/6  max-lg:text-center">
                  Curated content to manage negative emotions (fear, burnout, impatience etc.)
                </p>
               <ResourcesSheet category="negative" />
              </div>
              <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw]  border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    className="size-full object-cover object-top"
                    src="https://cdn.midjourney.com/a3023d06-5aa4-4045-ad82-9cc2663e1634/0_1.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg  max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-2xl font-bold tracking-tight  max-lg:text-center">Deep Work</p>
                <p className="mt-2 max-w-lg text-sm/6  max-lg:text-center">
                  Play, lock in.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-4 max-lg:pb-12 max-lg:pt-10 sm:px-4 lg:pb-2">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/playlist/6oWrUtz3PslIhQIQP7BvtO?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen={false}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg "></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-2xl font-bold tracking-tight  max-lg:text-center">Go for a walk</p>
                <p className="mt-2 max-w-lg text-sm/6  max-lg:text-center">
                Get out of your head and into the world, you are disintegrating.
                </p>
              </div>
              <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2 px-4">
              <iframe
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/track/2DbzxHuEBPNNPNJ297kPj2?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
                
                {/* <img
                  className="h-[min(152px,40cqw)] object-cover"
                  src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
                  alt=""
                /> */}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg  max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-2xl font-bold tracking-tight italic  max-lg:text-center">
                  "We're so back"
                </p>
                <p className="mt-2 max-w-lg text-sm/6  max-lg:text-center">
                Curated content for positive emotions (inspiration, gratitude, excitement etc.)</p>
                <ResourcesSheet category="positive" />
              </div>
              
              <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw]  border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    className="size-full object-cover object-top"
                    src="https://cdn.midjourney.com/9a148588-1d50-40ff-9d89-8cc1059074c8/0_3.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}  
