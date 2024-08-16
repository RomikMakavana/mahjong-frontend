"use client"

import { ReactNode } from "react";
import IconClose from "@/assets/images/svg/close.svg";
import Image from "next/image";

interface Props {
    children: ReactNode;
    closeModel?: () => void;
    width?: string;
    height?: string;
    maxWidth?: string;
    minWidth?: string;
    bgColor?: string;
    minHeight?: string;
    showCloseBtn?: boolean;
    closeModalWhenOutsideClick?:boolean;
}

export default function MahjongModel(props: Props) {
    const { children,
        closeModel,
        width,
        minWidth,
        height,
        minHeight,
        bgColor = 'bg-[#131313]',
        showCloseBtn = false,
        closeModalWhenOutsideClick = true
    } = props;

    return (
        <div onClick={ () => closeModalWhenOutsideClick && closeModel ? closeModel() : ''} className="fixed z-[1000] bg-black bg-opacity-80 backdrop-blur inset-0 overflow-y-auto h-screen animate-[fadein_1s_forwards]">
            <div className="absolute z-[1000] inset-0 flex items-center justify-center flex-col">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="border border-neutral-700 p-5 m-5 shadow-purpleShadow bg-[#131313] rounded-3xl overflow-auto max-w-[calc(100%_-_2rem)]  max-h-[calc(100vh_-_5rem)] flex flex-col"
                    style={{ width, height, minWidth, backgroundColor: bgColor, minHeight }}
                >
                    {children}
                </div>
                {
                    showCloseBtn &&
                    <div className="h-fit hidden lg:block  bottom-12 absolute">
                        <div className="relative flex flex-col justify-end h-[calc(100%_-_5rem)]">
                            <button onClick={closeModel} className="rounded-full p-5 outline-none bg-brand-dark">
                                <Image src={IconClose} alt="Close Icon" className="w-5" />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
