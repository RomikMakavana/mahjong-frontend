import Image from 'next/image';
import UserProfile from '@/assets/images/svg/user_profile.svg';
import AnimeImg from '@/assets/images/svg/anime_1.png';
import WaitingCardBackSide from '@/assets/images/svg/cards/waiting_card_back_side.png';

import PickCard from './PickCard';
import UserProfileBlock from './UserProfileBlock';
import MainUserCard from '@/assets/images/svg/main_user_card.svg';
import SmileEmoji from '@/assets/images/svg/smile.svg';
import SpeechBubble from './SpeechBubble';
import { useState } from 'react';
import { PlayerDetails } from '@/interfaces';

interface BottomUserBlockProps {
  playerData: PlayerDetails,
  waiting: boolean,
  showBubbleChat: boolean
}

export default function BottomUserBlock({ playerData, waiting, showBubbleChat }: BottomUserBlockProps) {

  const mainUserCardBlock = [];
  const [activeTile, setActiveTile] = useState<number | null>(null);


  for (let i = 0; i < 14; i++) {
    mainUserCardBlock.push(
      <div
        key={i}
        className={`tile-wrapper relative transition-transform duration-300 ease-in-out ${(activeTile === i && !waiting) ? 'transform -translate-y-3' : ''
          }`}
        // Hover effect for desktop
        onMouseEnter={() => setActiveTile(i)}
        onMouseLeave={() => setActiveTile(null)}
        // Touch effect for mobile
        onTouchStart={() => setActiveTile(i)}
        onTouchEnd={() => setActiveTile(null)}
      >
        <Image src={waiting ? WaitingCardBackSide : MainUserCard} alt="Tile" priority className="w-[35px] sm:w-[50px] h-auto" />
      </div>
    );
  }


  return (
    <div className="main-user-block flex flex-col items-center sm:gap-5 gap-3">
      <div className="flex gap-[2px]">
        {mainUserCardBlock}
      </div>
      <div className="user-block w-full flex justify-between items-center">
        <div className="userSection flex items-center gap-3">
          <PickCard isAnyPlayerWaiting={waiting} />
          <UserProfileBlock showChatBubble={showBubbleChat} userName={playerData.player_name} profileImg={playerData.profile_img} isWait={waiting && playerData.user_id == null} rotate={false} speechBubbleClasses='bottom-[150%] mb-3 left-[-20%]' arrowSide='bottom' />
          <div className="flex items-center sm:mt-2">
            <Image src={SmileEmoji} alt="Smile Image" priority className="z-10 w-[25px] sm:w-[45px] p-[4px] sm:p-[10px]   h-auto border-[1px] border-[#ED9108]  rounded-full" />
          </div>

        </div>
        {waiting ? (<></>) : (<>
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
        </>)}

      </div>
    </div>
  )
}
