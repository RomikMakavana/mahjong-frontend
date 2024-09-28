"use client"

import Image from "next/image";
import logoWhite from '@/assets/images/svg/logo_white.svg';
import IconShuttle from '@/assets/images/svg/shuttle.svg';
import IconShoppingBag from "@/assets/images/svg/shopping-bag.svg";
import IconGraph from "@/assets/images/svg/graph.svg";
import ImgAvatar from "@/assets/images/avatar.png";
import IconDropdown from "@/assets/images/svg/dropdown.svg";
import IconUser from "@/assets/images/svg/user.svg";
import IcoNetwork from "@/assets/images/svg/network.svg";
import IconLanguage from "@/assets/images/svg/language.svg";
import IconMatchHistory from "@/assets/images/svg/file.svg";
import IconMenu from "@/assets/images/svg/menu.svg"
import React, { useEffect, useState } from "react";
import IconClose from "@/assets/images/svg/close.svg";
import { AuthService } from "@/services/firebase/auth";

import { useNotifications } from "@/utils";

interface HeaderBlockProps {
    startNewGame: () => void;
    sendEmailVerificationLink: () => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void
}

export const HeaderBlock = (props: HeaderBlockProps) => {

    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [scrollPosition, setScrollPosition] = useState<number | null>(null)

    const { notification } = useNotifications();

    const menu: { label: string, icon: string, alt: string, action: () => void }[] = [
        {
            label: 'Player Settings',
            icon: IconUser,
            alt: 'Icon user',
            action: () => {

            }
        },
        {
            label: 'Refer a friend',
            icon: IcoNetwork,
            alt: 'Icon Refer a Friend',
            action: () => {

            }
        },
        {
            label: 'Chinese',
            icon: IconLanguage,
            alt: 'Icon Language',
            action: () => {

            }
        },
        {
            label: 'Match history',
            icon: IconMatchHistory,
            alt: 'Icon Match History',
            action: () => {

            }
        }
    ]

    const logout = async () => {
        try {
            const res = await AuthService.logout();
            if (res.status) {
                props.setIsLoggedIn(false);
                setOpenMobileMenu(false);
                notification("Logged out successfully.", 'success');
            } else {
                notification("something went wrong", 'error');
            }
        } catch (error) {
            console.log(error);

        }
    }

    const updateScroll = () => {
        setScrollPosition(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);

        return (() => {
            window.removeEventListener('scroll', updateScroll);
        })
    })


    return (
        <React.Fragment>
            {/*   */}
            <div className={`transition-opacity duration-300 fixed top-0 left-0 shadow-headerShadowLeft ${typeof scrollPosition === 'number' && scrollPosition > 0 ? 'opacity-0' : 'opacity-0 md:opacity-100'}`}></div>
            <div className={` transition-opacity duration-300  fixed top-0 right-0 shadow-headerShadowRight ${typeof scrollPosition === 'number' && scrollPosition > 0 ? 'opacity-0' : 'opacity-0 md:opacity-100'}`}></div>
            <header className={`section-wrapper z-50 pb-5 pt-6 sm:pt-[50px] transition-all duration-300 sm:pb-[30px] md:pt-9 md:pb-5 w-full fixed top-0 left-0 right-0 ${typeof scrollPosition === 'number' && scrollPosition > 0 ? 'bg-black' : ''}`}>
                <div className="flex justify-between items-center ">
                    <Image src={logoWhite} alt="Logo Image" priority className="w-[97px]   sm:w-[125px] h-auto" />
                    <div className="flex justify-center items-center">
                        <button className="hidden md:flex border border-dashed border-brand-purple rounded-9 p-[13px] mr-2">
                            <Image src={IconGraph} alt="Graph Image" />
                        </button>
                        <button className="hidden md:flex items-center border border-brand-purple rounded-9 mr-[14px] py-3 px-6">
                            <Image src={IconShoppingBag} alt="Icon Marketplace" className="mr-2" />
                            <span className="btn-text">Marketplace</span>
                        </button>
                        <button onClick={props.startNewGame} className="hidden md:flex items-center rounded-9 bg-brand-blue px-5 py-3 mr-[14px]">
                            <Image src={IconShuttle} alt="Icon Start Game" className="mr-2" />
                            <span className="btn-text">Start New Game</span>
                        </button>
                        <div className="hidden sm:flex  relative group/menu cursor-pointer items-center rounded-9 bg-transparent ">
                            <Image src={ImgAvatar} alt="Avatar Image" className="mr-3  rounded-full border-white w-11 h-auto object-cover border-[0.5px]" />
                            <Image src={IconDropdown} alt="Dropdown Image" className="group-hover/menu:rotate-180 transition-all duration-500  " />
                            <div className="absolute bg-brand-black-87 invisible transition-opacity duration-500 opacity-0 group-hover/menu:opacity-100 group-hover/menu:visible border border-brand-purple rounded-9 top-11 -left-24 z-[999] w-44 py-5">
                                {
                                    menu.map((item, index) => {
                                        return (
                                            <button key={index} className="flex items-center py-3 group/item px-5 last:mb-0 w-full transition-all duration-300 hover:bg-brand-blue px hover:bg-opacity-15">
                                                <Image src={item.icon} alt={item.alt} className="mr-4 group-hover/item:scale-15 transition-all duration-300" />
                                                <span className="text-sm font-medium text-white group-hover/item:scale-15 transition-all duration-300">{item.label}</span>
                                            </button>

                                        )
                                    })
                                }
                                {
                                    props.isLoggedIn &&
                                    <button onClick={logout} className="rounded-9 bg-brand-blue px-5 py-2 mt-2 mx-5">
                                        <span className="btn-text text-sm">Logout</span>
                                    </button>
                                }
                            </div>
                        </div>
                        <button onClick={() => setOpenMobileMenu(true)} className="sm:hidden">
                            <Image src={IconMenu} alt="Icon Menu" />
                        </button>
                    </div>
                </div>

            </header>
            <div className={`fixed top-0 left-0 right-0 bottom-0 border-b border-b-brand-dark-grey bg-black backdrop-blur-md z-50 truncate bg-opacity-15 transition-[height] easy-in-out duration-700 ${openMobileMenu ? 'h-screen' : 'h-0'}`}>
                <div className="py-10 px-7 overflow-y-auto h-full">
                    <div className="flex justify-between mb-8 items-center">
                        <div className="flex items-center ">
                            <Image src={ImgAvatar} alt="Avatar Image" className="mr-3  rounded-full border-white w-6  md:w-[30px] h-auto object-cover border-[0.5px]" />
                            <span className="text-white text-base">dakshjoshi66758</span>
                        </div>
                        <div>
                            <button onClick={() => setOpenMobileMenu(false)} className="rounded-full p-3 outline-none bg-brand-dark">
                                <Image src={IconClose} alt="Close Icon" className="w-3" />
                            </button>
                        </div>
                    </div>
                    <div className="h-[1px] bg-brand-dark-grey mb-8"></div>
                    <div>
                        {
                            menu.map((item, index) => {
                                return (
                                    <button key={index} className="flex items-center py-3 group/item  last:mb-0 w-full transition-all duration-300 hover:bg-brand-blue px hover:bg-opacity-15">
                                        <Image src={item.icon} alt={item.alt} className="mr-4 group-hover/item:scale-15 transition-all duration-300" />
                                        <span className="text-sm font-medium text-white group-hover/item:scale-15 transition-all duration-300">{item.label}</span>
                                    </button>

                                )
                            })
                        }
                        {
                            props.isLoggedIn &&
                            <button onClick={logout} className="rounded-9 bg-brand-blue px-5 py-2 mt-2 mx-5">
                                <span className="btn-text text-sm">Logout</span>
                            </button>
                        }
                    </div>

                </div>

            </div>

        </React.Fragment>
    )
}