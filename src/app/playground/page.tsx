'use client';

import { useEffect, useState } from "react";
import { isTablet, isMobile } from 'react-device-detect';
import logoWhite from '@/assets/images/svg/logo_white.svg';
import MainUserCard from '@/assets/images/svg/main_user_card.svg';
import FlowerCard1 from '@/assets/images/svg/cards/flower_card_1.svg';
import UserProfile from '@/assets/images/svg/user_profile.svg';
import Image from "next/image";
import GlobalCard from "@/components/Cards/GlobalCard";
import PickCard from "@/components/playground/PickCard";
import UserProfileBlock from "@/components/playground/UserProfileBlock";
import LeftUserBlock from "@/components/playground/LeftUserBlock";
import TopUserBlock from "@/components/playground/TopUserBlock";
import RightUserBlock from "@/components/playground/RightUserBlock";
import BottomUserBlock from "@/components/playground/BottomUserBlock";
import CenterCardBlock from "@/components/playground/CenterCardBlock";
import NotificationModal from "@/components/Models/NotificationModal";

type Player = {
  userName: string;
  profileImg: string;
  isWait: boolean;
}
export default function GameLayout() {
  const [orientationType, setOrientationType] = useState<string>('');
  const [gamePlayersData , setGamePlayersData ] = useState<{[kay : string] : Player}>({
    player1 : {
      userName : 'dakshjoshi66758', 
      profileImg :  UserProfile,
      isWait :  false,
    },
    player2 : {
      userName : 'dakshjoshi66758', 
      profileImg :  UserProfile,
      isWait :  false,
    },
    player3 : {
      userName : 'dakshjoshi66758', 
      profileImg :  UserProfile,
      isWait :  false,
    },
    player4 : {
      userName : 'dakshjoshi66758', 
      profileImg :  UserProfile,
      isWait :  false,
    },
  })
  const handleOrientationChange = () => {
    setOrientationType(screen.orientation.type);
  }

  const isAnyPlayerWaiting = () => {
    console.log(Object.values(gamePlayersData).some(player => player.isWait === true));
    
    return Object.values(gamePlayersData).some(player => player.isWait === true);
  };

  useEffect(() => {
    screen.orientation.addEventListener('change', handleOrientationChange)
    return () => {
      screen.orientation.removeEventListener('change', handleOrientationChange)
    }
  }, []);
 
  
  return (
    <div>
      <div className="flex h-screen bg-game-page-bg-image bg-cover bg-no-repeat w-full overflow-hidden">
        {/**Message Block */}
        <div className="flex-shrink-0 w-1/4 flex flex-col ml-7 min-w-fit border-r-2 border-red">
          <div className="header flex text-white justify-between mt-6 mb-4 gap-3  items-center">
            <div className="logo">
              <Image src={logoWhite} alt="Logo Image" priority className="w-[97px]   sm:w-[125px] h-auto" />
            </div>
            <div className="points-details pr-5">
              <p>Minimum level : <span>5</span></p>
              <p>Points per level : <span>50</span></p>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto scrolls ">
            <p>test 1</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test last</p>

          </div>
          <div>message input</div>
        </div>

        {/**Playground */}
        <div className="w-full">
          <div className="playground flex flex-col h-full justify-between ml-5 mr-5 pt-9 pb-7">
            <div className="flex justify-between another-user-block">
              {/* User 2 Block */}
              <LeftUserBlock playerData={gamePlayersData.player1} isAnyPlayerWaiting={isAnyPlayerWaiting()} />
              <div className="flex flex-col">
                {/* User 3 Block */}
                <div>
                 <TopUserBlock  playerData={gamePlayersData.player2} isAnyPlayerWaiting={isAnyPlayerWaiting()} />
                </div>
                <div className="h-[100%] flex justify-center flex-col">
                      <CenterCardBlock isAnyPlayerWaiting={isAnyPlayerWaiting()} />
                </div>
              </div>
              <div className="">
                <div>
                  <RightUserBlock playerData={gamePlayersData.player3} isAnyPlayerWaiting={isAnyPlayerWaiting()} />
                </div>
              </div>
            </div>
              <BottomUserBlock playerData={gamePlayersData.player4} isAnyPlayerWaiting={isAnyPlayerWaiting()} />
          </div>

          <div>
            <p>{orientationType}</p>
          </div>
        </div>
      </div>
      <NotificationModal />
    </div>
  );
}