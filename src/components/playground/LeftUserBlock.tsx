import Image from 'next/image';
import UserProfile from '@/assets/images/svg/user_profile.svg';
import PickCard from './PickCard';
import UserProfileBlock from './UserProfileBlock';
import HiddenCard from '@/assets/images/svg/cards/backside_card.png';
import { PlayerDetails } from '@/interfaces';

interface LeftUserBlockProps {
  playerData: PlayerDetails,
  waiting: boolean,
  showBubbleChat: boolean,
  myTurn: boolean
}

export default function LeftUserBlock({ playerData, waiting, showBubbleChat, myTurn }: LeftUserBlockProps) {

  const hiddenCardsBlock = [];
  for (let i = 0; i < 14; i++) {
    hiddenCardsBlock.push(
      <Image key={i} src={HiddenCard} alt="Logo Image" priority className="w-[20px]  sm:w-[20px] h-auto mt-[1px]" />
    );
  }


  return (
    <div className="user-2 flex flex-col gap-10 items-end">
      <div className="pick-card-block rotate-90 w-max">
        <PickCard isAnyPlayerWaiting={waiting} />
      </div>
      <div className="user-block flex gap-5">
        <div className="user-profile-block">
          <UserProfileBlock myTurn={myTurn} showChatBubble={showBubbleChat} userName={playerData.player_name} profileImg={playerData.profile_img} isWait={waiting && playerData.user_id == null} rotate={true} speechBubbleClasses='left-[150%] z-50 top-[-20%]' arrowSide='left' />
        </div>
        <div className="user-card-block">
          {hiddenCardsBlock}
        </div>
      </div>
    </div>
  )
}
