"use client"
import Image from "next/image";
import PointsBadge1 from "@/assets/images/badgeIcons/1.png";
import IconTrophy from "@/assets/images/svg/trophy.svg";
import { useMemo, useState } from "react";
import MahjongModel from "../MahjongModel";
import coin from "@/assets/images/svg/coin.svg";
import check from "@/assets/images/svg/check.svg";

interface ClaimDailyFreePoint {
    day: number;
    points: number;
    isClaimed: boolean;
    onClick?: () => void;
}

export const ClaimFreePoints = () => {
    const [totalMatches, setTotalMatches] = useState(400);
    const [completedMatches, setCompletedMatches] = useState(252);
    const [openFreePointsModal, setOpenFreePointsModal] = useState(false);

    const [dailyPoint, setDailyPoint] = useState<ClaimDailyFreePoint[]>([
        {
            day: 1,
            points: 100,
            isClaimed: true
        },
        {
            day: 2,
            points: 100,
            isClaimed: true
        },
        {
            day: 3,
            points: 100,
            isClaimed: false
        },
        {
            day: 4,
            points: 100,
            isClaimed: false
        },
        {
            day: 5,
            points: 100,
            isClaimed: false
        }
    ]);

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
                        <button onClick={() => setOpenFreePointsModal(true)} className="underline max-sm:mt-[6px]">Claim Free Points</button>
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
            {
                openFreePointsModal &&
                <MahjongModel width="562px" closeModel={() => setOpenFreePointsModal(false)} showCloseBtn={true}>
                    <div className="flex flex-col h-full">
                        <h2 className="text-xl mb-5">Claim Daily Free Points</h2>
                        <div className="h-full flex-grow overflow-auto">
                            {dailyPoint.map((item, index) => (
                                <div key={index} className={`border last:mb-0 mb-[10px] border-neutral-800 flex justify-between py-4 rounded-lg ${item.isClaimed ? 'opacity-50' : ''}`}>
                                    <p className="border-r text-base px-4 h-fit border-neutral-700">Day {item.day}</p>
                                    <span className=" flex-1 flex justify-between px-4">
                                        <span className="flex">
                                            <Image src={coin} alt="Coin" className="w-[19px]" />
                                            <p className="ml-2 text-base">{item.points} pts</p>
                                        </span>
                                        <span>
                                            {item.isClaimed ?
                                                <button>
                                                    <span className="flex items-center">
                                                        <Image src={check} alt="Check-icon" className="w-[16px]" />
                                                        <p className="ml-2 text-base font-bold">Claimed</p>
                                                    </span>
                                                </button>
                                                : <button className="text-brand-yellow2 text-base font-[500] underline">Claim Now</button>
                                            }
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </MahjongModel>
            }
        </div>
    )
}