'use client';

import { WebGLShader } from './WebGLShader/WebGLShader';

export const Footer = () => {
  return (
    <>
      <footer className="p-6 lg:fixed lg:bottom-0 lg:right-0">
        <div className="w-[50px] h-[50px] bg-night rounded-full p-[10px] flex items-center justify-center">
          <img src="/images/chat.svg" alt="Chat" className="w-full h-full" />
        </div>
      </footer>
      <WebGLShader
        minWidth={600}
        height={600}
        maintainHeight={0.8}
        seed={30005}
      />
    </>
  );
};
