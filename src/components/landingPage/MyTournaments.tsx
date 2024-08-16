"use client"

import { useState } from "react";
import Image from "next/image";
import IconMahJong from "@/assets/images/svg/mahjong.svg";

export const MyTournaments = () => {

    const [tournaments, setTournaments] = useState<{tournamentName:string, time: string}[]>([
        {
            tournamentName: 'tournament 01',
            time: '0.:34 AM | 25th Apr 2024'
        },
        {
            tournamentName: 'tournament 01',
            time: '0.:34 AM | 25th Apr 2024'
        },
        {
            tournamentName: 'tournament 01',
            time: '0.:34 AM | 25th Apr 2024'
        },
    ])

    return (
        <div className="border p-5 bg-[#0D0D0D]  border-[#1b1b1b] sm:rounded-lg  overflow-y-hidden">
            <span className="text-light-blue font-bold text-base">4 Matches</span>
            <div className="mt-6  h-[161px] overflow-y-auto scrolls">
            {
                tournaments.map((data, index) => {
                    return (
                        <div key={index} className="mb-[22px] flex items-center ">
                                        <div className="w-11 h-11 flex justify-center items-center border border-brand-white-7 rounded-lg mr-4">
                                            <Image src={IconMahJong} alt="Tournament Icon" />
                                        </div>
                                        <div className="w-full">
                                            <p className=" text-[#ffffff80] text-sm mb-1">{data.tournamentName}</p>
                                            <p className="text-white font-bold text-base">{data.time}</p>
                                        </div>

                                    </div>
                    )
                })
            }

            </div>
        </div>
    )
}