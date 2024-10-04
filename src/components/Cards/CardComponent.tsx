import Image from 'next/image';
import CARDS from '@/helpers/cardsList';
import Loader from '../Loader';
import { useEffect } from 'react';

interface Props {
    cardId: string;
    myTurn: boolean;
    canDrop: boolean;
    isGameStarted: boolean;
    isPong: boolean | null;
    action?: () => void;
    isProcessing?: boolean;
}

export default function GlobalCard(props: Props) {
    const { cardId, myTurn, canDrop, isGameStarted, isPong, action, isProcessing } = props;

    const dropCard = () => {
        if(myTurn && canDrop && !isProcessing){
            action && action();
        }
    }

    useEffect(() => {
        console.log('isProcessing- card', isProcessing);
        
    },[isProcessing])

    return (
        <div onClick={dropCard} className={`tile-wrapper relative transition-transform duration-300 h-full ease-in-out
        ${(myTurn && canDrop && !isProcessing) ? 'cursor-pointer hover:transform hover:-translate-y-3' : ''}
        ${!canDrop && isGameStarted || isProcessing === true ? ' cursor-not-allowed' : ''}
        `}>

            <Image src={CARDS[cardId]} alt="Card" priority className={`w-[35px] sm:w-[50px] h-full
                ${isPong === true ? 'mix-blend-hard-light' : ''}
                ${isPong === false ? 'mix-blend-difference' : ''}
                `} />
            {
                isProcessing && isProcessing === true &&
                <Loader customClass='!w-4 !h-4' withoutBackground={true} />
            }
        </div>
    )
}