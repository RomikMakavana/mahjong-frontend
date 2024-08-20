"use client";
import MahjongModel from "../MahjongModel";
import Image from "next/image";
import firstBadge from "@/assets/images/svg/1.svg";
import unlock_new_item_layer_web from "@/assets/images/svg/unlock_new_item_layer_web.svg";
import unlock_new_item_layer_mobile from "@/assets/images/svg/unlock_new_item_layer_mobile.svg";
import trophy from "@/assets/images/svg/trophy.svg";
import { useState } from "react";

export default function UnlockedNewBadge() {
    const [open, setOpen] = useState(true);
    return (
        <MahjongModel open={open} closeModel={() => setOpen(false)} extraCss="bg-none xxs:bg-unlock-badge-bg-mobile xs:bg-unlock-badge-bg bg-cover">
            <div className="mx-[80px] max-xs:mx-4 my-[10px]">
                <Image src={firstBadge} alt="First Badge" className="w-[149px] h-[149px] mx-auto" />
                <div className="text-center mt-4 ">
                    <h2 className="font-bold text-[22px] max-xs:text-base text-white">Congratulations! You are a Legend</h2>
                    <p className="mt-2 mb-5 font-medium text-xs xs:text-base text-white opacity-70">You have unlocked a new badge</p>
                </div>
                <div className="w-full" >
                    <button className="flex mx-auto border rounded-lg border-brand-yellow2 items-center py-[10px] px-9 ">
                        <Image src={trophy} alt="Trophy" className="w-4" />
                        <span className="text-brand-yellow2 ml-2 font-medium text-sm">
                            1.2 daily point booster
                        </span>
                    </button>
                </div>
            </div>
        </MahjongModel>
    )
}