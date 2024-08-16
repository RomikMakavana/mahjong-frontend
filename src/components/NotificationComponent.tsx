"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/slices";
import { setNotification } from "../store/slices/notificationSlice";
import IconCheck from "@/assets/images/svg/check_circle.svg";
import IconCancel from "@/assets/images/svg/cancel.svg";
import IconInfo from "@/assets/images/svg/info_circle.svg";
import Image from "next/image";

const Notification = () => {
  const [visible, setVisible] = useState(true);

  const dispatch = useDispatch();
  const notificationDetails = useSelector((state: RootState) => {
    return state.notification.details;
  });

  useEffect(() => {
    if (notificationDetails) {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => {
            dispatch(setNotification(null));
          }, 2000);
        }, 3000);
    }
  }, [notificationDetails]);

  return (
    <div
      className={`notification max-xs:w-[90%] ${visible ? "slide-in" : "slide-out"}
         ${notificationDetails?.type === "success" && "bg-green-900 bg-opacity-75"}
         ${notificationDetails?.type === "error" && "bg-red-900 bg-opacity-75"}
         ${notificationDetails?.type === "info" && "bg-blue-950 bg-opacity-75"}
         `}
    >
      <div className="flex items-center gap-2">
        {notificationDetails?.type === "success" && (
          <Image src={IconCheck} alt="Icon Check"/>
        )}
        {notificationDetails?.type === "error" && (
          <Image src={IconCancel} alt="Icon Cancel"/>
        )}
        {notificationDetails?.type === "info" && (
           <Image src={IconInfo} alt="Icon Info"/>
        )}
        {notificationDetails ? notificationDetails.message : ""}
      </div>
    </div>
  );
};

export default Notification;
