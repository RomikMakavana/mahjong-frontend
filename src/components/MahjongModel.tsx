"use client"

import React, { ReactNode, useEffect } from "react";
import IconClose from "@/assets/images/svg/close.svg";
import Image from "next/image";

interface Props {
    open?: boolean;
    children: ReactNode;
    closeModel?: () => void;
    showCloseBtn?: boolean;
    closeModalWhenOutsideClick?: boolean;
    extraCss?: string;
    extraCssForBg?: string;
}

export default function MahjongModel(props: Props) {
    const { open, children,
        closeModel,
        showCloseBtn = false,
        closeModalWhenOutsideClick = true,
        extraCss,
        extraCssForBg
    } = props;

    const toggleBodyOverflow = () => {
        if(open) document.body.style.overflow = 'hidden'
        if(!open) document.body.style.overflowY = 'scroll'
    }

    useEffect(() => {
        toggleBodyOverflow();
    }, [open])

    return (
        <React.Fragment>
            {
                open ?
                    <div onClick={() => closeModalWhenOutsideClick && closeModel ? closeModel() : ''} className={`fixed z-[1000] left-0 right-0 top-0 bottom-0 inset-0 overflow-y-auto h-screen animate-[fadein_1s_forwards] ${extraCssForBg ? extraCssForBg : 'bg-black bg-opacity-80 backdrop-blur'} `}>
                        <div className="absolute z-[1000] inset-0 flex w-full xs:items-center justify-center flex-col">
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className={`border border-neutral-700 p-5 m-5 bg-no-repeat shadow-purpleShadow bg-[#131313]  rounded-3xl overflow-auto max-w-[calc(100%_-_2rem)]  max-h-[calc(100vh_-_5rem)] flex flex-col ${extraCss ? extraCss : ''}`}
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
                    </div> : <></>
            }
        </React.Fragment>
    )
}
