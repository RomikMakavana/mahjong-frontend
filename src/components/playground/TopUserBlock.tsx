import Image from 'next/image';
import PickCard from './PickCard';
import UserProfileBlock from './UserProfileBlock';
import HiddenCard from '@/assets/images/svg/cards/top_user_card.png';


interface TopUserBlockProps {
  playerData : {
    userName : string , 
    profileImg : string,
    isWait : boolean,
    showChatBubble : boolean,
  },
  isAnyPlayerWaiting : boolean
}
export default function TopUserBlock({playerData , isAnyPlayerWaiting} : TopUserBlockProps) {
    
    const hiddenCardsBlock = [];
    for (let i = 0; i < 14; i++) {
      hiddenCardsBlock.push(
        <Image key={i} src={HiddenCard} alt="Logo Image" priority className="pt-0 origin-left w-[30px] h-auto" />
      );
    }

    
    return (
      <div className="user-3 flex gap-10 ">
        <div className="pick-card-block rotate-180 w-max">
          <PickCard isAnyPlayerWaiting={isAnyPlayerWaiting} />
        </div>
        <div className="user-block flex flex-col gap-[19px]">
          <div className="user-profile-block">
            <UserProfileBlock showChatBubble={playerData.showChatBubble} userName={playerData.userName} profileImg={playerData.profileImg} isWait={playerData.isWait} rotate={false} arrowSide='top' speechBubbleClasses='z-50 top-[150%] left-[-20%]' />
          </div>
          <div className="user-card-block flex gap-[1px]">
            {hiddenCardsBlock}
          </div>
        </div>
      </div>
    )
}
