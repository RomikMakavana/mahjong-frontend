"use client"

import { Header } from "@/components/landingPage/header";
import React, { useState } from "react";
import { HeroSection } from "@/components/landingPage/heroSection";
import { ClaimFreePoints } from "@/components/landingPage/ClaimFreePoints";
import { TournamentAndLeaderBoard } from "@/components/landingPage/TournamentAndLeaderBoard";
import MahjongModel from "@/components/MahjongModel";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import google_logo from "@/assets/images/svg/google_logo.svg";
import Image from "next/image";

export default function Home() {

  const [openSignInModel, setOpenSignInModel] = useState(false);
  const [openSignUpModel, setOpenSignUpModel] = useState(false);

  return (
    <div className=" text-white flex flex-col h-screen">
      <div className="invisible md:visible fixed top-0 left-0 shadow-headerShadowLeft"></div>
      <div className="invisible md:visible fixed top-0 right-0 shadow-headerShadowRight"></div>
      <div className="bg-black flex-1 ">
        <Header />

        <div className="mt-20 sm:mt-[124px] md:mt-[105px]">
          <ClaimFreePoints />
          <HeroSection />
          <TournamentAndLeaderBoard />
        </div>
      </div>


      {openSignInModel == true || openSignUpModel == true ? <MahjongModel width="363px" >
        {/* Sign In Pop up */}
        {openSignInModel &&
          <div className="animate-[fadein_1s_forwards]">
            <h2 className="text-center text-2xl font-[500]">Sign In</h2>
            <div className="mt-5 mb-6 flex flex-col gap-[10px]">
              <InputField type="email" placeholder="Enter email" />
              <InputField type="password" placeholder="Enter Password" />
              <p className="text-right text-sm font-[500px] underline text-white opacity-70">Forgot password</p>
            </div>
            <div className="flex flex-col">
              <PrimaryButton label="Continue" />
              <p className="text-center text-lg font-thin mt-[10px]">Or</p>
              <button className="border py-3 rounded-[10px] border-neutral-800 mt-[10px]">
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
        }

        {/* Register */}
        {openSignUpModel &&
          <div className="animate-[fadein_1s_forwards]">
            <h2 className="text-center text-2xl font-[500]">Register</h2>
            <div className="mt-5 mb-6">
              <InputField type="email" placeholder="Enter email" />
            </div>
            <div className="flex flex-col">
              <PrimaryButton label="Continue" />
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
        }
      </MahjongModel> : <></> }
    </div>
  );
}
