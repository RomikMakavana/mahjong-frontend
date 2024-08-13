"use client"

import { useState } from "react";
import { TournamentStat } from "@/interfaces";
import IconMahjong from "@/assets/images/svg/mahjong.svg";
import IconMultipleUsers from "@/assets/images/svg/multiple_users.svg";
import IconCalender from "@/assets/images/svg/calendar.svg";
import Image from "next/image";

export const TournamentAndLeaderBoard = () => {

    const [tournamentStats, setTournamentStats] = useState<TournamentStat[]>([
        {
            icon: IconCalender,
            label: 'Tournaments Timeline',
            value: '24th - 30th October 2024'
        },
        {
            icon: IconMahjong,
            label: 'Total Matches',
            value: '340'
        },
        {
            icon: IconMahjong,
            label: 'Remaining Matches',
            value: '245'
        },
        {
            icon: IconMultipleUsers,
            label: 'Total players participating',
            value: '2439'
        }
    ]);

    return (
        <div className="section-wrapper py-5">
            <h6 className="text-lg font-bold">Tournament stats</h6>
            <div className=" bg-tournament-bg bg-no-repeat rounded-9 bg-cover pt-[22px] mt-[10px] px-5 ">
                <div className="flex overflow-y-auto scrolls">
                    {
                        tournamentStats.map((stat, index) => {
                            return (
                                <div key={index} className="border-r mb-[22px] flex items-center text-nowrap  border-brand-spanish-gray-8  w-full last:border-0 mx-4 first:ml-0 last:mr-0">
                                    <div className="w-11 h-11 flex justify-center items-center border border-brand-white-7 rounded-lg mr-4">
                                        <Image src={stat.icon} alt="Tournament Icon" />
                                    </div>
                                    <div className="mr-9">
                                        <p className=" text-[#fffc] text-sm font-normal">{stat.label}</p>
                                        <p className="text-white font-bold text-lg">{stat.value}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}