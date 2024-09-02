import Image from "next/image";
import MahjongModel from "../MahjongModel";

export default function JoinMatch() {
    return (
        <MahjongModel open={true} extraCss="xs:w-[363px]">
            <div>
                <div className="w-full">

                    {/* Mobile : MarginBottom - 20px */}
                    {/* Tablet : MarginBottom - 20px */}
                    {/* Laptop : MarginBottom - 20px */}

                    <div className="mb-5">
                        <div className="w-full">
                            <Image src='/images/join_match.avif' width={67} height={67} alt="Join Match" className="mx-auto" />
                        </div>
                        <div className="w-full text-center">

                            {/* Mobile : Text Size : 20px , MarginTop - 14px */}
                            {/* Tablet : Text Size - 20px , MarginTop - 14px*/}
                            {/* Laptop : Text Size - 20px , MarginTop - 14px*/}

                            <h2 className="mt-3.5 sm:text-xl text-xl text-white font-bold">
                                Join Match
                            </h2>

                             {/* Mobile : Text Size : 14px , MarginTop - 6px */}
                             {/* Tablet : Text Size - 14px , MarginTop - 6px*/}
                            {/* Laptop : Text Size - 14px , MarginTop - 6px*/}

                            <p className="mt-[6px] font-medium text-center text-sm text-white opacity-50">
                            Room name: Dakshjoshi87484534
                            </p>
                        </div>
                    </div>
                    
                </div>
                <div className="w-full mt-3">

                    {/* Mobile : Text Size : 14px , Padding : 14px Top & Bottom , Rounded Border - 9px*/}
                    {/* Tablet : Text Size : 16px , Padding : 14px Top & Bottom , Rounded Border - 9px*/}
                    {/* Laptop : Text Size : 16px , Padding : 14px Top & Bottom , Rounded Border - 9px*/}
                    

                    <button className="w-full bg-brand-blue py-3.5 text-sm sm:text-base font-bold text-white rounded-9">
                            Join Match
                    </button>

                    {/* Mobile : Text Size : 14px , MarginTop : 10px , Padding : 14px Top & Bottom , Rounded Border - 9px*/}
                    {/* Tablet : Text Size : 16px , MarginTop : 10px  , Padding : 14px Top & Bottom  , Rounded Border - 9px*/}
                    {/* Tablet : Text Size : 16px , MarginTop : 10px  ,Padding : 14px Top & Bottom  , Rounded Border - 9px*/}
                   
                    <button className="w-full text-white mt-2.5 py-3.5 text-sm sm:text-base font-bold opacity-60 border border-white border-opacity-10 rounded-9">
                        Cancle
                    </button>
                </div>
            </div>
    
        </MahjongModel>
    )
}