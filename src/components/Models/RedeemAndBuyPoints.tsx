'use client'

import { useState } from "react";
import MahjongModel from "../MahjongModel";
import { ICONS } from "@/helpers/icons";
import Image from "next/image";

export default function RedeemAndBuyPoints() {
    const [redeemPointsDetails, setRedeemPointsDetails] = useState<{
        icon: string, label: string, action: () => void, isComingSoon: boolean, extraDetails: string
    }[]>([
        {
            icon: ICONS.IconGiftCard,
            label: '$100 Amazon Giftcard',
            action: () => { },
            extraDetails: '',
            isComingSoon: true
        },
        {
            icon: ICONS.IconCollection,
            label: '$100 worth NFT',
            action: () => { },
            extraDetails: '',
            isComingSoon: true
        },
        {
            icon: ICONS.IconCurrency,
            label: '$100 Worth USDT',
            action: () => { },
            extraDetails: '',
            isComingSoon: true
        },
        {
            icon: ICONS.IconCoin,
            label: 'Buy Game Points',
            action: () => { },
            extraDetails: '50% OFF',
            isComingSoon: false
        },
    ])
    return (
        <MahjongModel open={true} extraCss="xs:w-[800px]">
            <div>
                <h6 className="text-white font-bold text-lg">Redeem and buy points</h6>
                <div className="my-5 flex-col between-md-and-sm:flex-row flex ">
                    {
                        redeemPointsDetails.map((data, index) => {
                            return (
                                <div key={index} className={`mr-3 p-7 rounded-[15px] py-[31px] text-center flex-1 last:mr-0 bg-no-repeat bg-cover ${!data.isComingSoon ? 'bg-redeem-points-bg' : 'bg-redeem-points-coming-soon-bg'}`}>
                                    <div className="flex flex-col justify-between h-full">
                                        <div>
                                            <div className="flex justify-center items-center">
                                                <Image src={data.icon} alt="Image" className="w-10 h-10" />
                                            </div>
                                            <div className="mt-[18px]">
                                                <span className="text-white text-base font-bold">{data.label}</span>
                                            </div>
                                        </div>
                                        <div className="mt-[18px]">
                                        <button disabled={data.isComingSoon} className="bg-brand-blue disabled:cursor-not-allowed disabled:bg-[#363636]  text-sm font-bold text-white rounded-9 py-3 px-5">Redeem</button>
                                        <div className="mt-[18px]">
                                            <span className={`text-xs font-bold ${data.isComingSoon ? 'text-[#ffffff80]' : 'text-brand-yellow2'}`}>{data.isComingSoon ? 'Coming Soon!' : data.extraDetails}</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <button className="border border-[#ffffff14] w-full rounded-9 p-3.5 text-[#fff9] text-base font-bold">Close</button>
            </div>
        </MahjongModel>
    )
}