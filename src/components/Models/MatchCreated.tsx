import MahjongModel from "../MahjongModel";
import Image from "next/image";
import gift_box from "@/assets/images/svg/gift_box.svg";
import copy_icon from "@/assets/images/svg/copy_icon.svg";

export default function MatchCreated() {
  return (
    <MahjongModel open={true} extraCss="xs:w-[332px] sm:w-[363px]">
     
      <div>
        <div className="w-full">

          {/* Mobile : Margin-Bottom : 10px  */}

          <div className="mb-[10px]">
           
            <div className="w-full">
              <Image
                src="/av"
                width={53}
                height={53}
                alt="Checklist"
                className="mx-auto"
              />

              <div className="w-full text-center">
                {/* Mobile : Text Size : 18px , MarginTop - 14px */}
                {/* Tablet : Text Size - 20px , MarginTop - 14px */}
                {/* Laptop : Text Size - 20px , MarginTop - 14px*/}

                <h2 className="mt-3.5 text-lg sm:text-xl text-white font-bold">
                  Match created
                </h2>

                {/* Mobile : Text Size : 12px , MarginTop - 6px */}
                {/* Tablet : Text Size - 14px, MarginTop - 6px*/}
                {/* Laptop : Text Size - 14px, MarginTop - 6px*/}

                <p className="mt-[6px] font-medium text-center text-xs sm:text-sm text-white opacity-50">
                  Share invite link with your friends
                </p>
              </div>
            </div>

         {/* Mobile : Padding : 15.5 Top & Bottom , MarginTop - 28px ,Border-radius : 5px*/}
         {/* Tablet : Padding : 15.5 Top & Bottom , MarginTop - 28px ,Border-radius : 5px*/}
        {/* Laptop :  Padding : 15.5 Top & Bottom , MarginTop - 28px , Border-radius : 5px */}

            <button className="w-full mt-7 py-[15.5px] rounded-[5px] border border-dashed border-pale-lavender border-opacity-40">
             
              <span className="flex justify-center items-center">
    

                {/* Mobile : Text Size : 14px */}
                {/* Tablet : Text Size - 14px */}
                {/* Laptop : Text Size - 14px */}


                <p className="text-pale-lavender opacity-40 font-medium text-sm">
                  mahjonginvite.7H8830JFUDB
                </p>

                 {/* Mobile : Width & Height : 18px , Margin-left : 10px*/}
                {/* Tablet : Width & Height : 18px  , Margin-left : 10px */}
                {/* Laptop :  Width & Height : 18px  , Margin-left : 10px */}

                <Image
                  src={copy_icon}
                  alt="Copy Icon"
                  className="w-[18px] h-[18px] ml-[10px]"
                />
              </span>
            </button>
          </div>
        </div>

      </div>

      <div className="w-full">


                    {/* Mobile : Text Size : 16px , Padding : 14px Top & Bottom , Rounded Border - 9px*/}
                    {/* Tablet : Text Size : 16px , Padding : 14px Top & Bottom , Rounded Border - 9px*/}
                    {/* Laptop : Text Size :  16px , Padding : 14px Top & Bottom , Rounded Border - 9px*/}
                    

                    <button className="w-full bg-brand-blue py-3.5 text-base font-bold text-white rounded-9">
                    Lets start
                    </button>

                    {/* Mobile : Text Size : 14px , MarginTop : 10px , Padding : 14px Top & Bottom , Rounded Border - 9px*/}
                    {/* Tablet : Text Size :  16px , MarginTop : 10px  , Padding : 14px Top & Bottom  , Rounded Border - 9px*/}
                    {/* Laptop : Text Size :  16px , MarginTop : 10px ,Padding : 14px Top & Bottom  , Rounded Border - 9px*/}
                   
                    <button className="w-full text-white mt-2.5 py-3.5 text-sm sm:text-base font-bold opacity-60 border border-white border-opacity-10 rounded-9">
                    Close
                    </button>


      </div>
    </MahjongModel>
  );
}
