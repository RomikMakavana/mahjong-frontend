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
        }
    ])
    return (
        <MahjongModel open={true} extraCss="xs:w-[800px] max-between-md-and-sm:max-h-[69%]">
            <div className="max-between-md-and-sm:overflow-hidden max-between-md-and-sm:justify-between max-between-md-and-sm:flex max-between-md-and-sm:h-full max-between-md-and-sm:flex-col">
                <h6 className="text-white font-bold text-lg">Redeem and buy points</h6>
                <div className="my-5 flex-col between-md-and-sm:flex-row flex max-between-md-and-sm:flex-grow max-between-md-and-sm:h-full max-between-md-and-sm:overflow-auto scrolls">
                    {
                        redeemPointsDetails.map((data, index) => {
                            return (
                                <div key={index} 
                                className={`mr-3 max-between-md-and-sm:mr-0 p-7 max-between-md-and-sm:p-[17px] rounded-[15px] max-between-md-and-sm:rounded-xl py-[31px] max-between-md-and-sm:px-6 text-center flex-1 last:mr-0 bg-no-repeat bg-cover max-between-md-and-sm:border max-between-md-and-sm:border-white max-between-md-and-sm:border-opacity-25 max-between-md-and-sm:mb-[9px] ${!data.isComingSoon ? 'between-md-and-sm:bg-redeem-points-bg max-between-md-and-sm:bg-redeem_points_coming_soon_bg_mobile' : 'between-md-and-sm:bg-redeem-points-coming-soon-bg max-between-md-and-sm:bg-redeem_points_bg_mobile'}`}>
                                    <div className="flex flex-col justify-between h-full max-between-md-and-sm:flex-row">
                                        <div className="max-between-md-and-sm:flex max-between-md-and-sm:items-center">
                                            <div className="flex justify-center items-center">
                                                <Image src={data.icon} alt="Image" className="w-10 h-10 max-between-md-and-sm:w-7 max-between-md-and-sm:h-7" />
                                            </div>
                                            <div className="between-md-and-sm:mt-[18px] max-between-md-and-sm:ml-3 max-between-md-and-sm:text-left">
                                                <span className="text-white text-base font-bold max-between-md-and-sm:text-sm">{data.label}</span>
                                            </div>
                                        </div>
                                        <div className="between-md-and-sm:mt-[18px]">
                                        <button disabled={data.isComingSoon} className="bg-brand-blue disabled:cursor-not-allowed disabled:bg-[#363636]  text-sm font-bold text-white rounded-9 py-3 px-5 max-between-md-and-sm:px-4 max-between-md-and-sm:py-2">Redeem</button>
                                        <div className="mt-[18px] max-between-md-and-sm:mt-1">
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