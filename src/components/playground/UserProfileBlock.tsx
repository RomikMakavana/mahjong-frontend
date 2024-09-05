import Image from 'next/image';
import UserProfile from '@/assets/images/svg/user_profile.svg';
import SpeechBubble from './SpeechBubble';
import AnimeImg from '@/assets/images/svg/anime_1.png';

interface UserProfileBlockProps {
    rotate: boolean;
    userName : string , 
    profileImg ?: string,
    isWait : boolean,
  }

export default function UserProfileBlock({rotate , userName , profileImg , isWait} : UserProfileBlockProps) {
    const styles = rotate ? {
            writingMode: "vertical-rl" as const
    } : undefined;
    return (
        <div className={`flex items-center  ${rotate ? 'flex-col ' : 'mt-2'}`}>
        <Image src={profileImg ? profileImg : UserProfile} alt="Logo Image" priority className="z-10 w-[34px] sm:w-[34px] bg-[#080C23] p-[3px] h-auto border-[2px] border-[#60F8F8]  rounded-full" />
        <p className={`border-[3px] border-[#B5B5B5] rounded-full ml-[-35px] text-white ${rotate ? 'whitespace-nowrap pt-10 pr-1 pb-4 pl-1  ml-auto mt-[-35px]' : 'py-1 pl-10 pr-4 '} ${isWait ? 'bg-[#D99D02] text-white border-[#D99D02]' : ''}`} style={styles} >{isWait ? 'Waiting...' : userName}</p>

        <SpeechBubble className='top-[-170px] absolute ' >
            <Image alt='animeImg'  src={AnimeImg}  className='w-[130px] h-auto'/>
          </SpeechBubble>
    </div>
    )
}
