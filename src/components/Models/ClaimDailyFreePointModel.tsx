"use client"

import { useState } from "react";
import MahjongModel from "../MahjongModel";
import Image from "next/image";
import coin from "@/assets/images/svg/coin.svg";
import check from "@/assets/images/svg/check.svg";

interface ClaimDailyFreePoint {
    day: number;
    points: number;
    isClaimed: boolean;
    onClick?: () => void;
}

export default function ClaimDailyFreePointModel() {

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

    return (
        <div>
            <MahjongModel extraCss="xs:w-[562px]">
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
        </div>
    );
}
