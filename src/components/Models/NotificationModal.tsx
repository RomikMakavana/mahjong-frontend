import UserProfile from "@/assets/images/svg/user_profile.svg";
import LineImage from "@/assets/images/svg/line.svg";
import Image from "next/image";
import { ReactNode } from "react";
import IconClose from "@/assets/images/svg/close.svg";

interface Props {
  children: ReactNode;
  closeModel: () => void;
}

const NotificationModal = (props: Props) => {
  const { children, closeModel } = props;
  return (
    <>
      <div className=" z-50 max-xs:left-0 max-xs:right-0 max-xs:px-3 right-3 bottom-8 flex justify-center  w-[356px] absolute">
        <div className="bg-[#131313] p-5 w-full md:w-[95%] text-white rounded-xl border border-[#ffffff29] border-opacity-[84] drop-shadow-notification-block-shadow ">
            <div className="flex justify-end">
                <button onClick={closeModel} className="">
                    <Image src={IconClose} alt="Close Button" width={14} height={14} />
                </button>
            </div>
            {children}
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
