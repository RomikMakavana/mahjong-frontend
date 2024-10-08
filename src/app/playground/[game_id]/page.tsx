'use client';

import { Fragment, useEffect, useState } from "react";
import logoWhite from '@/assets/images/svg/logo_white.svg';
import UserProfile from '@/assets/images/svg/user_profile.svg';
import ThreeDotIcon from '@/assets/images/svg/three-dots-vertical.svg';
import Image from "next/image";
import LeftUserBlock from "@/components/playground/LeftUserBlock";
import TopUserBlock from "@/components/playground/TopUserBlock";
import RightUserBlock from "@/components/playground/RightUserBlock";
import BottomUserBlock from "@/components/playground/BottomUserBlock";
import CenterCardBlock from "@/components/playground/CenterCardBlock";
import { get, off, onValue, ref, set } from "firebase/database";
import { AuthService } from "@/services/firebase/auth";
import MatchCreated from "@/components/Models/MatchCreated";
import { useParams, useRouter } from "next/navigation";
import APIService from "@/services/firebase/api";
import { GameDetails, MahjongUser, PlayerDetails, GameData, MainPlayer, PlaygroundDetails } from "@/interfaces";
import { useNotifications } from "@/utils";
import Loader from "@/components/Loader";
import { random, reorderList } from "@/libs/utils";
import moment from "moment";
import NotificationModal from "@/components/Models/NotificationModal";
import { isTablet, isMobile } from 'react-device-detect';
import { helpers } from "@/helpers/helpers";
import MahjongModel from "@/components/MahjongModel";

type Player = {
  _id: string;
  player_name: string;
  player_index: number;
  user_id: string | null;
  userName: string;
  profileImg: string;
  isWait: boolean;
  showChatBubble: boolean,
  isSystemPlayer: boolean;
}

type Players = {
  [key: string]: PlayerDetails;
};

export default function GameLayout() {
  const [gameId, setGameId] = useState<string>('');
  const [user, setUser] = useState<MahjongUser | null>(null);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [mainPlayer, setMainPlayer] = useState<MainPlayer | null>(null);
  const [gamePlaygroundDetails, setGamePlaygroundDetails] = useState<PlaygroundDetails | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [isFullScreenModeon, setIsFullScreenModeon] = useState(true);
  const [gamePlayersData, setGamePlayersData] = useState<Players>({});
  const [openMatchStartedModal, setOpenMatchStartedModal] = useState(false);
  const [informationMessage, setInformationMessage] = useState<string | null>(null);
  const [openExitGameComfirmationModal, setOpenExitGameConfirmationGameModal] = useState(false);
  const [openInformationModal, setOpenInformationModal] = useState(false);
  const [currentOrientation, setCurrentOrientation] = useState('');

  const [otherDetails, setOtherDetails] = useState<{ label: string, action: () => void }[]>([])

  const [gameDetails, setGameDetails] = useState<GameDetails>();

  const params = useParams();
  const { notification } = useNotifications();
  const { game_id } = params;

  useEffect(() => {
    // Get user from Firebase Auth
    if (AuthService.user) {
      loadUser();
    } else {
      setUser(null);
    }
  }, [AuthService.user]);

  const loadUser = async () => {
    const user = await APIService.getProfile();
    if (user) {
      setUser(user);
    }
  }

  useEffect(() => {

    // Set up the timer
    const timer = setInterval(() => {
      const _second = gameData !== null && gameData.is_game_started == false && gameData.status == 'ready_to_start' && gameData.will_starts_at !== null && gameData.will_starts_at > 0 ? gameData.will_starts_at - Number(moment().format('X')) : 0;
      setSeconds((prevSeconds) => _second < 0 ? 0 : _second);
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, [seconds, gameData]);

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
    if (!user) return;
    const _gameId = params.game_id as string
    setGameId(_gameId);
  }, [user]);


  useEffect(() => {
    if (!gameId) return;
    loadGameDetails()
  }, [gameId]); // Dependency array includes gameId

  useEffect(() => {
    if (gameData == null || gameData.is_game_completed == true) return;

    const userGamePublicRef = ref(AuthService.database, 'user-games/' + gameId + '/public');
    const userGamePublicUnsubscribe = onValue(userGamePublicRef, (snapshot) => {
      const snapshotData = snapshot.val();
      setGamePlaygroundDetails({
        game_code: snapshotData?.game_code || '',
        current_turn_completed: snapshotData?.current_turn_completed || false,
        current_turn_player: snapshotData?.current_turn_player || '',
        current_turn_status: snapshotData?.current_turn_status || '',
        is_game_completed: snapshotData?.is_game_completed || false,
        is_game_started: snapshotData?.is_game_started || false,
        next_player: snapshotData?.next_player || '',
        status: snapshotData?.status || ''
      })
    });


    const dbRef = ref(AuthService.database, 'user-games/' + gameId + '/user-details/' + user?.firebaseUser.uid);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const snapshotData = snapshot.val();
      setMainPlayer({
        card_list: snapshotData?.card_list || [],
        flower_card_list: snapshotData?.flower_card_list || [],
        matched_list: snapshotData?.matched_list || []
      })
    });


    // Cleanup subscription on unmount or when gameId changes
    return () => {
      off(dbRef, 'value', unsubscribe);
      off(userGamePublicRef, 'value', userGamePublicUnsubscribe);
    };
  }, [gameData]); // Dependency array includes gameId

  useEffect(() => {
    if (gameData == null || gameData.is_game_completed == true) return;

    const dbRef = ref(AuthService.database, 'game-list/' + gameId);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const snapshotData = snapshot.val();
      
      if (!snapshotData || snapshotData.is_game_started != gameData.is_game_started || snapshotData.status != gameData.status) {
        loadGameDetails();
      } else {
        const snapshotPlayers = snapshotData.players;
        if (Array.isArray(snapshotPlayers) && snapshotPlayers.length > 0) {
          let _player_in_sequence = gameData.player_in_sequence;
          let _players: Players = {}
          for (const key in _player_in_sequence) {
            const player = snapshotPlayers.find(value => value._id == _player_in_sequence[key]._id);

            _players[player._id] = {
              _id: player._id,
              player_name: player.player_name,
              player_index: player.player_index,
              user_id: player?.user_id,
              profile_img: ''
            }
          }
          setGamePlayersData(_players);
        } else {
          loadGameDetails();
        }
      }
    });


    // Cleanup subscription on unmount or when gameId changes
    return () => {
      off(dbRef, 'value', unsubscribe);
    };
  }, [gameData]); // Dependency array includes gameId

  const handleOrientationChange = () => {
    setCurrentOrientation(screen.orientation.type);
    if ((isMobile || isTablet) && screen.orientation.type == 'portrait-primary') {
      // setOpenContinueGameModal(true);
      setOpenExitGameConfirmationGameModal(false);
      setOpenInformationModal(true);
      // setIsFullScreenModeon(false);
    }
    if ((isMobile || isTablet) && screen.orientation.type == 'landscape-primary') {
      // setOpenContinueGameModal(true);
      setOpenInformationModal(false);
      setIsFullScreenModeon(false);
      
    }
    fullscreenChangeHandler()
  }

  const fullscreenChangeHandler = () => {
    if (document.fullscreenElement) {
      setIsFullScreenModeon(true);
      setOpenExitGameConfirmationGameModal(false);
    } else {
      setOpenExitGameConfirmationGameModal(true);
      setIsFullScreenModeon(false);
    }
  }

  const isAnyPlayerWaiting = () => {
    return gameData !== null ? !gameData.is_game_started : true;
  };

  const tournOnFullScreenMode = async () => {
    const res = await helpers.handleFullscreenAndLock();
    setIsFullScreenModeon(true);
    setOpenExitGameConfirmationGameModal(false);
  }


  useEffect(() => {
    if(isMobile || isTablet) {
      tournOnFullScreenMode();
      screen.orientation.addEventListener('change', handleOrientationChange);
      document.addEventListener('fullscreenchange', fullscreenChangeHandler);
      document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler); // Safari
      document.addEventListener('mozfullscreenchange', fullscreenChangeHandler); // Firefox
      document.addEventListener('MSFullscreenChange', fullscreenChangeHandler); // Internet Explorer
      setTimeout(() => {
        handleOrientationChange();
        fullscreenChangeHandler();
      }, 1500)
    }
    return () => {
      screen.orientation.removeEventListener('change', handleOrientationChange);
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('mozfullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('MSFullscreenChange', fullscreenChangeHandler);
    }

  }, []);
  const router = useRouter();



  const activePlayerId = () => {
    if (gamePlaygroundDetails !== null && gamePlaygroundDetails.is_game_started == true) {
      return gamePlaygroundDetails.current_turn_completed == true ? gamePlaygroundDetails.next_player : gamePlaygroundDetails.current_turn_player;
    }
    return null;
  }

  const loadGameDetails = async () => {

    try {
      const res = await APIService.getGameDetails(gameId);
      if (res.status === 200 && res.data.success === true) {

        const data = res.data.data
        if (data.is_game_completed) {
          /**
           * TODO : Game completed UI
          */
          router.replace(`/playground/${gameId}/completed`)
        } else {
          console.log('call load games', data.is_game_started, data.usersPlayingOtherGames.length);
          // let user = await AuthService.getAuthDetails();
          let _player_in_sequence = reorderList(data.players, user?.apiUser._id as string);
          let _players: Players = {}
          for (const key in _player_in_sequence) {
            const player = _player_in_sequence[key];
            _players[player._id] = {
              _id: player._id,
              player_name: player.player_name,
              player_index: player.player_index,
              user_id: player.user_id,
              profile_img: ''
            }
          }

          if (!data.is_game_started && data.usersPlayingOtherGames.length > 0) {

            const getPlayingOtherGamesUsersName = data.players.filter(player => data.usersPlayingOtherGames.includes(player.user_id as string)).map(player => player.player_name);
            setInformationMessage(`Players ${getPlayingOtherGamesUsersName.join(', ')} are playing other games.`);

          }

          setGameData({
            is_game_completed: data.is_game_completed,
            is_game_started: data.is_game_started,
            game_code: data.game_code,
            status: data.status,
            player_in_sequence: Object.values(_players),
            will_starts_at: data.not_started_details.begin_time
          })

          setGamePlayersData(_players);
        }

        if(data.is_game_started == false) {
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

        // setGameDetails(data);
        // if (!data.is_game_started) {
        //   setOpenMatchStartedModal(true);
        //   setOtherDetails(prevItems => {
        //     // Ensure it is not added twice
        //     if (prevItems.some(item => item.label === 'Get Code')) return prevItems;
        //     return [
        //       ...prevItems,
        //       {
        //         label: 'Get Code',
        //         action: () => {
        //           setOpenMatchStartedModal(true);
        //         },
        //       },
        //     ];
        //   });
        // }

        // //Set players.
        // const players = data.players.map((player) => ({ userName: player.player_name, profileImg: UserProfile, isWait: false, showChatBubble: false, player_id: player._id, userId: player.user_id }))
        // console.log('[playears', players);


        // const mainPlayer = players.find((player) => player.userId != null);
        // const otherPlayers = players.filter((player) => player.userId == null);
        // const playersList: Players = {}
        // if (mainPlayer) {
        //   playersList['mainPlayer'] = mainPlayer
        // }

        // otherPlayers.forEach((player, index) => {
        //   playersList[`player${index + 1}`] = player
        // })

        // setGamePlayersData({ ...playersList })
        // console.log('ploayear', playersList);
      } else {
        /**
         * TODO: Game not found UI
         */
        notification('Something went wrong', 'error');
      }
    } catch (error) {
      notification('Something went wrong', 'error');
      console.log(error);

    }
  }



  return (
    <div>
      {
        !(gameData !== null) ? <Loader /> : <Fragment>
          <div className="flex m-auto h-screen bg-game-page-bg-image bg-cover bg-no-repeat w-full  overflow-hidden">
            <div className="flex  overflow-hidden  border rounded-sm border-solid border-black w-full">
              {/**Message Block */}
              <div className="flex-shrink-0 flex flex-col ml-4 between-lg-and-2xl:ml-7 min-w-fit border-r-2 border-red w-[20%] between-lg-and-2xl:w-1/4">
                <div className="header flex text-white justify-between mt-6 mb-4 gap-3  items-center">
                  <div className="logo">
                    <Image src={logoWhite} alt="Logo Image" priority className="w-[65px]   between-md-and-sm:w-[125px] h-auto" />
                  </div>
                  {/* <div className=" points-details pr-5">
                    <span className="hidden sm:block">
                      <p>Minimum level : <span>5</span></p>
                      <p>Points per level : <span>50</span></p>
                    </span>
                  </div> */}
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
              <div className="w-full">
                {/* <p className="text-white"> full Screen {isFullScreenModeon ? 'true' : 'false'} <br/> orientation {currentOrientation}</p> */}
                {
                  Object.keys(gamePlayersData).length > 0 &&
                  <div className="playground flex flex-col h-full justify-between mx-2 md:ml-5 md:mr-5  py-4 md:pb-7 md:pt-7">
                    <div className="flex justify-between another-user-block h-[100%]">
                      {/* User 2 Block */}
                      {
                        gameData.player_in_sequence.length > 3 ?
                          <LeftUserBlock
                            myTurn={gameData.player_in_sequence[3]._id == activePlayerId()}
                            showBubbleChat={false}
                            playerData={gamePlayersData[gameData.player_in_sequence[3]._id]}
                            waiting={!gameData.is_game_started}
                          /> :
                          <Fragment />
                      }
                      <div className="flex flex-col">
                        {/* User 3 Block */}
                        <div>
                          {
                            gameData.player_in_sequence.length > 2 ?
                              <TopUserBlock
                                myTurn={gameData.player_in_sequence[2]._id == activePlayerId()}
                                showBubbleChat={false}
                                playerData={gamePlayersData[gameData.player_in_sequence[2]._id]}
                                waiting={!gameData.is_game_started}
                              />
                              : <Fragment />
                          }

                        </div>
                        <div className="h-full flex justify-center flex-col">
                          <CenterCardBlock
                            gameStatus={gameData.status}
                            seconds={seconds}
                            isAnyPlayerWaiting={!gameData.is_game_started} />
                        </div>
                      </div>
                      <div className="">
                        <div>
                          {
                            gameData.player_in_sequence.length > 1 ?
                              <RightUserBlock
                                myTurn={gameData.player_in_sequence[1]._id == activePlayerId()}
                                showBubbleChat={false}
                                playerData={gamePlayersData[gameData.player_in_sequence[1]._id]}
                                waiting={!gameData.is_game_started}
                              /> :
                              <Fragment />
                          }
                        </div>
                      </div>
                    </div>
                    {
                      gameData.player_in_sequence.length > 0 ?
                        <BottomUserBlock
                          mainPlayer={mainPlayer!}
                          myTurn={gameData.player_in_sequence[0]._id == activePlayerId()}
                          showBubbleChat={false}
                          gameData={gameData}
                          playerData={gamePlayersData[gameData.player_in_sequence[0]._id]}
                          waiting={isAnyPlayerWaiting()}
                          gamePlaygroundDetails={gamePlaygroundDetails}
                        /> : <Fragment />
                    }
                  </div>
                }
                <div>
                </div>
              </div>
            </div>
          </div>
          {
            informationMessage &&
            <NotificationModal closeModel={() => setInformationMessage(null)}>
              <div className="text-white font-medium text-base">
                <p>{informationMessage}</p>
              </div>
            </NotificationModal>
          }

          {/* <CompleteGameModel /> */}

          {
            gameDetails && gameDetails.is_game_started === false && gameDetails.game_code && openMatchStartedModal &&
            <MatchCreated open={openMatchStartedModal} closeModal={setOpenMatchStartedModal} gameCode={gameDetails.game_code} />
          }
        </Fragment>
      }

      <MahjongModel open={openExitGameComfirmationModal} extraCss="w-[400px]">
        <div>
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-bold text-white">Are you sure you want to exit the game?</h2>
          </div>
          <div className='flex items-center gap-2 mt-5'>
            <button onClick={() => router.replace('/')} className='flex-1 text-white py-3.5 text-sm sm:text-base font-bold opacity-60 border border-white border-opacity-10 rounded-9 max-xs:text-sm'>Exit</button>
            <button onClick={() => tournOnFullScreenMode()} className='flex-1 bg-brand-blue py-3.5 text-base font-bold text-white rounded-9 max-xs:text-sm'>Continue</button>
          </div>
        </div>
      </MahjongModel>
      <MahjongModel open={openInformationModal} extraCss="w-[400px]">
          <div className="">
            <h2 className="text-2xl font-bold text-white">Please rotate your phone for batter user experience.</h2>
          </div>
      </MahjongModel>
    </div>
  );
}