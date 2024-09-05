import FlowerCard1 from '@/assets/images/svg/cards/flower_card_1.svg';
import Image from 'next/image';
interface PickCardProps {
    isAnyPlayerWaiting: boolean;
}
export default function PickCard({ isAnyPlayerWaiting }: PickCardProps) {

    return (
        <div className="flex flex-col items-end">
            {!isAnyPlayerWaiting && (
                <>
                    <p className="bg-[#FFF4E3] text-[#643B00] text-xs font-extrabold pl-1 pr-1 rounded-full z-10 ">5</p>
                    <Image src={FlowerCard1} alt="Logo Image" priority className="w-[27px] sm:w-[27px] h-auto mt-[-8px] mr-[5px] " />
                </>
            )}
        </div>
    )
}