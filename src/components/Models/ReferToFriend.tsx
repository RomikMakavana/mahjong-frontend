import InputField from "../InputField";
import MahjongModel from "../MahjongModel";
import PrimaryButton from "../PrimaryButton";
import Image from "next/image";
import ImgAvatar from "@/assets/images/avatar.png";
import edit_icon from "@/assets/images/svg/edit_icon.svg";

export default function ReferToFriend() {
    return (
        <MahjongModel width="363px">
            <div>
                <div>
                    <div>
                        <div className="w-fit mx-auto relative">
                            <Image src={ImgAvatar} alt="Avatar Image" 
                            className="rounded-full w-[55px] border-white border-[0.2px] border-opacity-35" />
                            <Image src={edit_icon} alt="Edit Icon" className="w-7 -top-1 absolute -right-3"/>
                        </div>
                    </div>
                    <p className="text-white w-full text-center mb-[23px] font-bold text-base mt-[18px]">Dakshjoshi44533</p>
                    <InputField type="text" placeholder="Dakshjoshi4843" />
                </div>
                <div className="mt-4">
                    <PrimaryButton label="Save" />
                    <button className="text-white opacity-60 mt-[10px] w-full border border-white font-bold text-sm border-opacity-10 rounded-9 py-[14px] max-xs:py-3">
                        Close
                    </button>
                </div>
            </div>
        </MahjongModel>
    )
}