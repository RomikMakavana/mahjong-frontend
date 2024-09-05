import React from 'react';

type SpeechBubbleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SpeechBubble({ children, className = '' } : SpeechBubbleProps)  {
  return (
    <div className={` ${className}`}>
      <div className="bg-white   rounded-lg shadow-lg px-[80px] py-[26px]">{children}</div>
      <div className="ml-3 bottom-full transform w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
    </div>
  );
}