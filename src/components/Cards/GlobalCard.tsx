import FlowerCard1 from '@/assets/images/svg/cards/flower_card_1.svg';
import Image from 'next/image';

export default function GlobalCard() {

    return (
        <Image src={FlowerCard1} alt="Logo Image" priority className="w-[27px] sm:w-[27px] h-auto mt-[-8px] mr-[5px] " />
    )
}