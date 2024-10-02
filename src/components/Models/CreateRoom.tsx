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
import { Option } from "@/interfaces";

interface Props {
    open: boolean;
    closeModal: (value: boolean) => void;
}

export default function CreateRoom(props: Props) {

    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isRoomPrivate, setIsRoomPrivate] = useState(false);
    const [turnTimeout, setTurnTimeout] = useState<string>('');
    const [minLevelToWin, setMinLevelToWin] = useState<string>('');
    const [betAmount, setBetAmount] = useState<string>('1000');
    const { notification } = useNotifications();
    const [gameName, setGameName] = useState('');

    const generateRandomNumber = () => {
        return Math.floor(10000 + Math.random() * 90000);
    }

    const turnTimeoutOptions: Option[] = [
        { value: "", label: "Time limit per turn" },
        { value: "30", label: "30s" },
        { value: "60", label: "60s" },
        { value: "90", label: "90s" },
        { value: "120", label: "120s" },
    ];
    
    const minLevelToWinOptions: Option[] = [
        { value: "", label: "Min level to win" },
        { value: "10", label: "10" },
        { value: "15", label: "15" },
        { value: "20", label: "20" },
        { value: "25", label: "25" },
    ];

    const createRoom = async (e: any) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const randomNumber = generateRandomNumber();
            const data = {
                'random_number': randomNumber,
                'game_name' : gameName,
                'turn_timeout' : turnTimeout,
                'min_level_to_win' : minLevelToWin,
                'bet_amount' : betAmount,
                'is_game_private' : isRoomPrivate
            }
            const res = await APIService.createRoom(data);

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
        setTurnTimeout(event.target.value);
    };

    
    const levelToWinHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMinLevelToWin(event.target.value);
    }

    return (
        <MahjongModel open={props.open} extraCss="xs:w-[366px]" closeModel={() => props.closeModal(false)}>
            <div>
                <div className="xxs:flex max-xxs:mb-2 justify-between items-center">
                    <h2 className="text-white font-bold text-xl max-xs:text-lg">Create a room</h2>
                    {/* <div className="flex items-center">
                        <p className="mr-2 text-white text-xs text-opacity-50 font-semibold">Private room</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input checked={isRoomPrivate} onClick={(e) => timeLimitHandle(e)} type="checkbox" className="sr-only peer" />
                            <div className="w-7 h-[14px] bg-white rounded-full peer peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[1px] after:left-[0.2px] after:bg-[#6E6E6E] after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-blue peer-checked:after:bg-white peer-checked:after:left-[2.8px] "></div>
                        </label>
                    </div> */}
                </div>
                <form onSubmit={createRoom}>
                    <div className="mt-5">
                        <InputField type="text" minLength={1} maxLength={300} isRequired={true} onChange={(e) => setGameName(e.target.value)} placeholder="Enter room name" extraCss="font-medium max-xs:text-xs placeholder:text-white placeholder:text-opacity-50" />
                        <div className="w-full xxs:flex justify-between mt-[10px]">
                            <div className="mr-2 border w-full border-neutral-800 rounded-[10px] flex xxs:justify-center max-xxs:mb-[10px] max-xxs:justify-between max-xxs:px-2 py-[14px]">
                                <select id="options" required name="options" onChange={timeLimitHandle}  className="w-full  text-white text-opacity-50 bg-transparent text-sm font-medium focus:outline-none max-xs:text-xs">
                                {turnTimeoutOptions.map((option) => (
                                    <option key={option.value} value={option.value} className="bg-brand-dark text-white text-center">
                                        {option.label}
                                    </option>
                                ))}
                                </select>
                                {/* <Image src={ICONS.IconDropdown} alt="Dropdown Image" className=" ml-3" /> */}
                            </div>
                            <div className="border w-full border-neutral-800 rounded-[10px] flex xxs:justify-center max-xxs:justify-between max-xxs:px-2 py-[14px] ">
                                <select id="levelToWin" required name="levelToWin" onChange={levelToWinHandle} className="w-full text-white text-opacity-50 bg-transparent text-sm font-medium focus:outline-none max-xs:text-xs">
                                {minLevelToWinOptions.map((option) => (
                                    <option key={option.value} value={option.value} className="bg-brand-dark text-white text-center">
                                        {option.label}
                                    </option>
                                ))}
                                </select>
                                {/* <Image src={ICONS.IconDropdown} alt="Dropdown Image" className=" ml-3" /> */}
                            </div>
                        </div>
                        <div className="relative w-full mt-[10px]">
                            <input
                                type="number"
                                required
                                min={1}
                                max={10000000}
                                onChange={(e) => setBetAmount(e.target.value)}
                                className=" font-medium placeholder:text-white placeholder:max-xs:text-xs placeholder:text-opacity-50 text-sm py-[14px] px-5 border border-neutral-800 w-full rounded-[10px] ring-0 shadow-none focus:shadow-none focus:outline-none bg-transparent max-xs:py-[13.5px] text-white text-opacity-50 placeholder-white placeholder-opacity-50 pl-[40px]"
                                placeholder="Enter bet amount"
                            />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <Image src={ICONS.IconCoin} alt="Coin Icon" className="w-5 max-xs:w-[18px]" />
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        {/* <PrimaryButton onClick={() => createRoom()} isDisabled={isProcessing} label="Create room" extraCss="max-xs:text-sm" /> */}
                        <PrimaryButton label="Create room" extraCss="max-xs:text-sm"/>
                        <button onClick={() => props.closeModal(false)} className="w-full text-white rounded-lg py-4 max-xs:text-sm max-xs:py-3 mt-[10px] border max-xs:font-medium font-bold max-xs:text-opacity-60 border-neutral-800 ">
                            Close
                        </button>
                    </div>
                </form>
                </div>
        </MahjongModel>
    )
}