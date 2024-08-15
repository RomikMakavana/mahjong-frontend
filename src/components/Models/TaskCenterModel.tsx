"use client"

import React, { useMemo, useState } from "react";
import MahjongModel from "../MahjongModel";
import Image from "next/image";
import info from "@/assets/images/svg/info.svg";
import check from "@/assets/images/svg/check.svg";
import coin from "@/assets/images/svg/coin.svg";
import firstBadge from "@/assets/images/badgeIcons/1.png";
import secondBadge from "@/assets/images/badgeIcons/2.png";
import thirdBadge from "@/assets/images/badgeIcons/3.png";
import fourthBadge from "@/assets/images/badgeIcons/4.png";
import fifthBadge from "@/assets/images/badgeIcons/5.png";
import sixthBadge from "@/assets/images/badgeIcons/6.png";
import trophy from "@/assets/images/svg/trophy.svg"

type TaskStatus = "inProgress" | "claimed";
type TaskMethod = "points" | "badge";
type TaskType = "matches" | "ads";

interface Task {
    id: number;
    title: string;
    progress: number;
    total: number;
    status: TaskStatus;
    points?: number;
    badge?: string;
    adsLink?: string;
    taskMethod: TaskMethod;
    TaskType: TaskType;
}

interface badges {

}

const matchPercentage = (completedMatches: number, totalMatches: number) => {
    return (completedMatches / totalMatches) * 100;
};

export default function TaskCenterModel() {

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: "Complete 4 Matches in a row",
            progress: 1,
            total: 4,
            status: "inProgress",
            points: 100,
            taskMethod: "points",
            TaskType: "matches"
        },
        {
            id: 2,
            title: "Complete 4 Matches in a row",
            progress: 1,
            total: 4,
            status: "claimed",
            points: 100,
            taskMethod: "points",
            TaskType: "matches"
        },
        {
            id: 3,
            title: "Watch 4 Ads",
            progress: 2,
            total: 4,
            status: "inProgress",
            taskMethod: "badge",
            TaskType: "ads",
            adsLink: "#"
        },
        {
            id: 3,
            title: "Watch 4 Ads",
            progress: 3,
            total: 4,
            status: "inProgress",
            taskMethod: "points",
            points: 200,
            TaskType: "ads",
            adsLink: "#"
        },
        {
            id: 4,
            title: "Complete 4 Matches in a row",
            progress: 0,
            total: 4,
            status: "inProgress",
            taskMethod: "badge",
            TaskType: "matches",
            adsLink: "#"
        },
        {
            id: 4,
            title: "Complete 4 Matches in a row",
            progress: 2,
            total: 4,
            status: "inProgress",
            taskMethod: "badge",
            TaskType: "matches",
            adsLink: "#"
        }
    ]);

    const [badges, setBadges] = useState([
        {
            name : "Legend",
            pointBooster : "1.2 daily point booster",
            icon : firstBadge
        },
        {
            name : "Legend",
            pointBooster : "1.2 daily point booster",
            icon : secondBadge
        },
        {
            name : "Legend",
            pointBooster : "1.2 daily point booster",
            icon : thirdBadge
        },
        {
            name : "Legend",
            pointBooster : "1.2 daily point booster",
            icon : fourthBadge
        },
        {
            name : "Legend",
            pointBooster : "1.2 daily point booster",
            icon : sixthBadge
        },
        {
            name : "Legend",
            pointBooster : "1.2 daily point booster",
            icon : fifthBadge
        }
    ]);

    return (
        <MahjongModel width="562px">
            <div className="flex flex-col h-full justify-between relative">
                <div className="flex justify-between mb-5">
                    <h2 className="text-xl font-[500]">Task Center</h2>
                    <span className="flex items-center group/badge-advantages">
                        <Image src={info} alt="Info" className="w-[14px]" />
                        <a href="#" className="ml-[10px] underline text-xs text-brand-yellow ">Badge Advantages</a>
                        <div className="absolute right-0 top-8 bg-brand-black-87 w-fit invisible transition-opacity opacity-0 group-hover/badge-advantages:opacity-100 group-hover/badge-advantages:visible border border-brand-purple rounded-9 py-5">
                            <h2>Badge Advantages</h2>
                            {
                                badges.map((badge, index) => (
                                    <div key={index}>
                                         <Image src={badge.icon} alt={badge.name} className="w-5" />
                                         <p>{badge.name}</p>
                                         <span>

                                         <Image src={trophy} alt="Trophy" className="w-5" />
                                            <p>{badge.pointBooster}</p>
                                         </span>
                                    </div>
                                ))
                            }
                        </div>
                    </span>
                </div>
                <div className="h-full flex-grow overflow-auto scrolls pr-2">
                    {tasks.map((task, index) => (
                        <div key={index}>
                            {task.status === 'inProgress' && <div>
                                <div className="border mt-[10px] border-neutral-800 rounded-lg p-4">
                                    <div className="flex justify-between">
                                        <div className="flex-1">
                                            <div>
                                                {
                                                    task.TaskType === "matches" &&
                                                    <h2 className="text-base font-bold mb-[14px]">
                                                        {task.title}
                                                    </h2>
                                                }
                                                {
                                                    task.TaskType === "ads" && <div className="flex items-center mb-[10px]">
                                                        <h2 className="text-base font-bold">
                                                            {task.title}
                                                        </h2>
                                                        <a href={task.adsLink} className="ml-[10px] underline text-xs text-light-blue">Watch Now</a>
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                {
                                                    task.TaskType === "matches" && <span>
                                                        <p className="text-xs font-thin">
                                                            {task.progress < 10 ? '0' + task.progress : task.progress}/{task.total < 10 ? '0' + task.total : task.total} Matches
                                                        </p>
                                                        <div className="relative h-[6px] sm:h-[7px] bg-brand-blue-grey w-[115px] sm:w-48 mt-2 sm:mt-[10px] border rounded-[1px] border-brand-white-36">
                                                            <div className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r border border-transparent rounded-l-[1px] from-brand-royal-purple to-brand-lavender-purple `} style={{ width: matchPercentage(task.progress, task.total) + '%' }}></div>
                                                        </div>
                                                    </span>
                                                }
                                                {
                                                    task.TaskType === "ads" && <span>
                                                        <p className="text-xs font-thin">
                                                            {task.progress < 10 ? '0' + task.progress : task.progress}/{task.total < 10 ? '0' + task.total : task.total} Watches
                                                        </p>
                                                        <div className="relative h-[6px] sm:h-[7px] bg-brand-blue-grey w-[115px] sm:w-48 mt-2 sm:mt-[10px] border rounded-[1px] border-brand-white-36">
                                                            <div className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r border border-transparent rounded-l-[1px] from-brand-royal-purple to-brand-lavender-purple `} style={{ width: matchPercentage(task.progress, task.total) + '%' }}></div>
                                                        </div>
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            {task.taskMethod === 'points' &&
                                                <span className="flex items-center h-full">
                                                    <Image src={coin} alt="Coin" className="w-5" />
                                                    <p className="ml-2 text-base font-bold">{task.points} pts</p>
                                                </span>
                                            }
                                            {task.taskMethod === 'badge' &&
                                                <span className="flex items-center h-full">
                                                    <Image src={firstBadge} alt="LegendBadge" className="w-[19.5px] h-[23.25px] " />
                                                    <p className="ml-2 text-base font-bold">{task.points} Legend Badge</p>
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {task.status === 'claimed' && <div className="border opacity-50 my-[10px] border-neutral-800 rounded-lg p-4 flex justify-between">
                                <div>
                                    <h2 className="text-base font-bold">{task.title}</h2>
                                </div>
                                <div>
                                    <button>
                                        <span className="flex items-center">
                                            <Image src={check} alt="Check-icon" className="w-[16px]" />
                                            <p className="ml-2 text-base font-bold">Claimed</p>
                                        </span>
                                    </button>
                                </div>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </MahjongModel>
    )
}