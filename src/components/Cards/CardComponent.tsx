import Image from "next/image";
import CARDS from "@/helpers/cardsList";
import Loader from "../Loader";
import { useEffect } from "react";

interface Props {
  cardId: string;
  myTurn: boolean;
  canDrop: boolean;
  isGameStarted: boolean;
  isPong: boolean | null;
  action?: () => void;
  isProcessing?: boolean;
}

export default function GlobalCard(props: Props) {
  const { cardId, myTurn, canDrop, isGameStarted, isPong, action, isProcessing } = props;

  const dropCard = () => {
    if (myTurn && canDrop && !isProcessing) {
      action && action();
    }
  };

  return (
    <>
      {
        isGameStarted ?
          <div onClick={dropCard} className={`tile-wrapper relative transition-transform duration-300  ease-in-out w-9 h-12 md:w-[40px] md:h-[50px] between-lg-and-2xl:w-[60px] between-lg-and-2xl:h-20 border-3 rounded-[8px] 
      ${isPong == null && "default-bg"}
      ${isPong == true && "pong-bg"}
      ${isPong == false && "gong-bg"}
      ${myTurn && canDrop && !isProcessing
              ? "cursor-pointer hover:transform hover:-translate-y-3"
              : ""
            }
            ${(!canDrop && isGameStarted) || isProcessing === true
              ? " cursor-not-allowed"
              : ""
            }
    `}>
            <div className="flex justify-center items-center h-full">
              <Image src={CARDS[cardId]} alt="Tile" priority className="h-6 md:h-[35px] between-lg-and-2xl:h-[55px] object-contain" />
            </div>
            {isProcessing && isProcessing === true && (
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <Loader customClass="!w-4 !h-4" withoutBackground={true} />
              </div>
            )}

          </div> :
          <div>
            <Image src={CARDS["waiting-card"]} alt="Card" priority className={`w-[35px] between-lg-and-2xl:w-[60px] h-full`} />
          </div>

      }
    </>

    /*
    * Tile with background image
    */

    // <div
    //   onClick={dropCard}
    //   className={`tile-wrapper relative transition-transform duration-300 h-full ease-in-out
    //     ${myTurn && canDrop && !isProcessing
    //       ? "cursor-pointer hover:transform hover:-translate-y-3"
    //       : ""
    //     }
    //     ${(!canDrop && isGameStarted) || isProcessing === true
    //       ? " cursor-not-allowed"
    //       : ""
    //     }
    //     `}
    // >
    //   {props.isGameStarted ? <div
    //     className={`relative bg-contain bg-no-repeat w-8 h-[50px] md:w-[40px] md:h-[60px] between-lg-and-2xl:w-[60px] between-lg-and-2xl:h-[80px] pr-[2px] pb-[5px] pt-[6px] md:pl-1 md:pr-2 md:py-2
    //         ${isPong === null && "bg-tile-image"}
    //         ${isPong === true && "bg-pong-tile-image"} 
    //         ${isPong === false && "bg-gong-tile-image"}
    //         `}
    //   >
    //     <div className="flex justify-center items-center ">
    //       <Image
    //         src={CARDS[cardId]}
    //         alt="Card"
    //         priority
    //         className="h-6 md:h-[35px] between-lg-and-2xl:h-[55px] object-contain"
    //       />
    //     </div>
    //   </div> :
    //     <Image src={CARDS["waiting-card"]} alt="Card" priority className={`w-[35px] between-lg-and-2xl:w-[60px] h-full`} />

    //   }
    //   {isProcessing && isProcessing === true && (
    //     <div className="absolute top-1/3 left-[15px]">
    //       <Loader customClass="!w-4 !h-4" withoutBackground={true} />
    //     </div>
    //   )}
    // </div>


    /*
    * Tile with while image
    */

    // <div onClick={dropCard} className={`tile-wrapper relative transition-transform duration-300 h-full ease-in-out
    // ${(myTurn && canDrop && !isProcessing) ? 'cursor-pointer hover:transform hover:-translate-y-3' : ''}
    // ${!canDrop && isGameStarted || isProcessing === true ? ' cursor-not-allowed' : ''}
    // `}>

    //     <Image src={CARDS[cardId]} alt="Card" priority className={`w-[35px] sm:w-[50px] h-full
    //         ${isPong === true ? 'mix-blend-hard-light' : ''}
    //         ${isPong === false ? 'mix-blend-difference' : ''}
    //         `} />
    //     {
    //         isProcessing && isProcessing === true &&
    //         <Loader customClass='!w-4 !h-4' withoutBackground={true} />
    //     }
    // </div>
  );
}
