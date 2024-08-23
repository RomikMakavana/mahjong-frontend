import MahjongModel from "../MahjongModel";
import { ICONS } from "@/helpers/icons";
import Image from "next/image";
import PrimaryButton from "../PrimaryButton";

interface userDetails {
    userName: string;
    // pointsPerTile: number;
    result: number;
    playAgain?: boolean;
}
interface users {
    wonUserName: string;
    level: number;
    result: number;
    minLevel: number;
    pointsPerTile: number;
    playAgain?: boolean;
    userDetails: userDetails[]

}
export default function GameOver() {

    const users: users[] = [
        {
            wonUserName: "dakshjoshi66758",
            result: 50,
            level: 5,
            playAgain: true,
            minLevel: 8,
            pointsPerTile: 2,
            userDetails: [
                {
                    userName: "dakshjoshi66758",
                    result: -50
                },
                {
                    userName: "dakshjoshi66758",
                    result: -50,
                    playAgain: true
                },
                {
                    userName: "dakshjoshi66758",
                    result: -50,
                    playAgain: true
                }
            ]
        }
    ]
    return (
        <MahjongModel open={true} extraCss="xs:w-[363px]">
            <div className="flex flex-col h-full">
                <div className="h-full">
                    <Image src={ICONS.MahjongTextIcon} alt="Image" className="mx-auto mb-4" />
                </div>
                {
                    users.map((user, index) => {
                        return (
                            <div key={index} className="flex-grow h-[calc(100%_-_6.2rem)] flex flex-col">
                                <div className="border-b border-white border-opacity-10">
                                    <div className="border border-brand-blue rounded-9 p-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="relative w-fit">
                                                    <Image src={ICONS.ImgAvatar} alt="Avatar Image"
                                                        className="rounded-full w-[55px] max-xs:w-[34px] border-teal-blue border" />
                                                    {!user.playAgain ?
                                                        <div className="absolute top-0 flex border-[#60F8F8] border rounded-full w-full h-full right-0">
                                                            <div className="border-4 max-xs:border mx-auto border-black w-full h-full items-center flex rounded-full bg-dark-green bg-opacity-60">
                                                                <Image src={ICONS.GreenRight} alt="Image" className="w-[30px] mx-auto max-xs:w-[16px]" />
                                                            </div>
                                                        </div> :
                                                        <div className="absolute top-0 flex border-[#60F8F8] border rounded-full w-full h-full right-0">
                                                            <div className="border-4 max-xs:border mx-auto border-black w-full h-full items-center flex rounded-full bg-dark-red bg-opacity-60">
                                                                <Image src={ICONS.RedClose} alt="Image" className="w-[30px] mx-auto max-xs:w-[16px]" />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="ml-[14px]">
                                                    <p className="text-white font-medium text-sm max-xs:text-xs">{user.wonUserName}</p>
                                                    <p className="underline cursor-pointer text-xs max-xs:text-[10px] text-pale-lavender">View winning tiles</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sunset-orange font-bold text-base max-xs:text-sm">Won ${user.result}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="max-xs:text-xs text-white text-center my-5 max-xs:my-4 font-medium text-sm">
                                        Lvl {user.level} | Min Level {user.minLevel} | Pt per tile {user.pointsPerTile}
                                    </p>
                                </div>
                                <div className="flex-grow h-[calc(100%_-_8.8rem)] flex flex-col">
                                    <div className="  flex-grow overflow-auto min-h-10 scrolls pr-2 my-7">
                                        {
                                            user.userDetails.map((details, index) => {
                                                return (
                                                    <div key={index} className="flex justify-between items-center mb-5 last:mb-0">
                                                        <div className="flex items-center">
                                                            <div className="relative">
                                                                <Image src={ICONS.ImgAvatar} alt="Avatar Image"
                                                                    className="rounded-full w-[55px] max-xs:w-[34px] border-teal-blue border" />
                                                                {details.playAgain ?
                                                                    <div className="absolute top-0 flex border-[#60F8F8] border rounded-full w-full h-full right-0">
                                                                        <div className="border-4 max-xs:border mx-auto border-black w-full h-full items-center flex rounded-full bg-dark-green bg-opacity-60">
                                                                            <Image src={ICONS.GreenRight} alt="Image" className="w-[30px] mx-auto max-xs:w-[16px]" />
                                                                        </div>
                                                                    </div> :
                                                                    <div className="absolute top-0 flex border-[#60F8F8] border rounded-full w-full h-full right-0">
                                                                        <div className="border-4 max-xs:border mx-auto border-black w-full h-full items-center flex rounded-full bg-dark-red bg-opacity-60">
                                                                            <Image src={ICONS.RedClose} alt="Image" className="w-[30px] mx-auto max-xs:w-[16px]" />
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="ml-[14px]">
                                                                <p className="text-white font-medium text-sm max-xs:text-xs">{user.wonUserName}</p>
                                                                <p className="underline cursor-pointer text-xs max-xs:text-[10px] text-pale-lavender">View tiles</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className={`font-bold text-base max-xs:text-sm ${details.result < 0 ? "text-brand-red" : "text-sunset-orange"}`}>{details.result < 0 ? "Lost" : "Won"} ${Math.abs(user.result)}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div>
                                        <PrimaryButton label="Play again" extraCss="max-xs:text-sm" />
                                        <button className="w-full flex items-center justify-center rounded-lg py-[14px] max-xs:py-3 mt-[10px] border font-medium border-neutral-800 ">
                                            <Image src={ICONS.RightArrow} alt="Avatar Image" className="rounded-full w-4 mr-[10px]" />
                                            <p className="text-white text-opacity-60 max-xs:text-sm">Back home</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </MahjongModel>
    )
}