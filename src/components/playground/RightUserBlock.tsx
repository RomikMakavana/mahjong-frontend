import Image from 'next/image';
import UserProfile from '@/assets/images/svg/user_profile.svg';
import PickCard from './PickCard';
import UserProfileBlock from './UserProfileBlock';
import HiddenCard from '@/assets/images/svg/cards/backside_card.png';
import { PlayerDetails } from '@/interfaces';

interface RightUserBlockProps {
  playerData : PlayerDetails,
  waiting : boolean,
  showBubbleChat : boolean
}


export default function RightUserBlock({playerData, waiting, showBubbleChat} : RightUserBlockProps) {
    
    const hiddenCardsBlock = [];
    for (let i = 0; i < 14; i++) {
      hiddenCardsBlock.push(
        <Image key={i} src={HiddenCard} alt="Logo Image" priority className="w-[20px]  sm:w-[20px] h-auto mt-[1px]" />
      );
    }

    
    return (
        <div className="user-2 flex flex-col gap-10 items-start">
          <div className="pick-card-block rotate-[-90deg] w-max">
            <PickCard isAnyPlayerWaiting={waiting} />
          </div>
          <div className="user-block flex flex-row-reverse gap-5">
            <div className="user-profile-block">
              <UserProfileBlock  showChatBubble={showBubbleChat} userName={playerData.player_name} profileImg={playerData.profile_img} isWait={waiting && playerData.user_id == null} rotate={true} arrowSide='right' speechBubbleClasses=' z-50 top-[-20%] right-[150%]' />
            </div>
            <div className="user-card-block">
              {hiddenCardsBlock}
            </div>
          </div>
        </div>
    )
}
