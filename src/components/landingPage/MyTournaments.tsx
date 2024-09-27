"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import IconMahJong from "@/assets/images/svg/mahjong.svg";
import { database } from "@/services/firebase/firestore";
import { onValue, ref } from "firebase/database";
import { User } from "firebase/auth";
import { AuthService } from "@/services/firebase/auth";
import APIService from "@/services/firebase/api";
import { MahjongUser } from "@/interfaces";

export const MyTournaments = () => {
    const [tournaments, setTournaments] = useState<{ tournamentName: string, time: string }[]>([])
    const [user, setUser] = useState<MahjongUser | null>(null);

    useEffect(() => {
        // Get user from Firebase Auth
        loadUser();

    }, []);

    const loadUser = async () => {
        const user = await APIService.getProfile();
        setUser(user);
    }

    useEffect(() => {
        if (!user) return;
        const dataRef = ref(database, 'game-list');

        // Set up Firebase Realtime Database listener
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();

            // Find game where user is a participant
            if (data && Array.isArray(data)) {
                const userGames = data.filter((game: any) => game.players.find((player: any) => player.user_id == user.apiUser._id));
                console.log(user, userGames);
            }

            // setto(data);
        });

        // Cleanup function to unsubscribe when component unmounts
        return () => {
            unsubscribe();
        };
    }, [user])

    return (
        <div className="border p-3 xs:p-5 bg-[#0D0D0D]  border-[#1b1b1b] sm:rounded-lg  overflow-y-hidden">
            <span className="text-light-blue font-bold text-base">4 Matches</span>
            <div className="mt-3 xs:mt-6  h-[161px] overflow-y-auto scrolls">
                {
                    tournaments.map((data, index) => {
                        return (
                            <div key={index} className="mb-[22px] flex items-center ">
                                <div className="w-11 h-11 flex justify-center items-center border border-brand-white-7 rounded-lg mr-4">
                                    <Image src={IconMahJong} alt="Tournament Icon" />
                                </div>
                                <div className="w-full">
                                    <p className=" text-[#ffffff80] text-sm xs:mb-1">{data.tournamentName}</p>
                                    <p className="text-white font-bold text-sm xs:text-base">{data.time}</p>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}