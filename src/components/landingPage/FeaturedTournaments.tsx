"use client"

import Image, { StaticImageData } from "next/image"
import TournamentImage1 from "../../../public/images/tournaments_bg_1.avif";
import TournamentImage2 from "../../../public/images/tournaments_bg_2.avif";
import IconEye from "@/assets/images/svg/eye.svg";
import IconStream from "@/assets/images/svg/stream.svg";
import { useState } from "react";

export const FeaturedTournaments = () => {
    const [tournaments, setTournaments] = useState<{ name: string, image: StaticImageData, level:number, points: number, watching: string }[]>([
        {
            name: 'Tournament 01',
            image: TournamentImage1,
            points: 50,
            level:5,
            watching: '259k'
        },
        {
            name: 'Tournament 01',
            image: TournamentImage2,
            points: 50,
            level:5,
            watching: '259k'
        },
        {
            name: 'Tournament 01',
            image: TournamentImage1,
            points: 50,
            level:5,
            watching: '259k'
        },
        {
            name: 'Tournament 01',
            image: TournamentImage2,
            points: 50,
            level:5,
            watching: '259k'
        },
        {
            name: 'Tournament 01',
            image: TournamentImage1,
            points: 50,
            level:5,
            watching: '259k'
        },
        {
            name: 'Tournament 01',
            image: TournamentImage2,
            points: 50,
            level:5,
            watching: '259k'
        },
        {
            name: 'Tournament 01',
            image: TournamentImage1,
            points: 50,
            level:5,
            watching: '259k'
        },
        {
            name: 'Tournament 01',
            image: TournamentImage2,
            points: 50,
            level:5,
            watching: '259k'
        },

    ])
    return (
        <div className="section-wrapper mb-16">
            <h6 className="text-lg font-bold mb-4">Featured tournaments</h6>
            <div className="grid grid-cols-12">
                {
                    tournaments.map((tournament, index) => {
                        return (

                            <div key={index} className="border border-brand-white-7 rounded-lg p-2 pb-4 m-1 mb-3.5 col-span-12 xxs:col-span-6 xs:col-span-4 sm:col-span-3">
                                <div className="relative">

                                    <Image src={tournament.image} alt="Background Image" />
                                    <div className="absolute top-2 right-2 bg-[#e21f1f] py-[3px] px-[5px] md:px-[7px] flex items-center rounded">
                                        <Image src={IconStream} alt="Icon Live" className="mr-1" />
                                        <span className="uppercase text-white text-[8px] md:text-[10px] font-bold">Live</span>
                                    </div>

                                    <div className="absolute bottom-2 left-2 text-black bg-white w-7 h-7 md:w-10 md:h-10 p-[2px] md:p-1 rounded-md text-center">
                                        <p className="m-0 text-[8px] md:text-xs font-normal">LVL</p>
                                        <p className="m-0 text-xs md:text-sm font-black">{tournament.level}</p>
                                    </div>
                                </div>
                                <div className="pt-[10px] md:pt-4 pl-2">
                                    <h6 title={tournament.name} className="text-white text-sm md:text-lg font-bold mb-2 md:mb-3 truncate">{tournament.name}</h6>
                                    <p className="m-0 text-white font-normal text-[10px] md:text-sm">Points per level: <span className="text-[#00feff] font-extrabold">{tournament.points}</span></p>
                                    <span className="flex items-center text-[10px] md:text-xs font-normal text-[#848484] mt-4 md:mt-7">
                                        <Image src={IconEye} alt="Icon Eye" className="mr-1 max-md:w-3 max-md:h-3" />
                                        {tournament.watching} watching
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}