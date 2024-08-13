import { Header } from "@/components/landingPage/header";
import React from "react";
import { HeroSection } from "@/components/landingPage/heroSection";
import { ClaimFreePoints } from "@/components/landingPage/ClaimFreePoints";
import { TournamentAndLeaderBoard } from "@/components/landingPage/TournamentAndLeaderBoard";

export default function Home() {
  return (
    <div className=" text-white flex flex-col h-screen">
        <div className="invisible md:visible fixed top-0 left-0 shadow-headerShadowLeft"></div>
        <div className="invisible md:visible fixed top-0 right-0 shadow-headerShadowRight"></div>
      <div className="bg-black flex-1 ">
        <Header/>
        <div className="mt-20 sm:mt-[124px] md:mt-[105px]">
          <ClaimFreePoints/>
          <HeroSection/>
          <TournamentAndLeaderBoard/>
        </div>
      </div>
    </div>
  );
}
