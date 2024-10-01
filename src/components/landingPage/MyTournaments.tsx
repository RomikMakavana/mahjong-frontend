"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import IconMahJong from "@/assets/images/svg/mahjong.svg";
import { database } from "@/services/firebase/firestore";
import { onValue, ref } from "firebase/database";
import { User } from "firebase/auth";
import { AuthService } from "@/services/firebase/auth";
import APIService from "@/services/firebase/api";
import { MahjongUser, Tournament } from "@/interfaces";
import Loader from "../Loader";
import moment from "moment";

interface MyTournamentsProps {
    openLoginModal: () => void;
}

export const MyTournaments = (props: MyTournamentsProps) => {
    const [tournaments, setTournaments] = useState<Tournament[]>([])
    const [user, setUser] = useState<MahjongUser | null>(null);
    const [somethingWentWrong, setSomethingWentWrong] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        // Get user from Firebase Auth
        if (AuthService.user) {
            loadUser();
        } else {
            setUser(null);
            setTournaments([]);
        }

    }, [AuthService.user]);

    const loadUser = async () => {
        const user = await APIService.getProfile();
        if (user) {
            setUser(user);
        } else {
            setSomethingWentWrong(true);
            setIsProcessing(false);
        }
    }

    useEffect(() => {
        if (!user) return;
        setIsProcessing(true);
        const dataRef = ref(database, 'game-list');

        // Set up Firebase Realtime Database listener
        const unsubscribe = onValue(dataRef, (snapshot) => {
            let data = snapshot.val();
            
            if(typeof data == 'object' && data != null){
                data = Object.values(data);
                // Find game where user is a participant
                if (data && Array.isArray(data)) {
                    const userGames = data.filter((game: Tournament) => game.players.find((player) => player.user_id == user.apiUser._id));
                    setTournaments(userGames);
                    setIsProcessing(false);
                }
            }

        });
        return () => {
            unsubscribe();
        };
    }, [user])

    const getFormattedDate = (date: Date) => {
        return moment(date).format('hh:mm A  |  Do MMM YYYY');
    }

    return (
        <div className="border p-3 xs:p-5 bg-[#0D0D0D]  border-[#1b1b1b] sm:rounded-lg  overflow-y-hidden relative">
            {
                (user == null || isProcessing || somethingWentWrong) &&
                <div className="absolute top-0 bottom-0  sm:rounded-lg left-0 right-0 z-10 backdrop-blur-sm flex justify-center items-center">
                    {
                        isProcessing && <Loader />
                    }

                    {
                        somethingWentWrong && <p className="text-red-500 font-semibold">Something went wrong</p>
                    }
                    {
                        !isProcessing && user == null &&
                        <div className="flex flex-col items-center justify-center">
                            <p className="mb-2 font-medium">Login to view Tournaments</p>
                            <button onClick={props.openLoginModal} className=" rounded-9 bg-brand-blue px-5 py-2">
                                <span className="btn-text">Login</span>
                            </button>
                        </div>
                    }
                </div>
            }
            <span className="text-light-blue font-bold text-base">{tournaments.length} Matches</span>
            <div className="mt-3 xs:mt-6  h-[161px] overflow-y-auto scrolls">
                {
                  tournaments.length > 0 ?  tournaments.map((data, index) => {
                        return (
                            <div key={index} className="mb-[22px] flex items-center ">
                                <div className="w-11 h-11 flex justify-center items-center border border-brand-white-7 rounded-lg mr-4">
                                    <Image src={IconMahJong} alt="Tournament Icon" />
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div className="w-full">
                                        <div className="p-2 xs:mb-1">
                                            <span className=" text-[#ffffff80] text-sm ">Tournament ({data.game_code})</span>
                                            {
                                                data.is_game_started &&
                                                <span className="rounded-md bg-brand-blue px-2 ml-2 py-[2px] bg-opacity-25 text-light-blue text-xs leading-tight  font-semibold">Started</span>
                                            }
                                        </div>
                                        <p className="text-white font-bold text-sm xs:text-base">{getFormattedDate(new Date())}</p>
                                    </div>
                                    <button className="rounded-md bg-brand-blue px-2 py-1 text-sm font-semibold mr-2">Open</button>
                                </div>

                            </div>
                        )
                    }) : <p className="text-white text-sm flex items-center justify-center h-full">No Tournaments</p>
                }

            </div>
        </div>
    )
}