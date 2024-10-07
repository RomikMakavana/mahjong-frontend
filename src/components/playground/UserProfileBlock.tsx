import Image from 'next/image';
import UserProfile from '@/assets/images/svg/user_profile.svg';
import SpeechBubble from './SpeechBubble';
import AnimeImg from '@/assets/images/svg/anime_1.png';
import { PlayerDetails } from '@/interfaces';

interface UserProfileBlockProps {
  playerData : PlayerDetails,
  rotate: boolean;
  userName: string,
  profileImg?: string,
  isWait: boolean,
  speechBubbleClasses: string,
  arrowSide: 'left' | 'right' | 'top' | 'bottom'
  showChatBubble: boolean,
  myTurn: boolean
}

export default function UserProfileBlock({ rotate, userName, profileImg, isWait, speechBubbleClasses, arrowSide, showChatBubble, myTurn }: UserProfileBlockProps) {
  const styles = rotate ? {
    writingMode: "vertical-rl" as const
  } : undefined;
  return (
    <div className={`flex items-center relative   ${rotate ? 'flex-col ' : 'sm:mt-2'}`}>
      <span className={`${myTurn ? 'animate-ping' : 'hidden'} absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75`}></span>

      <Image src={profileImg ? profileImg : UserProfile} alt="Logo Image" priority className="z-10  w-[19px] md:w-[34px] bg-[#080C23] md:p-[1px] h-auto border-[2px] border-[#60F8F8]  rounded-full" />
      <p className={`border-[2px] border-[#B5B5B5] truncate rounded-full  text-xs md:text-base  text-white ${rotate ? 'whitespace-nowrap max-h-44 pt-6 md:pt-10 md:pr-1 pb-4 md:pl-1  ml-auto mt-[-20px] md:mt-[-35px]' : 'md:py-1 pl-6 pr-4 max-w-44 md:pl-10 md:pr-4 md:ml-[-35px] ml-[-20px] '} ${isWait ? 'bg-[#D99D02] text-white border-[#D99D02]' : ''}`} style={styles} >{isWait ? 'Waiting...' : userName}</p>
      {
        showChatBubble ? (<>
          <SpeechBubble className={` ${speechBubbleClasses} `} arrowSide={arrowSide} >
            <Image alt='animeImg' src={AnimeImg} className='w-[130px] max-w-[130px] h-auto' />
          </SpeechBubble>
        </>) : (<></>)
      }

    </div>
  )
}
