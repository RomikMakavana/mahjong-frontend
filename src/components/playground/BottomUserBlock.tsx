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
import { MainPlayer, PlayerDetails } from '@/interfaces';
import { GameData } from '@/interfaces';
import MahjongModel from '../MahjongModel';
import APIService from '@/services/firebase/api';
import { useParams } from 'next/navigation';
import { useNotifications } from "@/utils";
import CARDS from '@/helpers/cardsList';

interface BottomUserBlockProps {
  playerData: PlayerDetails,
  waiting: boolean,
  showBubbleChat: boolean,
  myTurn: boolean
  gameData: GameData,
  mainPlayer: MainPlayer
}

export default function BottomUserBlock({ playerData, waiting, showBubbleChat, gameData, myTurn, mainPlayer }: BottomUserBlockProps) {

  const mainUserCardBlock = [];
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [openStartGameModel, setOpenStartGameModel] = useState(false);
  const [gameStartWithSystemPlayers, setGameStartWithSystemPlayers] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { notification } = useNotifications();
  
  const params = useParams();

  const { game_id } = params;


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
        <Image src={waiting ? WaitingCardBackSide : mainPlayer?.card_list.length > 0 ? CARDS[mainPlayer.card_list[i]?.toString()] : WaitingCardBackSide} alt="Tile" priority className="w-[35px] sm:w-[50px] h-auto" />
      </div>
    );
  }

  const beginGame = async () => {
    setIsProcessing(true);
    const res = await APIService.beginGame(game_id as string, gameStartWithSystemPlayers);
    if(res.status == 200 && res.data.success){
      setIsProcessing(false);
      setOpenStartGameModel(false);
    }else {
      notification(res.data.message, 'error');
      setIsProcessing(false);
    }
  }

  return (
    <>
      <div className="main-user-block flex flex-col items-center sm:gap-5 gap-3">
        <div className="flex gap-[2px]">
          {mainUserCardBlock}
        </div>
        <div className="user-block w-full flex justify-between items-center">
          <div className="userSection flex items-center gap-3">
            <PickCard flowerCardList={mainPlayer?.flower_card_list.length} isAnyPlayerWaiting={waiting} />
            <UserProfileBlock showChatBubble={showBubbleChat} userName={playerData.player_name} myTurn={myTurn} profileImg={playerData.profile_img} isWait={waiting && playerData.user_id == null} rotate={false} speechBubbleClasses='bottom-[150%] mb-3 left-[-20%]' arrowSide='bottom' />
            <div className="flex items-center sm:mt-2">
              <Image src={SmileEmoji} alt="Smile Image" priority className="z-10 w-[25px] sm:w-[45px] p-[4px] sm:p-[10px] h-auto border-[1px] border-[#ED9108]  rounded-full" />
            </div>

          </div>
          {
            gameData.status == 'created' && gameData.is_game_started == false  &&
          <div>
            <button onClick={() => setOpenStartGameModel(true)} className='text-white bg-brand-blue px-5 py-2 font-medium text-sm rounded-9'>Start Game</button>
          </div>
          }
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
      <MahjongModel open={openStartGameModel && gameData.status == 'created' && gameData.is_game_started == false} extraCss="xs:w-[363px]" closeModel={() => setOpenStartGameModel(false)}>
        <div className='text-white'>
          <h3 className='text-center font-bold text-xl mb-5 max-xs:font-medium'>Start Game</h3>
          <div className='text-white'>
            <div className='flex items-center justify-between relative'>
              <div>
                <label htmlFor='withSystemPlayer' className='text-base font-semibold cursor-pointer max-xs:text-sm'>Start with system player</label>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input checked={gameStartWithSystemPlayers} onChange={() => setGameStartWithSystemPlayers(!gameStartWithSystemPlayers)} type="checkbox" className="sr-only peer"/>
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
