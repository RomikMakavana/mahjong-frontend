import Image from 'next/image';
import BacksideOfSoftwareCardHorizontal from '@/assets/images/svg/cards/backside_of_software_card_horizontal.png';
import BacksideOfSoftwareCardVertical from '@/assets/images/svg/cards/backside_of_software_card_vertical.png';
import FlowerCard1 from '@/assets/images/svg/cards/flower_card_1.svg';
import MainUserCard from '@/assets/images/svg/main_user_card.svg';
import { Fragment, useEffect, useState } from 'react';
import GlobalCard from '../Cards/CardComponent';
import { GameData, PlaygroundDetails } from '@/interfaces';

interface CenterCardBlockProps {
  isAnyPlayerWaiting: boolean,
  gameStatus: string;
  seconds: number;
  turnSeconds: number;
  card_id: string;
  gamePlaygroundDetails: PlaygroundDetails | null
  gameData: GameData | null
}
export default function CenterCardBlock({ isAnyPlayerWaiting, gameStatus, seconds, card_id, gamePlaygroundDetails, turnSeconds, gameData }: CenterCardBlockProps) {

  const [animate, setAnimate] = useState(false);

  const FlowerCardBlock = [];
  for (let i = 0; i < 12; i++) {
    FlowerCardBlock.push(
      <Image key={`flower-${i}`} src={FlowerCard1} alt="Logo Image" priority className="w-[auto] sm:w-auto h-[18px] md:h-[28px] between-lg-and-2xl:h-[38px]" />
    );
  }

  const BacksideOfSoftwareHorizontalCardBlock = [];
  for (let i = 0; i < 8; i++) {
    BacksideOfSoftwareHorizontalCardBlock.push(
      <Image key={`horizontal-${i}`} src={BacksideOfSoftwareCardHorizontal} alt="Logo Image" priority className="w-[auto] sm:w-auto h-[14px] md:h-[21px] between-lg-and-2xl:h-[28px]" />
    );
  }


  const BacksideOfSoftwareCardVerticalCardBlock = [];
  const BacksideOfSoftwareCardVerticalCardBlockBottom = [];
  for (let i = 0; i < 12; i++) {
    BacksideOfSoftwareCardVerticalCardBlock.push(
      <Image key={`vertical-${i}`} src={BacksideOfSoftwareCardVertical} alt="Logo Image" priority className="w-[14px] md:w-[18px] between-lg-and-2xl:w-[28px] h-[auto]" />
    );
  }

  for (let i = 0; i < 12; i++) {
    BacksideOfSoftwareCardVerticalCardBlockBottom.push(
      <Image key={`vertical-${i}`} src={BacksideOfSoftwareCardVertical} alt="Logo Image" priority className="w-[14px] md:w-[18px] between-lg-and-2xl:w-[28px] h-[auto] rotate-180" />
    );
  }

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  }, [seconds])

  return (
    <div className="">
      <div className="flex justify-between mx-auto w-fit">
        {!isAnyPlayerWaiting && (
          <div className="grid grid-cols-2 gap-[1px]">
            {FlowerCardBlock}
          </div>
        )}

        <div className="  text-white flex  justify-between items-center gap-1 md:gap-[6px]">
          <div className='left-block flex flex-col gap-[1px]'>
            {BacksideOfSoftwareHorizontalCardBlock}
          </div>
          <div className='center-block flex justify-between flex-col  h-[100%] items-center'>
            <div className='top-block flex gap-[2px]'>
              {BacksideOfSoftwareCardVerticalCardBlock}
            </div>
            <div className='relative center-block w-[100%] h-[100%] flex flex-col bg-campas-bg-image bg-auto bg-center bg-no-repeat '>
              {
                isAnyPlayerWaiting ? (gameStatus === 'ready_to_start' ?
                  <div className={`text-4xl h-full font-bold`}>
                    {seconds != 0 ?
                      <div className='relative h-full flex justify-center items-center' >
                        <p className='absolute top-2 between-lg-and-2xl:top-4 text-lg  md:text-xl between-lg-and-2xl:text-xl'>Match starts in</p>
                        <p className={`${animate ? 'animate-fade-out' : ''} absolute`}>{seconds}</p>
                      </div> :
                      <div className="flex h-full items-center justify-center flex-row gap-2">
                        <div className="w-1.5 h-1.2 md:w-3 md:h-3 rounded-full bg-white  animate-bounce"></div>
                        <div className="w-1.5 h-1.2 md:w-3 md:h-3 rounded-full bg-white  animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-1.5 h-1.2 md:w-3 md:h-3 rounded-full bg-white  animate-bounce [animation-delay:-.5s]"></div>
                      </div>
                    }
                  </div> : <p className='max-md:text-xs m-auto'> Waiting for players...</p>) : (
                  <>
                    <div className='border-[#FFA62D] w-fit m-auto border-[0.3px] rounded-9 shadow-inner shadow-[#FFA62D]' style={{ boxShadow: 'inset 0 0 10px #f8a100' }}>
                      <GlobalCard cardId={card_id} myTurn={false} canDrop={false} isGameStarted={true} isPong={null} />
                      {/* <Image src={MainUserCard} alt="Logo Image" priority className="w-7 md:w-[35px]   between-lg-and-2xl:w-[50px] h-auto m-1.5 between-lg-and-2xl:m-3" /> */}
                    </div>
                    {
                      gameData && gameData.is_game_started && (turnSeconds <= 0 || turnSeconds >= gameData.turn_timeout) ?
                      <Fragment><span>Processing...</span></Fragment> : <span>Time left - {turnSeconds}</span>
                    }
                  </>
                )
              }
            </div>
            <div className='bottom-block top-block flex gap-[2px]'>
              {BacksideOfSoftwareCardVerticalCardBlockBottom}
            </div>
          </div>
          <div className='right-block flex flex-col mr-[1px] gap-[1px]'>
            {BacksideOfSoftwareHorizontalCardBlock}
          </div>
        </div>
        {!isAnyPlayerWaiting && (
          <div className="grid grid-cols-2 gap-[1px]">
            {FlowerCardBlock}
          </div>
        )}
      </div>
    </div>
  );
}