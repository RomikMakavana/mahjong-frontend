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
import google_logo from "@/assets/images/svg/google_logo.svg";
import MahjongModel from "../MahjongModel";
import InputField from "../InputField";
import PrimaryButton from "../PrimaryButton";
import { AuthService } from "@/services/firebase/auth";

export const Header = () => {

    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const [openSignInModel, setOpenSignInModel] = useState(false);
    const [openSignUpModel, setOpenSignUpModel] = useState(false);
    const [openVerificationModel, setOpenVerificationModel] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    useEffect(() => {
        setEmail('');
        setPassword('');
    },[openSignInModel, openSignUpModel])

    const signInUser = () => {
        setEmail('');
        setPassword('');
        setOpenSignInModel(false);
        setOpenSignUpModel(false);
        setOpenVerificationModel(true);
    }

    // const userRegister = () => {
    //     setOpenSignInModel(false);
    //     setOpenSignUpModel(false);
    //     setOpenVerificationModel(true);
    // }

    const closeModal = () => {
        setOpenSignInModel(false);
        setOpenSignUpModel(false);
        setOpenVerificationModel(false);
    }

    const loginWithGoogle = async (e: React.MouseEvent) => {
        e.stopPropagation()
        try {
            const res = await AuthService.googleSignIn()
            if (res.status) {
                closeModal();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkIsLoggedIn();
    }, []);

    const checkIsLoggedIn = async () => {
        try {
            const res = await AuthService.getProfile();
            if (!res) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.log(error);

        }
    }

    const logout = async () => {
        try {
            const res = await AuthService.logout();
            if(res.status){
                setIsLoggedIn(false);
                setOpenMobileMenu(false);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            const res = await AuthService.createUser(email, password);
            if(res.status){
                setOpenSignUpModel(false);
                setOpenSignInModel(true);
            }else {
                if(res.message === 'auth/email-already-in-use'){
                    console.log('email is already in use.');
                    
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <React.Fragment>
            {/*   */}
            <div className="section-wrapper z-50  pb-5 pt-6 sm:pt-[50px] sm:pb-[30px] md:pt-9 md:pb-5 w-full fixed top-0 left-0 right-0">
                <div className="flex justify-between items-center">
                    <Image src={logoWhite} alt="Logo Image" priority className="w-[97px]   sm:w-[125px] h-auto" />
                    <div className="flex justify-center items-center">
                        <button className="hidden md:flex border border-dashed border-brand-purple rounded-9 p-[13px] mr-2">
                            <Image src={IconGraph} alt="Graph Image" />
                        </button>
                        <button className="hidden md:flex items-center border border-brand-purple rounded-9 mr-[14px] py-3 px-6">
                            <Image src={IconShoppingBag} alt="Icon Marketplace" className="mr-2" />
                            <span className="btn-text">Marketplace</span>
                        </button>
                        <button className="hidden md:flex items-center rounded-9 bg-brand-blue px-5 py-3 mr-[14px]">
                            <Image src={IconShuttle} alt="Icon Start Game" className="mr-2" />
                            <span className="btn-text">Start New Game</span>
                        </button>
                        <div className="hidden sm:flex  relative group/menu cursor-pointer items-center rounded-9 bg-transparent ">
                            <Image src={ImgAvatar} alt="Avatar Image" className="mr-3  rounded-full border-white w-11 h-auto object-cover border-[0.5px]" />
                            <Image src={IconDropdown} alt="Dropdown Image" className="group-hover/menu:rotate-180 transition-all duration-500  " />
                            <div className="absolute bg-brand-black-87 invisible transition-opacity duration-500 opacity-0 group-hover/menu:opacity-100 group-hover/menu:visible border border-brand-purple rounded-9 top-12 -left-24 z-[999] w-44 py-5">
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
                                    isLoggedIn ?
                                        <button onClick={logout} className="rounded-9 bg-brand-blue px-5 py-2 mt-2 mx-5">
                                            <span className="btn-text text-sm">Logout</span>
                                        </button>
                                        :
                                        <button onClick={() => setOpenSignInModel(true)} className="rounded-9 bg-brand-blue px-5 py-2 mt-2 mx-5">
                                            <span className="btn-text text-sm">Login</span>
                                        </button>
                                }
                            </div>
                        </div>
                        <button onClick={() => setOpenMobileMenu(true)} className="sm:hidden">
                            <Image src={IconMenu} alt="Icon Menu" />
                        </button>
                    </div>
                </div>

            </div>
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
                            isLoggedIn ?
                                <button onClick={logout} className="rounded-9 bg-brand-blue px-5 py-2 mt-2 mx-5">
                                    <span className="btn-text text-sm">Logout</span>
                                </button>
                                :
                                <button onClick={() => setOpenSignInModel(true)} className="rounded-9 bg-brand-blue px-5 py-2 mt-2 mx-5">
                                    <span className="btn-text text-sm">Login</span>
                                </button>
                        }
                    </div>

                </div>

            </div>
            {openSignInModel || openSignUpModel || openVerificationModel ? <MahjongModel width="363px" showCloseBtn={true} closeModel={closeModal}>
                {/* Sign In Pop up */}
                {openSignInModel &&
                    <form onSubmit={signInUser}>
                        <div className="animate-[fadein_1s_forwards]">
                            <h2 className="text-center text-2xl font-[500]">Sign In</h2>
                            <div className="mt-5 mb-6 flex flex-col gap-[10px]">
                                <InputField type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                <InputField type="password" minLength={8} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                                <p className="text-right text-sm font-[500px] underline text-white opacity-70">Forgot password</p>
                            </div>
                            <div className="flex flex-col">
                                <PrimaryButton label="Continue" isDisabled={password.length < 8 && !email.length} />
                                <p className="text-center text-lg font-thin mt-[10px]">Or</p>
                                <button type="button" onClick={loginWithGoogle} className="border py-3 rounded-[10px] border-neutral-800 mt-[10px]">
                                    <span className="flex gap-1 justify-center">
                                        <Image src={google_logo} alt="Google Icon" className="w-[26px] mr-3" />
                                        <p className="font-[500] text-lg">Signin with Google</p>
                                    </span>
                                </button>
                                <span className="text-center mt-6 font-thin text-[16px]">
                                    <span className="opacity-70">Dont have an account?</span> <span onClick={() => { setOpenSignInModel(false); setOpenSignUpModel(true) }} className="underline cursor-pointer text-light-blue font-[500] opacity-100">Sign Up</span>
                                </span>
                            </div>

                        </div>
                    </form>
                }

                {/* Register */}
                {openSignUpModel &&
                    <form onSubmit={registerUser}>
                        <div className="animate-[fadein_1s_forwards]">
                            <h2 className="text-center text-2xl font-[500]">Register</h2>
                            <div className="mt-5 mb-6">
                                <InputField type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                <div className="mt-[10px]">
                                <InputField type="password" minLength={8} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <PrimaryButton label="Continue" isDisabled={password.length < 8 && !email.length} />
                                <p className="text-center text-lg font-thin mt-[10px]">Or</p>
                                <button className="border py-3 rounded-[10px] border-neutral-800 mt-[10px]">
                                    <span className="flex gap-1 justify-center">
                                        <Image src={google_logo} alt="Google Icon" className="w-[26px] mr-3" />
                                        <p className="font-[500] text-lg">Signin with Google</p>
                                    </span>
                                </button>
                                <span className="text-center mt-6 font-thin text-[16px]">
                                    <span className="opacity-70">Already a user?</span> <span onClick={() => { setOpenSignInModel(true); setOpenSignUpModel(false) }} className="underline cursor-pointer text-light-blue font-[500] opacity-100">Sign In</span>
                                </span>
                            </div>
                        </div>
                    </form>
                }

                {openVerificationModel &&
                    <div className="animate-[fadein_1s_forwards]">
                        <div className="text-center">
                            <h2 className="font-bold text-xl">
                                Check your email
                            </h2>
                            <p className="text-sm font-thin mt-[10px] mb-6">
                                To continue, enter the code we just sent to dakshjoshi@gmail.com
                            </p>
                        </div>
                        <div className="">
                            <InputField type="text" />
                            <div className="mt-3">
                                <PrimaryButton label="Continue" />
                            </div>
                        </div>
                    </div>
                }
            </MahjongModel> : <></>}
        </React.Fragment>
    )
}