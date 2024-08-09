import { Header } from "@/components/header";
import React from "react";
import { HeroSection } from "@/components/heroSection";

export default function Home() {
  return (
    <div className=" text-white flex flex-col h-screen">
        <div className="invisible md:visible fixed top-0 left-0 shadow-headerShadowLeft"></div>
        <div className="invisible md:visible fixed top-0 right-0 shadow-headerShadowRight"></div>
      <div className="bg-black flex-1 ">
        <Header/>
        <div className="mt-[105px]">
          <HeroSection/>
        </div>
      </div>
    </div>
  );
}
