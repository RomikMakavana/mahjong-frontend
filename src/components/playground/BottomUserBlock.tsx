import Image from 'next/image';
import UserProfile from '@/assets/images/svg/user_profile.svg';
import AnimeImg from '@/assets/images/svg/anime_1.png';
import PickCard from './PickCard';
import UserProfileBlock from './UserProfileBlock';
import MainUserCard from '@/assets/images/svg/main_user_card.svg';
import SmileEmoji from '@/assets/images/svg/smile.svg';
import SpeechBubble from './SpeechBubble';

interface BottomUserBlockProps {
  playerData : {
    userName : string , 
    profileImg : string,
    isWait : boolean,
  },
  isAnyPlayerWaiting : boolean
}

export default function BottomUserBlock({playerData , isAnyPlayerWaiting} : BottomUserBlockProps) {

  const mainUserCardBlock = [];
  for (let i = 0; i < 14; i++) {
    mainUserCardBlock.push(
      <Image src={MainUserCard} alt="Logo Image" priority className="w-[50px]   sm:w-[50px] h-auto" />
    );
  }


  return (
    <div className="main-user-block flex flex-col items-center gap-5">
      <div className="flex gap-[2px]">
        {mainUserCardBlock}
      </div>
      <div className="user-block w-full flex justify-between items-center relative">
        <div className="userSection flex items-center gap-3 relative">
          <PickCard isAnyPlayerWaiting={isAnyPlayerWaiting} />
          <UserProfileBlock userName={playerData.userName} profileImg={playerData.profileImg} isWait={playerData.isWait} rotate={false} />
          <div className="flex items-center mt-2">
            <Image src={SmileEmoji} alt="Smile Image" priority className="z-10 w-[45px] sm:w-[45px] p-[10px]   h-auto border-[1px] border-[#ED9108]  rounded-full" />
          </div>

          {/* <SpeechBubble className='top-[-170px] absolute ' >
            <Image alt='animeImg'  src={AnimeImg}  className='w-[130px] h-auto'/>
          </SpeechBubble> */}
        </div>
        <div className="flex gap-2 ">
          <button className="flex flex-1 justify-center items-center  border border-brand-purple rounded-lg py-[14px] xs:py-3 px-6 xs:mr-3">
            <span className="btn-text">Pick</span>
          </button>
          <button className="flex flex-1 justify-center items-center bg-[#EDF7B9] border rounded-lg py-[14px] xs:py-3 px-6 xs:mr-3">
            <span className="btn-text text-black">Seung</span>
          </button>
          <button className="flex flex-1 justify-center items-center bg-[#739A00] border border-[#739A00] rounded-lg py-[14px] xs:py-3 px-6 xs:mr-3">
            <span className="btn-text">Gong</span>
          </button>
        </div>
      </div>
    </div>
  )
}
