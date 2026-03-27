'use client';

import { useAtom } from 'jotai';
import { isContactModalOpenAtom } from '../atoms/contactAtoms';

export const ChatButton = () => {
  const [isContactOpen, setIsContactOpen] = useAtom(isContactModalOpenAtom);

  const toggleContactForm = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <button
      onClick={toggleContactForm}
      className="fixed bottom-6 right-6 z-50 w-[50px] h-[50px] bg-pink backdrop-blur-[5px] rounded-full p-[10px] flex items-center justify-center border border-pink-light transition-all duration-300 ease-in-out cursor-pointer hover:bg-pink-light hover:[box-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
      aria-label={isContactOpen ? 'Close contact form' : 'Open contact form'}
    >
      <img src="/images/chat.svg" alt="Chat" className="w-full h-full" />
    </button>
  );
};
