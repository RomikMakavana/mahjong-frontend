import React from 'react';

type SpeechBubbleProps = {
  children: React.ReactNode;
  className?: string;
  arrowSide : 'left' | 'right' | 'top' | 'bottom' 
};

export default function SpeechBubble({ children, className = '' , arrowSide } : SpeechBubbleProps)  {
  const arrowClass = {
    top: 'absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white',
    right: 'absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[10px] border-l-white',
    bottom: 'absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white',
    left: 'absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-white',
  };


  return (
    <div className={` ${className} absolute`}>
      <div className='relative flex'>
        <div className={arrowClass[arrowSide]}></div>
      <div className="bg-white   rounded-lg shadow-lg px-[80px] py-[26px]">{children}</div>
      </div>
    </div>
  );
}