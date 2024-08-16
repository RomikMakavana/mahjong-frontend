import MahjongModel from "../MahjongModel";
import Image from "next/image";
import gift_box from "@/assets/images/svg/gift_box.svg";

export default function ReferAndEarn() {
    return (
        <MahjongModel width="363px">
            <div>
                <div className="w-full">
                    <div className="mx-6 mb-7">
                        <div className="w-full">
                            <Image src={gift_box} alt="Gift Box" className="w-[53px] mx-auto"/>
                        </div>
                        <div className="mt-5 w-full text-center">
                            <h2 className="font-bold text-xl">
                                Refer a friend & earn 100 pts
                            </h2>
                            <p className="mt-2 font-medium text-center text-sm text-white opacity-50">
                                Your friend gets 100 pts on signup and you get 100 pts
                            </p>
                        </div>
                    </div>
                    <button className="rounded-md flex py-[15.5px] w-full border-2 border-dashed border-pale-lavender border-opacity-40">
                        <p className="mx-auto text-pale-lavender opacity-40 font-medium text-sm">DAKSH8849323</p>
                        <span>
                            {/* copy icon */}
                        </span>
                    </button>
                </div>
                <div className="w-full mt-3">
                    <button className="w-full bg-brand-blue py-[14.5px] rounded-9">
                        <span>
                            {/* instagram icon */}
                            <p className="font-bold text-base">Or share it on instagram</p>
                        </span>
                    </button>
                    <button className=" text-white opacity-60 mt-3 w-full border border-white font-bold text-base border-opacity-10 rounded-9 py-[14px]">
                        Close
                    </button>
                </div>
            </div>
        </MahjongModel>
    )
}