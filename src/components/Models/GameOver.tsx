import MahjongModel from "../MahjongModel";
import { ICONS } from "@/helpers/icons";
import Image from "next/image";
import PrimaryButton from "../PrimaryButton";

interface userDetails {
    userName: string;
    // pointsPerTile: number;
    result: number;
}
interface users {
    wonUserName: string;
    level: number;
    result: number;
    minLevel: number;
    pointsPerTile: number;
    userDetails: userDetails[]

}
export default function GameOver() {

    const users: users[] = [
        {
            wonUserName: "dakshjoshi66758",
            result: 50,
            level: 5,
            minLevel: 8,
            pointsPerTile: 2,
            userDetails: [
                {
                    userName: "dakshjoshi66758",
                    result: -50
                },
            ]
        }
    ]
    return (
        <MahjongModel open={true} extraCss="xs:w-[363px] max-h-[90%] overflow-hidden">
            <div className="flex flex-col h-full">
                <Image src={ICONS.MahjongTextIcon} alt="Image" className="mx-auto mb-4" />
                {
                    users.map((user, index) => {
                        return (
                            <div key={index} className="flex flex-col">
                                <div>
                                    <div className="border-b border-white border-opacity-10">
                                        <div className="border border-brand-blue rounded-9 p-3">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <Image src={ICONS.ImgAvatar} alt="Avatar Image"
                                                        className="rounded-full w-[55px] border-teal-blue border" />
                                                    <div className="ml-[14px]">
                                                        <p className="text-white font-medium text-sm">{user.wonUserName}</p>
                                                        <p className="underline cursor-pointer text-xs text-pale-lavender">View winning tiles</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sunset-orange font-bold text-base">Won ${user.result}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="max-xs:text-xs text-white text-center my-5 font-medium text-sm">
                                            Lvl {user.level} | Min Level {user.minLevel} | Pt per tile {user.pointsPerTile}
                                        </p>
                                    </div>
                                    <div className="mt-4 border">
                                        <div className="flex-grow overflow-auto h-full">
                                            {
                                                user.userDetails.map((details, index) => {
                                                    return (
                                                        <div key={index} className="flex justify-between items-center mb-5 last:mb-0">
                                                            <div className="flex items-center">
                                                                <Image src={ICONS.ImgAvatar} alt="Avatar Image"
                                                                    className="rounded-full w-[55px] border-teal-blue border" />
                                                                <div className="ml-[14px]">
                                                                    <p className="text-white font-medium text-sm">{user.wonUserName}</p>
                                                                    <p className="underline cursor-pointer text-xs text-pale-lavender">View tiles</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className={`font-bold text-base ${details.result < 0 ? "text-brand-red" : "text-sunset-orange"}`}>{details.result < 0 ? "Lost" : "Won"} ${Math.abs(user.result)}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="">
                                            <PrimaryButton label="Play again" />
                                        </div>
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