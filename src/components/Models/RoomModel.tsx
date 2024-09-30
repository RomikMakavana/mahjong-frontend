"use client"

import MahjongModel from "../MahjongModel";
import { ICONS } from "@/helpers/icons";
import Image from "next/image";
import { useState } from "react";

interface Buttons {
    label: string,
    icon1?: string,
    icon2?: string,
    action?: () => void
}

interface Props {
    open: boolean;
    closeModal:(value:boolean) => void;
    setCreateRoom:(value:boolean) => void;
    joinRandomGame: () => void;
}

export default function RoomModel(props:Props) {

    const [selectedBtnIndex, setSelectedBtnIndex] = useState<number | undefined>();

    const buttons: Buttons[] = [
        {
            label: "Join random room",
            icon1: ICONS.Plus,
            icon2: ICONS.PlusLavender,
            action: props.joinRandomGame
        },
        {
            label: "Create a room",
            icon1: ICONS.Players,   
            icon2: ICONS.PlayersLavender,
            action: () => {props.setCreateRoom(true); props.closeModal(false)}   
        }
    ]

    return (
        <MahjongModel open={props.open} extraCss="xs:w-[363px]" extraCssForBg="md:bg-room-bg-desktop xxs:bg-room-bg-mobile sm:bg-room-bg-tab bg-cover">
            <div>
                <div className="w-full border-b border-white border-opacity-15 pb-[10px]">
                    <div className="border flex justify-center py-[14px] rounded-[14px] border-white border-opacity-15 font-bold max-xs:font-medium">
                        <select id="options" name="options" className="appearance-none bg-transparent focus:outline-none text-white max-xs:text-sm">
                            <option value="option1">Hong Kong Mahjong</option>
                        </select>
                        <Image src={ICONS.IconDropdown} alt="Dropdown Image" className=" ml-3" />
                    </div>
                </div>
                <div>
                    {
                        buttons.map((button, index) => {
                            return (
                                <div onClick={button.action} key={index} className="mt-[10px] cursor-pointer">
                                    <button onClick={() => {setSelectedBtnIndex(index); console.log("hello this doe")} } className={`text-white py-[14px] px-5 w-full items-center flex flex-1 ${selectedBtnIndex === index ? 'border border-brand-blue rounded-[10px] bg-brand-blue bg-opacity-15 text-pale-lavender text-opacity-80 animate-[fadein_1s_forwards]' : ''}`}>
                                        <Image src={selectedBtnIndex === index ? button.icon2 as string : button.icon1 as string } alt="Dropdown Image" className={`mr-[10px] w-[18px] max-xs:w-[14px] h-[18px] max-xs:h-[14px]`} />
                                        <label className="text-lg font-bold max-xs:text-sm cursor-pointer">{button.label}</label>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </MahjongModel>
    )
}