import Image from 'next/image';
import PickCard from './PickCard';
import UserProfileBlock from './UserProfileBlock';
import HiddenCard from '@/assets/images/svg/cards/top_user_card.png';
import { PlayerDetails } from '@/interfaces';


interface TopUserBlockProps {
  playerData : PlayerDetails,
  waiting : boolean,
  showBubbleChat: boolean, myTurn: boolean
}
export default function TopUserBlock({playerData , waiting, showBubbleChat, myTurn} : TopUserBlockProps) {
    
    const hiddenCardsBlock = [];
    for (let i = 0; i < 14; i++) {
      hiddenCardsBlock.push(
        <Image key={i} src={HiddenCard} alt="Logo Image" priority className="pt-0 origin-left w-[30px] h-auto" />
      );
    }

    
    return (
      <div className="user-3 flex gap-10 ">
        <div className="pick-card-block rotate-180 w-max">
          <PickCard isAnyPlayerWaiting={waiting} />
        </div>
        <div className="user-block flex flex-col gap-[19px]">
          <div className="user-profile-block">
            <UserProfileBlock myTurn={myTurn} showChatBubble={showBubbleChat} userName={playerData.player_name} playerData={playerData} profileImg={playerData.profile_img} isWait={waiting && playerData.user_id == null} rotate={false} arrowSide='top' speechBubbleClasses='z-50 top-[150%] left-[-20%]' />
          </div>
          <div className="user-card-block flex gap-[1px]">
            {hiddenCardsBlock}
          </div>
        </div>
      </div>
    )
}
