import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaLinkedinIn, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { ScriptCopyBtn } from './script-copy-btn';
import Coffee from './Coffee';

type ShareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};
const customCommandMap = {
    npm: "https://trenches.learningloop.com",
    yarn: "https://trenches.learningloop.com",
    pnpm: "https://trenches.learningloop.com",
    bun: "https://trenches.learningloop.com",
  };

export const ShareDialog: React.FC<ShareDialogProps> = ({ open, onOpenChange, onClose }) => {
  const shareOptions = [
    { name: 'Twitter', url: 'https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20app! https://trenches.learningloop.com', icon: <FaTwitter /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/shareArticle?mini=true&url=https://trenches.learningloop.com', icon: <FaLinkedinIn /> },
    { name: 'Email', url: 'mailto:?subject=Check out this site&body=Check out this awesome site https://trenches.learningloop.com', icon: <FaEnvelope /> },
    { name: 'WhatsApp', url: 'https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20app%20https://trenches.learningloop.com', icon: <FaWhatsapp /> }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Spread the word</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this with your friends 💌</DialogTitle>
          <DialogDescription>Help spread the word by sharing this app with your founder/operator friends!</DialogDescription>
          {/* <a href="https://trenches.learningloop.com" className='italic underline text-center text-3xl text-blue-500'>trenches.learningloop.com</a> */}
          <ScriptCopyBtn
      showMultiplePackageOptions={false}
      codeLanguage="text"
      lightTheme="nord"
      darkTheme="vitesse-dark"
      commandMap={customCommandMap}
    />

        </DialogHeader>
        <div className="flex my-8 justify-center space-x-4">
          {shareOptions.map(option => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className=" bg-transparent "
              style={{ fontSize: '24px' }}
            >
              {option.icon}
            </a>
          ))}
        </div>
        <DialogClose asChild>

        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}; 