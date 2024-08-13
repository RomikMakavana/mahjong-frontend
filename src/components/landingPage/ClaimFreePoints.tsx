"use client"
import Image from "next/image";
import PointsBadge1 from "@/assets/images/badgeIcons/1.png";
import IconTrophy from "@/assets/images/svg/trophy.svg";
import { useMemo, useState } from "react";


export const ClaimFreePoints = () => {
    const [totalMatches, setTotalMatches] = useState(400);
    const [completedMatches, setCompletedMatches] = useState(252);

    const matchPercentage = useMemo(() => {
        return (completedMatches / totalMatches) * 100;
    }, [totalMatches, completedMatches])
    return (
        <div className="section-wrapper pb-2 sm:pb-[30px] md:pb-5 w-full">
            <div className="flex justify-between items-center py-3 sm:py-4 border-t border-b border-brand-spanish-gray">
                <div className="flex justify-center items-center">
                    <Image src={PointsBadge1} alt="Badge Image" className="max-sm:w-[34px] max-sm:h-[34px]" />
                    <div className="text-brand-yellow2 font-bold text-xs sm:text-lg ml-1 sm:ml-3">
                        <p>340 pts | LVL 5</p>
                        <button className="underline max-sm:mt-[6px]">Claim Free Points</button>
                    </div>
                </div>
                <div>
                    <div className="flex justify-end">
                        <Image src={IconTrophy} alt="Icon Trophy" className="mr-1 sm:mr-2" />
                        <p className="m-0 text-brand-yellow2 font-light text-[10px] sm:text-xs">1.2 daily point booster</p>
                    </div>
                    <p className="font-bold max-sm:mt-[6px] text-xs sm:text-base text-right">{completedMatches}/{totalMatches} Matches</p>
                    <div className="relative h-[6px] sm:h-[7px] bg-brand-blue-grey w-[115px] sm:w-48 mt-2 sm:mt-[10px] border rounded-[1px] border-brand-white-36">
                        <div className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r border border-transparent rounded-l-[1px] from-brand-royal-purple to-brand-lavender-purple `} style={{ width: matchPercentage + '%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}