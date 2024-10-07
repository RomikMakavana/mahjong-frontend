import Image from 'next/image';
import PickCard from './PickCard';
import UserProfileBlock from './UserProfileBlock';
import SmileEmoji from '@/assets/images/svg/smile.svg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MainPlayer, PickedFrom, PlayerDetails, PlaygroundDetails } from '@/interfaces';
import { GameData } from '@/interfaces';
import MahjongModel from '../MahjongModel';
import APIService from '@/services/firebase/api';
import { useParams } from 'next/navigation';
import { useNotifications } from "@/utils";
import CardComponent from '@/components/Cards/CardComponent';
import Loader from '../Loader';


interface BottomUserBlockProps {
  playerData: PlayerDetails,
  waiting: boolean,
  showBubbleChat: boolean,
  myTurn: boolean
  gameData: GameData,
  mainPlayer: MainPlayer,
  gamePlaygroundDetails: PlaygroundDetails | null
}

type PickedFor = 'normal' | 'pong' | 'seung' | null;

export default function BottomUserBlock({
  playerData,
  waiting,
  showBubbleChat,
  gameData,
  myTurn,
  mainPlayer,
  gamePlaygroundDetails
}: BottomUserBlockProps) {

  const [openStartGameModel, setOpenStartGameModel] = useState(false);
  const [gameStartWithSystemPlayers, setGameStartWithSystemPlayers] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardPicked, setIsCardPicked] = useState(false);
  const [cardPickAndDropProcessing, setCardPickAndDropProcessing] = useState(false);
  const [pickedFor, setPickedFor] = useState<PickedFor>(null);
  const [droppedCardIndex, setDroppedCardIndex] = useState<number | null>(null);


  const { notification } = useNotifications();

  const params = useParams();

  const { game_id } = params;

  const beginGame = async () => {
    setIsProcessing(true);
    const res = await APIService.beginGame(game_id as string, gameStartWithSystemPlayers);
    if (res.status == 200 && res.data.success) {
      setIsProcessing(false);
      setOpenStartGameModel(false);
    } else {
      notification(res.data.message, 'error');
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    console.log('gamePlaygroundDetails', gamePlaygroundDetails);
    if (gamePlaygroundDetails && gamePlaygroundDetails.current_turn_completed === false) {
      setIsCardPicked(true);
    } else {
      setIsCardPicked(false);
    }
    setCardPickAndDropProcessing(false);
    setPickedFor(null);
    // setDroppedCardIndex(null);

  }, [gamePlaygroundDetails])

  const pickCard = async (pickFrom: PickedFrom, pickedFor: PickedFor) => {
    setCardPickAndDropProcessing(true);
    setPickedFor(pickedFor);
    try {
      const res = await APIService.pickCard(game_id as string, playerData._id, pickFrom);
      if (res.status === 200 && res.data.success) {
        notification('Card picked successfully', 'success');
      } else {
        notification('Something went wrong', 'error');
      }

    } catch (error) {
      console.log(error);

    }
  }

  const cards = useMemo(() => {

    const matchedCardList = mainPlayer?.matched_list.flat();
    const updatedCardList = mainPlayer ? [...mainPlayer?.card_list] : []

    matchedCardList && matchedCardList.length && matchedCardList.forEach(card => {
      const cardIndex = updatedCardList.indexOf(card);
      if (cardIndex !== -1) {
        updatedCardList.splice(cardIndex, 1);
      }
    })

    const isPong = ((cards: string[]): boolean => {
      const numericValues = cards.map(item => {
        const match = item.match(/\d+$/); // Extract the numeric part        
        return match ? parseInt(match[0], 10) : null; // Parse the number
      });

      // Check if all numeric values are sequential
      for (let i = 1; i < numericValues.length; i++) {
        if (numericValues[i] === null || numericValues[i - 1] === null || numericValues[i] !== numericValues[i - 1] as number + 1) {
          return false;
        }
      }

      return true;
    })


    const dropCard = async (cardId: string, index: number) => {

      if (isCardPicked) {
        setCardPickAndDropProcessing(true);
        setDroppedCardIndex(index);
        try {
          const res = await APIService.dropcard(game_id as string, playerData._id, cardId);
          if (res.status === 200 && res.data.success) {
            notification('Card dropped successfully', 'success');
            // updatedCardList.splice(index, 1);
          } else {
            notification('Something went wrong', 'error');
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        notification('Please pick a card first', 'info');
      }
    }

    return (
      <div className='flex gap-[2px]'>

        {
          gameData.is_game_started && mainPlayer ? (
            <>
              {
                mainPlayer && mainPlayer.matched_list.length > 0 && mainPlayer.matched_list.map((list, indexOfList) => (
                  <React.Fragment key={indexOfList}>
                    {list.map((card, index) => (
                      <CardComponent
                        key={`${indexOfList}-${index}`}
                        canDrop={false}
                        myTurn={myTurn}
                        cardId={card}
                        isGameStarted={true}
                        isPong={isPong(list) ? true : false}
                      />
                    ))}
                  </React.Fragment>
                ))
              }
              {updatedCardList.map((card, index) => {
                return (
                  <CardComponent action={() => dropCard(card, index)} isProcessing={droppedCardIndex == index ? true : false} key={index} canDrop={isCardPicked && myTurn} myTurn={myTurn} cardId={card} isGameStarted={true} isPong={null} />
                )
              })}
            </>
          )
            : (
              Array.from({ length: 13 }).map((number, index) => {
                return (
                  <CardComponent key={index} canDrop={false} isPong={null} cardId='waiting-card' isGameStarted={false} myTurn={false} />
                )
              }))
        }
      </div>
    )
  }, [mainPlayer, myTurn])

  return (
    <>
      <div className="main-user-block flex flex-col items-center  md:gap-5">
        {cards}
        <div className="user-block w-full flex justify-between items-center">
          <div className="userSection flex items-center gap-3">
            <PickCard flowerCardList={mainPlayer?.flower_card_list.length} isAnyPlayerWaiting={waiting} />
            <UserProfileBlock showChatBubble={showBubbleChat} userName={playerData.player_name} playerData={playerData} myTurn={myTurn} profileImg={playerData.profile_img} isWait={waiting && playerData.user_id == null} rotate={false} speechBubbleClasses='bottom-[150%] mb-3 left-[-20%]' arrowSide='bottom' />
            {/* <div className="flex items-center sm:mt-2">
              <Image src={SmileEmoji} alt="Smile Image" priority className="z-10 w-[25px] sm:w-[45px] p-[4px] sm:p-[10px] h-auto border-[1px] border-[#ED9108]  rounded-full" />
            </div> */}

          </div>
          {
            gameData.status == 'created' && gameData.is_game_started == false &&
            <div>
              <button onClick={() => setOpenStartGameModel(true)} className='text-white bg-brand-blue px-5 py-2 font-medium text-sm rounded-9'>Start Game</button>
            </div>
          }
          {
            gameData.is_game_started && myTurn &&
            // true &&
            <div className="flex md:gap-2 ">
              <button disabled={isCardPicked || cardPickAndDropProcessing} onClick={() => pickCard('rest', 'normal')} className="flex relative flex-1 justify-center items-center  border border-brand-purple rounded-lg min-w-16 md:min-w-24 h-10 md:h-12 xs:mr-3 disabled:opacity-55 disabled:cursor-not-allowed">
                {
                  pickedFor === 'normal' ?
                    <Loader customClass='!w-4 !h-4' withoutBackground={true} /> :
                    <span className="btn-text">Pick</span>
                }
              </button>
              <button disabled={isCardPicked || cardPickAndDropProcessing} onClick={() => pickCard('discarded', 'pong')} className="flex flex-1 justify-center items-center bg-[#DD6C05] relative min-w-16 md:min-w-24 h-10 md:h-12 rounded-lg xs:mr-3 disabled:opacity-55 disabled:cursor-not-allowed">
                {
                  pickedFor === 'pong' ?
                    <Loader customClass='!w-4 !h-4' withoutBackground={true} /> :
                    <span className="btn-text text-white">Pong</span>

                }
              </button>
              <button disabled={isCardPicked || cardPickAndDropProcessing} onClick={() => pickCard('discarded', 'seung')} className="flex flex-1 justify-center items-center relative bg-[#739A00] border min-w-16 md:min-w-24 h-10 md:h-12 border-[#739A00] rounded-lg xs:mr-3 disabled:opacity-55 disabled:cursor-not-allowed">
                {
                  pickedFor === 'seung' ?
                    <Loader customClass='!w-4 !h-4' withoutBackground={true} /> :
                    <span className="btn-text">Seung</span>

                }
              </button>
            </div>
          }

        </div>
      </div>
      <MahjongModel open={openStartGameModel && gameData.status == 'created' && gameData.is_game_started == false} extraCss="xs:w-[363px]" closeModel={() => setOpenStartGameModel(false)}>
        <div className='text-white'>
          <h3 className='text-center font-bold text-xl mb-5 max-xs:font-medium'>Start Game</h3>
          <div className='text-white'>
            <div className='flex items-center justify-between relative'>
              <div>
                <label htmlFor='withSystemPlayer' className='text-base font-semibold cursor-pointer max-xs:text-sm'>Start with system player</label>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input checked={gameStartWithSystemPlayers} onChange={() => setGameStartWithSystemPlayers(!gameStartWithSystemPlayers)} type="checkbox" className="sr-only peer" />
                <div className="max-xs:w-7 max-xs:h-[14px] w-10 h-[20px] bg-white rounded-full peer peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[1px] after:left-[0.2px] after:bg-[#6E6E6E] after:rounded-full max-xs:after:h-3 max-xs:after:w-3 after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-brand-blue peer-checked:after:bg-white peer-checked:after:left-[2.8px] "></div>
              </label>
            </div>
          </div>
          <div className='flex items-center gap-2 mt-5'>
            <button onClick={() => setOpenStartGameModel(false)} className='flex-1 text-white py-3.5 text-sm sm:text-base font-bold opacity-60 border border-white border-opacity-10 rounded-9 max-xs:text-sm'>Close</button>
            <button onClick={() => beginGame()} className='flex-1 bg-brand-blue py-3.5 text-base font-bold text-white rounded-9 max-xs:text-sm'>{isProcessing ? 'Starting...' : 'Start'}</button>
          </div>
        </div>
      </MahjongModel>
    </>
  )
}
