
import {  useState } from "react";
import { ShareDialog } from "./ShareDialog";
import Image from 'next/image';

type Link = {
  text: string;
  url: string;
};

const links: Link[] = [
  { text: "Contact us", url: "mailto:team@learningloop.com" },
  { text: "Blog", url: "https://blog.learningloop.com" },
];


export function Footer() {
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const handleCloseShareDialog = () => {
      setShareDialogOpen(false);
    };

  return (
    <footer className="px-5 lg:px-10 p-5 max-w-7xl mx-auto ">
      <div className="flex flex-col gap-y-5 md:flex-row items-start md:items-center justify-between w-full gap-x-5">
        <div className="flex items-center gap-x-2">
         <a href="https://learningloop.com" target="_blank">
          <Image
            className="h-12 w-auto"
            src="/learningloop-logo.png"
            alt="learningloop-logo"
            width={500}
            height={500}
          />
          </a>
           
            
        </div>
        <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} onClose={handleCloseShareDialog} />
        <ul className="flex items-center justify-center gap-x-5">
          {links.map((link, index) => (
            <li
              key={index}
              className="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-400 hover:dark:text-neutral-100"
            >
              <a href={link.url} target="_blank">{link.text}</a>
            </li>
          ))}
        </ul>
        
      </div>
    </footer>
  );
}
