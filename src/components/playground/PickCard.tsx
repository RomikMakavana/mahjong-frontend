import FlowerCard1 from '@/assets/images/svg/cards/flower_card_1.svg';
import Image from 'next/image';
interface PickCardProps {
    isAnyPlayerWaiting: boolean;
    flowerCardList?: number;
}
export default function PickCard({ isAnyPlayerWaiting, flowerCardList }: PickCardProps) {

    return (
        <div className="flex flex-col items-end">
            {!isAnyPlayerWaiting && (
                <>
                    <p className="bg-[#FFF4E3] text-[#643B00] text-[8px] md:text-xs font-extrabold px-[3px] md:pl-1 md:pr-1 rounded-full z-10 ">{flowerCardList}</p>
                    <Image src={FlowerCard1} alt="Logo Image" priority className="w-[15px] md:w-[27px] h-auto mt-[-5px] mr-[5px] md:mt-[-8px] md:mr-[5px] " />
                </>
            )}
        </div>
    )
}