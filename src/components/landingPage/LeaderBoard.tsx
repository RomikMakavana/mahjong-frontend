"use client";

import Image from "next/image"
import AvatarImage from '@/assets/images/avatar.png';
import { useState } from "react";

export const LeaderBoard = () => {

    const [leaderBoard, setLeaderBoard] = useState<{ name: string, points: number, matchesPlayed: number, won: number, playersOnBoard: number }[]>([
        {
            name: 'dakshjoshi66758',
            points: 4596,
            matchesPlayed: 342,
            won: 245,
            playersOnBoard: 45
        },
        {
            name: 'dakshjoshi66758',
            points: 4596,
            matchesPlayed: 342,
            won: 245,
            playersOnBoard: 45
        },
        {
            name: 'dakshjoshi66758',
            points: 4596,
            matchesPlayed: 342,
            won: 245,
            playersOnBoard: 45
        },
        {
            name: 'dakshjoshi66758',
            points: 4596,
            matchesPlayed: 342,
            won: 245,
            playersOnBoard: 45
        },
       
        
    ])

    return (
        <div className="relative overflow-x-auto scrolls  border p-5 pt-0 bg-[#0D0D0D] border-[#1b1b1b] sm:rounded-lg h-[250px] overflow-y-auto scrolls">
            <table className="w-full text-sm text-left  text-gray-500  table-auto overflow-scroll">
                <thead className="text-xs text-[#ffffff80] font-medium sticky top-0  bg-[#0D0D0D]">
                    <tr>
                        <th scope="col" className="pr-3 pt-5 pb-3">
                            Name
                        </th>
                        <th scope="col" className="px-3  pt-5 pb-3">
                            Points
                        </th>
                        <th scope="col" className="px-3 pt-5  pb-3">
                            Matches Played
                        </th>
                        <th scope="col" className="px-3 pt-5 pb-3">
                            Matches Won
                        </th>
                        <th scope="col" className="px-3 pt-5  pb-3">
                            Players Onboarded
                        </th>

                    </tr>
                </thead>
                <tbody className="">
                    {
                        leaderBoard.length ? leaderBoard.map((data, index) => {
                            return (
                                <tr key={index} className="bg-[#0d0d0d] border-b last:border-b-0 border-[#1b1b1b] text-white">
                                    <th scope="row" className=" pr-3 py-3 font-medium text-white flex items-center">
                                        <Image src={AvatarImage} alt="Avatar image" className="w-5 h-5 mr-[10px]" />
                                        <span>{data.name}</span>
                                    </th>
                                    <td className="px-3 py-3">
                                        {data.points}
                                    </td>
                                    <td className="px-3 py-3">
                                        {data.matchesPlayed}
                                    </td>
                                    <td className="px-3 py-3">
                                        {data.won}
                                    </td>
                                    <td className="pl-3 py-3">
                                        {data.playersOnBoard}
                                    </td>

                                </tr>
                            )
                        }) :
                            <tr>
                                <td colSpan={5} className="text-white text-xs text-center px-3 py-3">No data available.</td>
                            </tr>
                    }


                </tbody>
            </table>
        </div>
    )
}
