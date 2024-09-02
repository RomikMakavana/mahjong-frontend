import MahjongModel from "../MahjongModel";
import Image from "next/image";
import left_arrow from "@/assets/images/svg/left_arrow.svg";
import ImgAvatar from "@/assets/images/avatar.png";
import Flower from "@/assets/images/svg/flowers.png";
export default function ViewWiningTile() {
  return (
    <MahjongModel open={true} extraCss="xs:w-[332px] sm:w-[363px]">
      <div className="w-full">

        {/* Mobile : Margin  : 20px*/}

        <div className="m-[20px]">

          <div className="w-full">

            {/* Mobile : Border : 1px , Width  : 43px */}

            <span className="flex justify-center items-center">
              <Image
                src={ImgAvatar}
                alt="Avatar Image"
                className="rounded-full border-[#60F8F8] w-[43px] h-auto object-cover border"
              />

              {/* Mobile : TextSize : 14px , Margin  : 14px Left , Padding : 14.5 Top & Bottom*/}
              {/* Table : TextSize : 14px , Margin  : 14px Left , Padding : 14.5 Top & Bottom*/}
              {/* Laptop : TextSize : 14px , Margin  : 14px Left , Padding : 14.5 Top & Bottom*/}

              <p className="text-white font-medium text-sm py-[14.5px] ml-[14px]">
                dakshjoshi66758’s tiles
              </p>
            </span>
          </div>

          {/* <div className="flex justify-center items-center mt-7"> */}
            
            <div className="grid grid-cols-7 gap-[1px] mt-7">
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
              <Image
                src={Flower}
                alt="Flower Image"
                className="w-[38] h-[28.5]"
              />
            
            </div>
          {/* </div> */}


          <button className="w-full mt-7 py-[14px] rounded-9 border border-white border-opacity-60">
             
             <span className="flex justify-center items-center">

               {/* Mobile : Width & Height : 18px , Margin-right : 10px*/}
               {/* Tablet : Width & Height : 18px  , Margin-right : 10px */}
               {/* Laptop :  Width & Height : 18px  , Margin-right : 10px */}

               <Image
                 src={left_arrow}
                 alt="Left Arrow Icon"
                 className="w-4 h-auto mr-[10px]"
               />

               {/* Mobile : Text Size : 16px */}
               {/* Tablet : Text Size - 16px */}
               {/* Laptop : Text Size - 16px */}

                <p className="text-white opacity-60 font-medium text-base">
                 Back Home
               </p>
             </span>
           </button>


        </div>
      </div>
    </MahjongModel>
  );
}
