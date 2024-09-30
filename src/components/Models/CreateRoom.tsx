'use client';

import InputField from "../InputField";
import MahjongModel from "../MahjongModel";
import { ICONS } from "@/helpers/icons";
import Image from "next/image";
import PrimaryButton from "../PrimaryButton";
import APIService from "@/services/firebase/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotifications } from "@/utils";

interface Props {
    open: boolean;
    closeModal: (value: boolean) => void;
}



export default function CreateRoom(props: Props) {

    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isRoomPrivate, setIsRoomPrivate] = useState(false);
    const [timeLimit, setTimeLimit] = useState(10);
    const [lavelToWin, setLavelToWin] = useState(10);
    const { notification } = useNotifications();

    const generateRandomNumber = () => {
        return Math.floor(10000 + Math.random() * 90000);
    }

    const createRoom = async () => {
        setIsProcessing(true);
        try {
            const randomNumber = generateRandomNumber()
            const res = await APIService.startGame(randomNumber, isRoomPrivate);

            if (res.status === 200 && res.data.success) {
                setIsProcessing(false)
                router.push(`/playground/${res.data.data.game_id}`)
            } else {
                setIsProcessing(false);
                notification('Something went wrong.', 'error');

            }
        } catch (error) {
            setIsProcessing(false);
            notification('Something went wrong.', 'error');
            console.log(error);
        }
    }

    const timeLimitHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeLimit(Number(event.target.value));
    };

    // lavelToWin
    const lavelToWinHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLavelToWin(Number(event.target.value));
    }

    return (
        <MahjongModel open={props.open} extraCss="xs:w-[366px]" closeModel={() => props.closeModal(false)}>
            <div>
                <div className="xxs:flex max-xxs:mb-2 justify-between items-center">
                    <h2 className="text-white font-bold text-xl max-xs:text-lg">Create a room</h2>
                    <div className="flex items-center">
                        <p className="mr-2 text-white text-xs text-opacity-50 font-semibold">Private room</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input checked={isRoomPrivate} onClick={(e) => timeLimitHandle(e)} type="checkbox" className="sr-only peer" />
                            <div className="w-7 h-[14px] bg-white rounded-full peer peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[1px] after:left-[0.2px] after:bg-[#6E6E6E] after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-blue peer-checked:after:bg-white peer-checked:after:left-[2.8px] "></div>
                        </label>
                    </div>
                </div>
                <div className="mt-5">
                    <InputField type="text" placeholder="Enter room name" extraCss="font-medium max-xs:text-xs placeholder:text-white placeholder:text-opacity-50" />
                    <div className="w-full xxs:flex justify-between mt-[10px]">
                        <div className="mr-2 border w-full border-neutral-800 rounded-[10px] flex xxs:justify-center max-xxs:mb-[10px] max-xxs:justify-between max-xxs:px-2 py-[14px]">
                            <select id="options" name="options" onChange={timeLimitHandle}  className="w-full  text-white text-opacity-50 bg-transparent text-sm font-medium focus:outline-none max-xs:text-xs">
                                <option value="0" className="bg-brand-dark text-white text-center">Time limit per turn</option>
                                <option value="10" className="bg-brand-dark text-white text-center">10s</option>
                                <option value="30" className="bg-brand-dark text-white text-center">30s</option>
                                <option value="60" className="bg-brand-dark text-white text-center">60s</option>
                                <option value="90" className="bg-brand-dark text-white text-center">90s</option>
                                <option value="120" className="bg-brand-dark text-white text-center">120s</option>
                            </select>
                            {/* <Image src={ICONS.IconDropdown} alt="Dropdown Image" className=" ml-3" /> */}
                        </div>
                        <div className="border w-full border-neutral-800 rounded-[10px] flex xxs:justify-center max-xxs:justify-between max-xxs:px-2 py-[14px] ">
                            <select id="options" name="options" onChange={lavelToWinHandle} className="w-full text-white text-opacity-50 bg-transparent text-sm font-medium focus:outline-none max-xs:text-xs">
                                <option value="option1" className="bg-brand-dark text-white text-center">Min level to win</option>
                                <option value="option1" className="bg-brand-dark text-white text-center">10</option>
                                <option value="option1" className="bg-brand-dark text-white text-center">15</option>
                                <option value="option1" className="bg-brand-dark text-white text-center">20</option>
                                <option value="option1" className="bg-brand-dark text-white text-center">25</option>
                            </select>
                            {/* <Image src={ICONS.IconDropdown} alt="Dropdown Image" className=" ml-3" /> */}
                        </div>
                    </div>
                    <div className="relative w-full mt-[10px]">
                        <input
                            type="number"
                            className=" font-medium placeholder:text-white placeholder:max-xs:text-xs placeholder:text-opacity-50 text-sm py-[14px] px-5 border border-neutral-800 w-full rounded-[10px] ring-0 shadow-none focus:shadow-none focus:outline-none bg-transparent max-xs:py-[13.5px] text-white text-opacity-50 placeholder-white placeholder-opacity-50 pl-[40px]"
                            placeholder="Enter bet amount"
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <Image src={ICONS.IconCoin} alt="Coin Icon" className="w-5 max-xs:w-[18px]" />
                        </span>
                    </div>
                </div>
                <div className="mt-6">
                    <PrimaryButton onClick={() => createRoom()} isDisabled={isProcessing} label="Create room" extraCss="max-xs:text-sm" />
                    <button onClick={() => props.closeModal(false)} className="w-full text-white rounded-lg py-4 max-xs:text-sm max-xs:py-3 mt-[10px] border max-xs:font-medium font-bold max-xs:text-opacity-60 border-neutral-800 ">
                        Close
                    </button>
                </div>
            </div>
        </MahjongModel>
    )
}