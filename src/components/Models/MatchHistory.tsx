import MahjongModel from "../MahjongModel";
import { ICONS } from "@/helpers/icons";
import Image from "next/image";

interface MatchEntry {
    level: number;
    minLevel: number;
    pointsPerTile: number;
    date: string;
    time: string;
    result: number; // positive for win, negative for loss
}

interface MatchHistory {
    month: string;
    year: number;
    matches: MatchEntry[];
}

export default function MatchHistory() {

    const matchHistory: MatchHistory[] = [
        {
            month: "Mar",
            year: 2024,
            matches: [
                {
                    level: 5,
                    minLevel: 8,
                    pointsPerTile: 2,
                    date: "25th Apr 2024",
                    time: "03:34 AM",
                    result: -50,
                },
                {
                    level: 5,
                    minLevel: 8,
                    pointsPerTile: 2,
                    date: "25th Apr 2024",
                    time: "03:34 AM",
                    result: 50,
                },
                {
                    level: 5,
                    minLevel: 8,
                    pointsPerTile: 2,
                    date: "25th Apr 2024",
                    time: "03:34 AM",
                    result: 50,
                },
                {
                    level: 5,
                    minLevel: 8,
                    pointsPerTile: 2,
                    date: "25th Apr 2024",
                    time: "03:34 AM",
                    result: 50,
                },
            ],
        },
        {
            month: "Apr",
            year: 2024,
            matches: [
                {
                    level: 5,
                    minLevel: 8,
                    pointsPerTile: 2,
                    date: "25th Apr 2024",
                    time: "03:34 AM",
                    result: -50,
                },
            ],
        },
    ];

    return (
        <MahjongModel open={true} extraCss="xs:w-[415px] max-h-[51%]">
            <div className="flex overflow-hidden flex-col h-full">
                <h2 className="text-base font-bold text-white">Match History</h2>
                <div className=" flex-grow h-full overflow-auto scrolls pr-1">
                    {matchHistory.map((history, idx) => (
                        <div key={idx}>
                            <p className="text-sm max-xs:text-xs max-xs:mb-4 font-semibold my-5 text-white opacity-50">
                            {history.month} {history.year}
                            </p>
                            {history.matches.map((match, index) => (
                                <div key={index} className="flex items-center justify-between mb-6 last:mb-2 max-xs:last:mb-1 max-xs:mb-[20px]">
                                    <div className={`flex items-center`}>
                                        <div className=" border border-white border-opacity-10 rounded-lg">
                                        <Image src={ICONS.MahjongIcon} alt="Image" className="w-5 h-5 m-3 max-xs:w-[17px] max-xs:h-[17px] max-xs:m-[9px] " />
                                        </div>
                                        <div className={`ml-4 max-xs:ml-[10px] text-sm font-normal ${match.result < 0 ? "text-brand-red" : "text-lime-green"}`}>
                                            <p className="text-sm max-xs:text-xs">
                                                Lvl {match.level} | Min Level {match.minLevel} | Pt per tile {match.pointsPerTile}
                                            </p>
                                            <p className="text-sm text-white font-bold max-xs:text-xs">
                                                {match.time} | {match.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`text-lg max-xs:text-xs font-bold ${match.result < 0 ? "text-brand-red" : "text-lime-green"}`}>
                                        {match.result < 0 ? "-" : "+"}${Math.abs(match.result)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button className="text-white rounded-lg py-4 max-xs:py-3 mt-5 border max-xs:font-medium font-bold max-xs:text-opacity-60 border-white border-opacity-15 ">
                    Close
                </button>
            </div>
        </MahjongModel>
    )
}