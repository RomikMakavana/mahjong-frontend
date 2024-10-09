import MahjongModel from "../MahjongModel";
import Image from "next/image";
import gift_box from "@/assets/images/svg/gift_box.svg";
import copy_icon from "@/assets/images/svg/copy_icon.svg";
import { useNotifications } from "@/utils";

interface Props {
  open: boolean;
  gameCode: string;
  closeModal: (value: boolean) => void;
}

export default function MatchCreated(props: Props) {

  const {notification} = useNotifications();

  const copyCode = async() => {
    try {
      await navigator.clipboard.writeText(props.gameCode);
      notification('Copied!', 'success');
    } catch (error) {
      notification('Failed to copy.', 'error');
    }
  }


  return (
    <MahjongModel open={props.open} closeModel={() => props.closeModal(false)} extraCss="xs:w-[332px] sm:w-[363px]">

      <div>
        <div className="w-full">

          <div className="mb-[10px]">

            <div className="w-full">
              <Image
                width={30}
                height={30}
                src="/images/checklist.avif"
                alt="Checklist"
                className="mx-auto max-lg:w-9 max-lg:h-9 w-[53px] h-[53px]"
              />

              <div className="w-full text-center">
                <h2 className="mt-1 lg:mt-3.5 text-base lg:text-xl text-white font-bold">
                  Match started
                </h2>
                <p className="mt-[6px] font-medium text-center text-xs sm:text-sm text-white opacity-50">
                  Share invite link with your friends
                </p>
              </div>
            </div>

            <div className="w-full mt-4 lg:mt-7 py-3 lg:py-[15.5px] rounded-[5px] border border-dashed border-pale-lavender border-opacity-40">

              <span className="flex justify-center items-center">

                <p className="text-pale-lavender opacity-40 font-medium text-sm truncate max-w-[80%]">
                  {props.gameCode}
                </p>
                <button onClick={copyCode}>
                  <Image
                    src={copy_icon}
                    alt="Copy Icon"
                    className="w-[18px] h-[18px] ml-[10px]"
                  />
                </button>
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full">

        <button onClick={() => props.closeModal(false)} className="w-full bg-brand-blue py-2 lg:py-3.5 text-base font-bold text-white rounded-9">
          Lets start
        </button>


        <button onClick={() => props.closeModal(false)} className="w-full text-white mt-2.5 py-2 lg:py-3.5 text-sm sm:text-base font-bold opacity-60 border border-white border-opacity-10 rounded-9">
          Close
        </button>


      </div>
    </MahjongModel>
  );
}
