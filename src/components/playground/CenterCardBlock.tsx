import Image from 'next/image';
import BacksideOfSoftwareCardHorizontal from '@/assets/images/svg/cards/backside_of_software_card_horizontal.png';
import BacksideOfSoftwareCardVertical from '@/assets/images/svg/cards/backside_of_software_card_vertical.png';
import FlowerCard1 from '@/assets/images/svg/cards/flower_card_1.svg';
import MainUserCard from '@/assets/images/svg/main_user_card.svg';
import { useEffect, useState } from 'react';

interface CenterCardBlockProps {
  isAnyPlayerWaiting: boolean,
  gameStatus: string;
  seconds: number;
}
export default function CenterCardBlock({ isAnyPlayerWaiting, gameStatus, seconds }: CenterCardBlockProps) {

  const [animate, setAnimate] = useState(false);

  const FlowerCardBlock = [];
  for (let i = 0; i < 12; i++) {
    FlowerCardBlock.push(
      <Image key={`flower-${i}`} src={FlowerCard1} alt="Logo Image" priority className="w-[auto] sm:w-[auto] h-[38px]" />
    );
  }

  const BacksideOfSoftwareHorizontalCardBlock = [];
  for (let i = 0; i < 8; i++) {
    BacksideOfSoftwareHorizontalCardBlock.push(
      <Image key={`horizontal-${i}`} src={BacksideOfSoftwareCardHorizontal} alt="Logo Image" priority className="w-[auto] sm:w-[auto] h-[28px]" />
    );
  }


  const BacksideOfSoftwareCardVerticalCardBlock = [];
  const BacksideOfSoftwareCardVerticalCardBlockBottom = [];
  for (let i = 0; i < 12; i++) {
    BacksideOfSoftwareCardVerticalCardBlock.push(
      <Image key={`vertical-${i}`} src={BacksideOfSoftwareCardVertical} alt="Logo Image" priority className="w-[28px] sm:w-[28px] h-[auto]" />
    );
  }

  for (let i = 0; i < 12; i++) {
    BacksideOfSoftwareCardVerticalCardBlockBottom.push(
      <Image key={`vertical-${i}`} src={BacksideOfSoftwareCardVertical} alt="Logo Image" priority className="w-[28px] sm:w-[28px] h-[auto] rotate-180" />
    );
  }

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  }, [seconds])

  return (
    <div className="">
      <div className="flex justify-between">
        {!isAnyPlayerWaiting && (
          <div className="grid grid-cols-2 gap-[1px]">
            {FlowerCardBlock}
          </div>
        )}

        <div className="  text-white flex  justify-between items-center gap-[6px]">
          <div className='left-block flex flex-col gap-[1px]'>
            {BacksideOfSoftwareHorizontalCardBlock}
          </div>
          <div className='center-block flex justify-between flex-col  h-[100%] items-center'>
            <div className='top-block flex gap-[2px]'>
              {BacksideOfSoftwareCardVerticalCardBlock}
            </div>
            <div className='center-block w-[100%] h-[100%] flex flex-col bg-campas-bg-image bg-auto bg-center bg-no-repeat '>
              {
              isAnyPlayerWaiting ? (gameStatus === 'ready_to_start' ? <p className={`${animate ? 'animate-fade-out' : ''} text-4xl font-bold h-full flex justify-center items-center`}>{seconds}</p> : <p className='m-auto'> Waiting for players...</p>) : (
                <>
                  <div className='border-[#FFA62D] w-fit m-auto border-[0.3px] rounded-9 shadow-inner shadow-[#FFA62D]' style={{ boxShadow: 'inset 0 0 10px #f8a100' }}>
                    <Image src={MainUserCard} alt="Logo Image" priority className="w-[50px]   sm:w-[50px] h-auto m-3" />
                  </div>
                  <span>Time left - 45</span>
                </>
              )
            }
            </div>
            <div className='bottom-block top-block flex gap-[2px]'>
              {BacksideOfSoftwareCardVerticalCardBlockBottom}
            </div>
          </div>
          <div className='right-block flex flex-col gap-[1px]'>
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