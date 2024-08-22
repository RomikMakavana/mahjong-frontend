import MahjongModel from "../MahjongModel";

export default function RoomModel() {
    return (
        <MahjongModel open={true} extraCss="xs:w-[415px]">
            <div>
                <div className="border">
                    <select id="options" name="options">
                        <option value="option1">Hong Kong Mahjong</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                    </select>
                </div>
                <div>

                </div>
            </div>
        </MahjongModel>
    )
}