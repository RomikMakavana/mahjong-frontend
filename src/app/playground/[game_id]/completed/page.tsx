'use client'
import MahjongModel from "@/components/MahjongModel";
import APIService from "@/services/firebase/api";
import { useNotifications } from "@/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImgAvatar from "@/assets/images/avatar.png";
import CARDS from "@/helpers/cardsList";
import IconLeftArrow from "@/assets/images/svg/left_arrow.svg";
import Loader from "@/components/Loader";

export default function PlaygroundCompleted() {
    const params = useParams();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(true);
    const [wonPlayerDetails, setWonPlayerDetails] = useState<{
        playerName: string,
        tiles: string[],

    }>();
    const { notification } = useNotifications();
    const { game_id } = params;

    useEffect(() => {
        loadGameDetails();
    }, [])

    const loadGameDetails = async () => {
        if (!game_id) return;
        try {
            const res = await APIService.getGameDetails(game_id as string);
            if (res.status === 200 && res.data.success === true) {
                const data = res.data.data;
                if (data.is_game_completed === false) {
                    router.replace(`/`);
                } else {
                    console.log('Game completed', data);
                    setIsProcessing(false);
                    if (data.win_details) {
                        const wonPlayer = data.players.find(player => player._id === data.win_details.winner._id);
                        if (wonPlayer) {
                            setWonPlayerDetails({
                                playerName: wonPlayer.player_name,
                                tiles: data.win_details.winner.card_list
                            })
                        } else {
                            router.replace(`/`);
                        }
                    } else {
                        router.replace(`/`);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            notification('Something went wrong', 'error');

        }
    }

    return (
        <div className="h-screen bg-black relative">
            <MahjongModel open={true} extraCss="xs:w-[332px] sm:w-[450px]">
                {
                    isProcessing ? <Loader/> :

                <div>
                    <span className="flex justify-center items-center">
                        <Image
                            src={ImgAvatar}
                            alt="Avatar Image"
                            className="rounded-full border-[#60F8F8] w-[43px] h-auto object-cover border"
                        />

                        <p className="text-white font-medium text-base py-[14.5px] ml-[14px]">
                            {wonPlayerDetails?.playerName} won the game
                        </p>
                    </span>
                    <div className="grid grid-cols-7 gap-1 mt-7">
                        {wonPlayerDetails?.tiles.map((tile, index) => {
                            return (
                                <Image
                                    key={index}
                                    src={CARDS[tile]}
                                    alt="Flower Image"
                                    className="w-[38] min-h-[28.5] h-full"
                                />
                            )
                        })}
                    </div>
                    <button onClick={() => router.push('/')} className="w-full mt-7 py-[14px] rounded-9 border border-white border-opacity-60">

                        <span className="flex justify-center items-center">
                            <Image
                                src={IconLeftArrow}
                                alt="Left Arrow Icon"
                                className="w-4 h-auto mr-[10px]"
                            />
                            <span className="text-white opacity-60 font-medium text-base">
                                Back Home
                            </span>
                        </span>
                    </button>
                </div>
                }
            </MahjongModel>
        </div>
    )
}