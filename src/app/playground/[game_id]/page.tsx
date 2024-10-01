'use client';

import { useEffect, useState } from "react";
import logoWhite from '@/assets/images/svg/logo_white.svg';
import UserProfile from '@/assets/images/svg/user_profile.svg';
import ThreeDotIcon from '@/assets/images/svg/three-dots-vertical.svg';
import Image from "next/image";
import LeftUserBlock from "@/components/playground/LeftUserBlock";
import TopUserBlock from "@/components/playground/TopUserBlock";
import RightUserBlock from "@/components/playground/RightUserBlock";
import BottomUserBlock from "@/components/playground/BottomUserBlock";
import CenterCardBlock from "@/components/playground/CenterCardBlock";
import { off, onValue, ref, set } from "firebase/database";
import { AuthService } from "@/services/firebase/auth";
import MatchCreated from "@/components/Models/MatchCreated";
import { useParams } from "next/navigation";
import APIService from "@/services/firebase/api";
import { GameDetails } from "@/interfaces";
import { useNotifications } from "@/utils";

type Player = {
  userName: string;
  profileImg: string;
  isWait: boolean;
  showChatBubble: boolean,
  player_id: string
}

type Players = {
  [key: string]: Player;
};
export default function GameLayout() {
  const [orientationType, setOrientationType] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [userUid, setUserUid] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [openMatchStartedModal, setOpenMatchStartedModal] = useState(true);
  const [isFetchingDetails, setIsFetchingDetails] = useState(true);

  const [otherDetails, setOtherDetails] = useState<{ label: string, action: () => void }[]>([])

  const [gameDetails, setGameDetails] = useState<GameDetails>();

  const params = useParams();
  const { notification } = useNotifications();
  const { game_id } = params;

  const [gamePlayersData, setGamePlayersData] = useState<{ [kay: string]: Player }>({})

  // const [gamePlayersData, setGamePlayersData] = useState<{ [kay: string]: Player }>({
  //   player1: {
  //     userName: 'dakshjoshi66758',
  //     profileImg: UserProfile,
  //     isWait: false,
  //     showChatBubble: false,
  //     player_id: '1'
  //   },
  //   player2: {
  //     userName: 'dakshjoshi66758',
  //     profileImg: UserProfile,
  //     isWait: false,
  //     showChatBubble: false,
  //     player_id: '2'
  //   },
  //   player3: {
  //     userName: 'dakshjoshi66758',
  //     profileImg: UserProfile,
  //     isWait: false,
  //     showChatBubble: false,
  //     player_id: '3'
  //   },
  //   mainPlayer: {
  //     userName: 'dakshjoshi66758',
  //     profileImg: UserProfile,
  //     isWait: false,
  //     showChatBubble: false,
  //     player_id: '4'
  //   },
  // })


  useEffect(() => {
    const gameId = params.game_id as string
    setGameId(gameId);
    getUserDetail();
  }, []);
  

  useEffect(() => {
    if (!gameId) return;

    setLoading(true);
    const dbRef = ref(AuthService.database, 'user-games/' + gameId + '/public');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
      setLoading(false);
    });

    getGameDetails();

    // Cleanup subscription on unmount or when gameId changes
    return () => {
      off(dbRef, 'value', unsubscribe);
    };
  }, [gameId]); // Dependency array includes gameId

  const getUserDetail = async () => {
    const _user = await AuthService.getProfile();
    if (_user) {
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


  const getGameDetails = async () => {

    try {
      const res = await APIService.getGameDetails(gameId);
      
      
      if (res.status === 200 && res.data.success === true) {
        
        const data = res.data.data
        
        setGameDetails(data);
        if (!data.is_game_started) {
          setOpenMatchStartedModal(true);
          setOtherDetails(prevItems => {
            // Ensure it is not added twice
            if (prevItems.some(item => item.label === 'Get Code')) return prevItems;
            return [
              ...prevItems,
              {
                label: 'Get Code',
                action: () => {
                  setOpenMatchStartedModal(true);
                },
              },
            ];
          });
        }

          //Set players.
          const players = data.players.map((player) => ({ userName: player.player_name, profileImg: UserProfile, isWait: false, showChatBubble: false, player_id: player._id, userId: player.user_id }))
          console.log('[playears', players);
          
          
          const mainPlayer = players.find((player) => player.userId != null);
          const otherPlayers = players.filter((player) => player.userId == null);
          const playersList: Players = {}
          if (mainPlayer) {
            playersList['mainPlayer'] = mainPlayer
          }

          otherPlayers.forEach((player, index) => {
            playersList[`player${index + 1}`] = player
          })

          setGamePlayersData({ ...playersList })
          console.log('ploayear', playersList);
      } else {
        notification('Something went wrong', 'error');
      }
    } catch (error) {
      notification('Something went wrong', 'error');
      console.log(error);

    }
  }



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
              </div>
              {
                otherDetails.length > 0 &&
                <div className="relative group/menu w-fit cursor-pointer items-center rounded-9">
                  <button className="p-2 bg-brand-blue rounded-full mr-2">
                    <Image src={ThreeDotIcon} alt="More Items" className="w-4 h-4" />
                  </button>
                  <div className="absolute  bg-black invisible transition-opacity duration-500 opacity-0 group-hover/menu:opacity-100 group-hover/menu:visible border border-brand-purple rounded-9 top-8 -left-24 z-[999] w-[135px] py-2">
                    {
                      otherDetails.map((value, index) => {
                        return (
                          <button onClick={() => value.action()} key={index} className="flex items-center py-3 group/item px-5 last:mb-0 w-full transition-all duration-300 hover:bg-brand-blue hover:bg-opacity-30">
                            <span className="text-sm font-medium text-white group-hover/item:scale-15 transition-all duration-300">{value.label}</span>
                          </button>
                        )
                      })
                    }
                  </div>
                </div>
              }
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
            {
              Object.keys(gamePlayersData).length > 0  &&
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
              <BottomUserBlock playerData={gamePlayersData.mainPlayer} isAnyPlayerWaiting={isAnyPlayerWaiting()} />
            </div>
            }

            <div>
              <p>{orientationType}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <NotificationModal /> */}
      {/* <NotificationModal /> */}

      {/* <CompleteGameModel /> */}

      {
        gameDetails && gameDetails.is_game_started === false && gameDetails.game_code &&
        <MatchCreated open={openMatchStartedModal} closeModal={setOpenMatchStartedModal} gameCode={gameDetails.game_code} />
      }
    </div>
  );
}