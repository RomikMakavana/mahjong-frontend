import MahjongModel from "../MahjongModel";
import { ICONS } from "@/helpers/icons";
import Image from "next/image";

export default function RoomModel() {
    return (
        <MahjongModel open={true} extraCss="xs:w-[415px]">
            <div>
                <div className="border">
                <div className="hidden sm:flex  relative group/menu cursor-pointer items-center rounded-9 bg-transparent ">
                <label className="text-white">Hong Kong Mahjong</label>
                <Image src={ICONS.IconDropdown} alt="Dropdown Image" className="group-hover/menu:rotate-180 transition-all duration-500  " />
                </div>
                    {/* <select id="options" name="options">
                        <option value="option1">Hong Kong Mahjong</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                    </select> */}
                </div>
                <div>

                </div>
            </div>
        </MahjongModel>
    )
}