"use client"

import React, { useState } from "react";
import { TournamentStat } from "@/interfaces";
import IconMahjong from "@/assets/images/svg/mahjong.svg";
import IconMultipleUsers from "@/assets/images/svg/multiple_users.svg";
import IconCalender from "@/assets/images/svg/calendar.svg";
import Image from "next/image";
import { DotButton, useButton } from '@/components/CarouselButton';
import useEmblaCarousel from 'embla-carousel-react';
import { LeaderBoard } from "./LeaderBoard";
import { MyTournaments } from "./MyTournaments";

interface TournamentAndLeaderBoardProps {
    openLoginModal: () => void;
    isLoggedIn: boolean;
}

export const TournamentAndLeaderBoard = (props: TournamentAndLeaderBoardProps) => {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const { selectedIndex, scrollSnaps, onButtonClick } = useButton(emblaApi);

    const [activeTab, setActiveTab] = useState<'leaderboard' | 'myMatches'>('leaderboard');

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
        <React.Fragment>
            <div className="section-wrapper py-5">
                <h6 className="text-lg font-bold">Tournament stats</h6>
                <div className="hidden xs:block bg-tournament-bg bg-no-repeat rounded-9 bg-cover pt-[22px] mt-[10px] px-5 ">
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
                </div>

                <section className="m-auto xs:hidden mt-[18px]">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex touch-pan-y touch-pinch-zoom -ml-4">
                            {tournamentStats.map((stat, index) => (
                                <div className="transform translate-x-0 translate-y-0 translate-z-0 flex-none flex-grow-[0] flex-shrink-[0] basis-[70%] min-w-0 pl-4" key={index}>
                                    <div className="bg-gradient-to-r from-[#474747] to-[#000000] rounded-[9px] p-[1px] h-full">
                                        <div className="min-w-[190px] xs:min-w-[265px] h-full bg-[#001924] rounded-[9px] p-5 text-[4rem] font-semibold flex items-center justify-center select-none">
                                            <div key={index} className="border-r  flex items-center   border-brand-spanish-gray-8  w-full last:border-0 mx-4 first:ml-0 last:mr-0">
                                                <div className="min-w-11 min-h-11 flex justify-center items-center border border-brand-white-7 rounded-lg mr-2">
                                                    <Image src={stat.icon} alt="Tournament Icon" />
                                                </div>
                                                <div className="">
                                                    <p className=" text-[#fffc] text-sm font-normal">{stat.label}</p>
                                                    <p className="text-white font-bold text-sm">{stat.value}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-[1.2rem] mt-[1.8rem] w-full">
                        <div className="flex flex-wrap justify-end items-center -mr-[0.6rem]">
                            {scrollSnaps.map((_, index) => (
                                <DotButton
                                    key={index}
                                    onClick={() => onButtonClick(index)}
                                    className={'embla__dot'.concat(
                                        index === selectedIndex ? ' embla__dot--selected' : ''
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <div className="mt-5 ">
                    <div className="hidden  sm:flex flex-col md:flex-row ">
                        <div className="w-full md:w-[60%] md:mr-[10px]">
                            <h6 className="text-lg font-bold mb-[15px]">Leaderboard</h6>
                            <LeaderBoard />
                        </div>
                        <div className="w-full mt-[30px] md:mt-0 md:w-[40%]">
                            <h6 className="text-lg font-bold mb-[15px]">My tournaments</h6>
                            <MyTournaments openLoginModal={props.openLoginModal} isLoggedIn={props.isLoggedIn}/>
                        </div>
                    </div>
                    <div className="sm:hidden">
                        <div className="flex ">
                            <button onClick={() => setActiveTab('leaderboard')} className={`tab-btn mr-9 ${activeTab === 'leaderboard' ? 'active' : ''}`}>Leaderboard</button>
                            <button onClick={() => setActiveTab('myMatches')} className={`tab-btn ${activeTab === 'myMatches' ? 'active' : ''}`}>My Matches</button>
                        </div>
                        <div className="mt-6">
                            {
                                activeTab === 'leaderboard' &&
                                <div className="animate-[fadein_1s_forwards]">
                                    <LeaderBoard />
                                </div>
                            }

                            {
                                activeTab === 'myMatches' &&
                                <div className="animate-[fadein_1s_forwards]">
                                    <MyTournaments openLoginModal={props.openLoginModal} isLoggedIn={props.isLoggedIn}/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}