import MahjongModel from "../MahjongModel";
import Image from "next/image";
import gift_box from "@/assets/images/svg/gift_box.svg";
import copy_icon from "@/assets/images/svg/copy_icon.svg";
import instagram from "@/assets/images/svg/instagram.svg";

export default function ReferAndEarn() {
    return (
        <MahjongModel extraCss="xs:w-[363px]">
            <div>
                <div className="w-full">
                    <div className="mx-6 mb-7">
                        <div className="w-full">
                            <Image src={gift_box} alt="Gift Box" className="w-[53px] mx-auto" />
                        </div>
                        <div className="mt-5 w-full text-center">
                            <h2 className="font-bold text-xl max-xs:text-base text-white">
                                Refer a friend & earn 100 pts
                            </h2>
                            <p className="mt-[6px] font-medium text-center text-sm max-xs:text-xs text-white opacity-50">
                                Your friend gets 100 pts on signup and you get 100 pts
                            </p>
                        </div>
                    </div>
                    <button className="rounded-md py-[15.5px] max-xs:mb-2 max-xs:py-[12px] w-full border-2 border-dashed border-pale-lavender border-opacity-40">
                        <span className="flex justify-center items-center">
                            <p className="text-pale-lavender opacity-40 font-medium text-sm max-sm:text-xs`">DAKSH8849323</p>
                            <Image src={copy_icon} alt="Copy Icon" className="w-4 max-sm:w-3 ml-[10px]" />
                        </span>
                    </button>
                </div>
                <div className="w-full mt-3">
                    <button className="w-full bg-brand-blue py-[14.5px] max-xs:py-[13.5px] rounded-9">
                        <span className="flex justify-center">
                            <Image src={instagram} alt="Instagram" className="w-5 max-xs:w-[18px] max-xs:text-sm" />
                            <p className="font-bold ml-[10px] text-base text-white">Or share it on instagram</p>
                        </span>
                    </button>
                    <button className="text-white opacity-60 mt-3 w-full border border-white font-bold text-sm border-opacity-10 rounded-9 py-[14px] max-xs:py-3">
                        Close
                    </button>
                </div>
            </div>
        </MahjongModel>
    )
}