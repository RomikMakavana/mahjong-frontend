'use client';

import { useEffect, useState } from "react";
import logoWhite from '@/assets/images/svg/logo_white.svg';
import UserProfile from '@/assets/images/svg/user_profile.svg';
import Image from "next/image";
import LeftUserBlock from "@/components/playground/LeftUserBlock";
import TopUserBlock from "@/components/playground/TopUserBlock";
import RightUserBlock from "@/components/playground/RightUserBlock";
import BottomUserBlock from "@/components/playground/BottomUserBlock";
import CenterCardBlock from "@/components/playground/CenterCardBlock";
import { off, onValue, ref, set } from "firebase/database";
import { AuthService } from "@/services/firebase/auth";

type Player = {
  userName: string;
  profileImg: string;
  isWait: boolean;
  showChatBubble: boolean,
  player_id: string
}
export default function GameLayout() {
  const [orientationType, setOrientationType] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [userUid, setUserUid] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [gamePlayersData, setGamePlayersData] = useState<{ [kay: string]: Player }>({
    player1: {
      userName: 'dakshjoshi66758',
      profileImg: UserProfile,
      isWait: false,
      showChatBubble: false,
      player_id: '1'
    },
    player2: {
      userName: 'dakshjoshi66758',
      profileImg: UserProfile,
      isWait: false,
      showChatBubble: false,
      player_id: '2'
    },
    player3: {
      userName: 'dakshjoshi66758',
      profileImg: UserProfile,
      isWait: false,
      showChatBubble: false,
      player_id: '3'
    },
    player4: {
      userName: 'dakshjoshi66758',
      profileImg: UserProfile,
      isWait: false,
      showChatBubble: false,
      player_id: '4'
    },
  })

  useEffect(() => {
    setGameId('66dedb315aa9bdf2479dd226');
    getUserDetail();
  });

  useEffect(() => {
    if (!gameId) return;
    
    setLoading(true);
    const dbRef = ref(AuthService.database, 'user-games/' + gameId + '/public');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      console.log('snapshot.val()',snapshot.val());
      
      setData(snapshot.val());
      setLoading(false);
    });

    // Cleanup subscription on unmount or when gameId changes
    return () => {
      off(dbRef, 'value', unsubscribe);
    };
  }, [gameId]); // Dependency array includes gameId

  const getUserDetail = async () => {
    const _user = await AuthService.getProfile();
    if(_user){
      setUserUid(_user.uid);
    }
  }

  const handleOrientationChange = () => {
    setOrientationType(screen.orientation.type);
  }

  const isAnyPlayerWaiting = () => {

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
      <div className="flex m-auto h-screen bg-game-page-bg-image bg-cover bg-no-repeat w-full  ">
        <div className="flex m-auto overflow-hidden h-[100%] w-[100%]  max-h-[900px] max-w-[1600px] border rounded-sm border-solid border-black ">
          {/**Message Block */}
          <div className="flex-shrink-0 flex flex-col ml-7 min-w-fit border-r-2 border-red w-[20%] sm:w-1/4">
            <div className="header flex text-white justify-between mt-6 mb-4 gap-3  items-center">
              <div className="logo">
                <Image src={logoWhite} alt="Logo Image" priority className="w-[65px]   between-md-and-sm:w-[125px] h-auto" />
              </div>
              <div className=" points-details pr-5">
                <span className="hidden sm:block">
                  <p>Minimum level : <span>5</span></p>
                  <p>Points per level : <span>50</span></p>
                </span>
                <span>

                </span>
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
          <div className="w-full overflow-auto">
            <div className="playground flex flex-col h-full justify-between ml-5 mr-5 sm:pt-9 sm:pb-7 pb-4 pt-4">
              <div className="flex justify-between another-user-block h-[100%]">
                {/* User 2 Block */}
                <LeftUserBlock playerData={gamePlayersData.player1} isAnyPlayerWaiting={isAnyPlayerWaiting()} />
                <div className="flex flex-col">
                  {/* User 3 Block */}
                  <div>

                    <TopUserBlock playerData={gamePlayersData.player2} isAnyPlayerWaiting={isAnyPlayerWaiting()} />

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
      </div>
      {/* <NotificationModal /> */}
      {/* <NotificationModal /> */}

      {/* <CompleteGameModel /> */}
    </div>
  );
}