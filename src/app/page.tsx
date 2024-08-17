"use client"

import { HeaderBlock } from "@/components/landingPage/HeaderBlock";
import React, { useEffect, useState } from "react";
import { MainSection } from "@/components/landingPage/MainSection";
import { ClaimFreePoints } from "@/components/landingPage/ClaimFreePoints";
import { TournamentAndLeaderBoard } from "@/components/landingPage/TournamentAndLeaderBoard";
import MahjongModel from "@/components/MahjongModel";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import google_logo from "@/assets/images/svg/google_logo.svg";
import Image from "next/image";
import { AuthService } from "@/services/firebase/auth";
import { useNotifications } from "@/utils";
import Notification from "@/components/NotificationComponent";
import { FeaturedTournaments } from "@/components/landingPage/FeaturedTournaments";

export default function Home() {

    const [openSignInModel, setOpenSignInModel] = useState(false);
    const [openSignUpModel, setOpenSignUpModel] = useState(false);
    const [openVerificationModel, setOpenVerificationModel] = useState(false);
    const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPasswordResetLinkSent, setIsPasswordResetLinkSent] = useState(false)

    const { notification } = useNotifications();

    const openRegisterModal = () => {
        setEmail('');
        setPassword('');
        setOpenSignInModel(false);
        setOpenSignUpModel(true);
    }

    const openLoginModal = () => {
        setEmail('');
        setPassword('');
        setOpenSignInModel(true);
        setOpenSignUpModel(false)
    }

    const openResetPasswordModal = () => {
        setEmail('');
        setPassword('');
        setOpenSignInModel(false);
        setOpenForgotPasswordModal(true);
    }


    const closeModal = () => {
        setEmail('');
        setPassword('');
        setOpenSignInModel(false);
        setOpenSignUpModel(false);
        setOpenVerificationModel(false);
        setOpenForgotPasswordModal(false);
        setIsPasswordResetLinkSent(false);
    }

    const loginWithGoogle = async (e: React.MouseEvent) => {
        e.stopPropagation()
        try {
            const res = await AuthService.googleSignIn()
            if (res.status) {
                closeModal();
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const registerUser = async (e: any) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const res = await AuthService.createUser(email, password);
            if (res.status) {
                setIsProcessing(false);
                setOpenSignUpModel(false);
                sendEmailVerificationLink();
            } else {
                setIsProcessing(false);
                if (res.message === 'auth/email-already-in-use') {
                    console.log('');
                    notification("Email is already in use.", 'error');
                } else {
                    console.log('something went wrong');
                    notification("something went wrong", 'error');
                }
            }
        } catch (error) {
            setIsProcessing(false);
            notification("something went wrong", 'error');
            console.log(error);

        }
    }

    const login = async (e: any) => {
        e.preventDefault()
        setIsProcessing(true);
        try {
            const res = await AuthService.login(email, password);
            setIsProcessing(false);
            if (res.status && res.isVerifiedEmail) {
                closeModal();
                setIsLoggedIn(true);
                notification("Logged in successfully.", 'success');
            } else if (res.status && !res.isVerifiedEmail) {
                setOpenSignInModel(false);
                setOpenSignUpModel(false);
                sendEmailVerificationLink();
            } else if (!res.status && res.message === 'auth/invalid-credential') {
                console.log('invalid credential');
                notification("Invalid credential.", 'error');

            } else {
                console.log('something went wrong');
                notification("something went wrong", 'error');
            }
        } catch (error) {
            setIsProcessing(false);
            notification("something went wrong", 'error');
            console.log(error);
        }
    }

    const sendEmailVerificationLink = async () => {
        try {
            const res = await AuthService.sendEmailVerificationLink();
            if (res) {
                setOpenVerificationModel(true);
            } else {
                console.log('something went wrong.');
                notification("something went wrong", 'error');

            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkIsLoggedIn();
    }, []);

    const sendPasswordResetLink = async (e: any) => {
        e.preventDefault();
        if (email.trim().length) {
            setIsProcessing(true);
            try {
                const res = await AuthService.sendResetPasswordLink(email)
                if (res.status) {
                    setIsProcessing(false);
                    setIsPasswordResetLinkSent(true);
                } else {
                    setIsProcessing(false);
                    notification(res.message, 'error');
                }
            } catch (error) {
                console.log(error);
                notification("something went wrong", 'error');

            }
        }
    }

    const checkIsLoggedIn = async () => {
        try {
            const res = await AuthService.getProfile();
            if (!res) {
                setIsLoggedIn(false);
            } else {
                if (!res.emailVerified) {
                    sendEmailVerificationLink();
                }
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const startNewGame = () => {
        if (!isLoggedIn) {
            setOpenSignInModel(true);
        } else {

        }
    }

    return (
        <React.Fragment>
            <div className=" text-white flex flex-col h-screen">
                <div className="bg-black flex-1 ">
                    <HeaderBlock
                        startNewGame={startNewGame}
                        sendEmailVerificationLink={sendEmailVerificationLink}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                    />

                    <div className="mt-20 sm:mt-[124px] md:mt-[105px]">
                        <ClaimFreePoints />
                        <MainSection startNewGame={startNewGame} />
                        <TournamentAndLeaderBoard />
                        <FeaturedTournaments/>
                    </div>
                </div>
            </div>

            {openSignInModel || openSignUpModel || openVerificationModel || openForgotPasswordModal ? <MahjongModel width="363px" showCloseBtn={openVerificationModel || isProcessing ? false : true} closeModalWhenOutsideClick={openVerificationModel || isProcessing ? false : true} closeModel={closeModal} >
                {/* Sign In Pop up */}
                {openSignInModel &&
                    <form onSubmit={login}>
                        <div className="animate-[fadein_1s_forwards] text-white">
                            <h2 className="text-center text-2xl font-[500]">Sign In</h2>
                            <div className="mt-5 mb-6 flex flex-col gap-[10px]">
                                <InputField type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                <InputField type="password" minLength={8} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                                <button onClick={openResetPasswordModal} type="button" className="text-right text-sm font-[500px] underline text-white opacity-70">Forgot password</button>
                            </div>
                            <div className="flex flex-col">
                                <PrimaryButton label={isProcessing ? 'Processing ...' : 'Continue'} isDisabled={password.length < 8 || !email.length || isProcessing} />
                                <p className="text-center text-lg font-thin mt-[10px]">Or</p>
                                <button type="button" onClick={loginWithGoogle} className="border py-3 rounded-[10px] border-neutral-800 mt-[10px]">
                                    <span className="flex gap-1 justify-center">
                                        <Image src={google_logo} alt="Google Icon" className="w-[26px] mr-3" />
                                        <p className="font-[500] text-lg">Signin with Google</p>
                                    </span>
                                </button>
                                <span className="text-center mt-6 font-thin text-[16px]">
                                    <span className="opacity-70">Dont have an account?</span> <span onClick={openRegisterModal} className="underline cursor-pointer text-light-blue font-[500] opacity-100">Sign Up</span>
                                </span>
                            </div>

                        </div>
                    </form>
                }

                {/* Register */}
                {openSignUpModel &&
                    <form onSubmit={registerUser}>
                        <div className="animate-[fadein_1s_forwards] text-white">
                            <h2 className="text-center text-2xl font-[500]">Register</h2>
                            <div className="mt-5 mb-6">
                                <InputField type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                <div className="mt-[10px]">
                                    <InputField type="password" minLength={8} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <PrimaryButton label={isProcessing ? 'Processing ...' : 'Continue'} isDisabled={password.length < 8 || !email.length || isProcessing} />
                                <p className="text-center text-lg font-thin mt-[10px]">Or</p>
                                <button className="border py-3 rounded-[10px] border-neutral-800 mt-[10px]">
                                    <span className="flex gap-1 justify-center">
                                        <Image src={google_logo} alt="Google Icon" className="w-[26px] mr-3" />
                                        <p className="font-[500] text-lg">Signin with Google</p>
                                    </span>
                                </button>
                                <span className="text-center mt-6 font-thin text-[16px]">
                                    <span className="opacity-70">Already a user?</span> <span onClick={openLoginModal} className="underline cursor-pointer text-light-blue font-[500] opacity-100">Sign In</span>
                                </span>
                            </div>
                        </div>
                    </form>
                }

                {openVerificationModel &&
                    <div className="animate-[fadein_1s_forwards] text-white">
                        <div className="text-center">
                            <h2 className="font-bold text-xl">
                                Check your email
                            </h2>
                            <p className="text-lg text-center font-thin mt-[10px] mb-6">
                                {`We've sent a verification link to ${email}. Please check your email to verify your account.`}
                            </p>
                        </div>
                    </div>
                }

                {/**Forgot Password */}
                {openForgotPasswordModal &&
                    <div className="animate-[fadein_1s_forwards] text-white">
                        <div className="text-center">
                            <h2 className="font-bold text-xl">
                                Forgot password
                            </h2>
                        </div>
                        {
                            !isPasswordResetLinkSent ?
                                <form onSubmit={sendPasswordResetLink} className="mt-5">
                                    <InputField type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                    <div className="mt-3">
                                        <PrimaryButton label={isProcessing ? 'Processing ...' : 'Continue'} isDisabled={!email.length || isProcessing} />
                                    </div>
                                </form>
                                :
                                <p className="text-lg font-thin text-center mt-[10px] mb-6">{`We've sent a password reset link to ${email}. Please check your inbox to continue.`} </p>
                        }
                    </div>

                }
            </MahjongModel> : <></>}
            <Notification />
        </React.Fragment>
    );
}
