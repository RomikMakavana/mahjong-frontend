import Image from 'next/image';
import CARDS from '@/helpers/cardsList';

export default function GlobalCard(props:{cardId:string}) {

    return (
        <Image src={CARDS[props.cardId]} alt="Card" priority className="w-[35px] sm:w-[50px] h-auto" />
    )
}