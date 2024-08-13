import Image from "next/image";
import IconShoppingBag from "@/assets/images/svg/shopping-bag.svg";
import IconShuttle from '@/assets/images/svg/shuttle.svg';

export const HeroSection = () => {
    return (
        <div className="section-wrapper  w-full">
            <div className="bg-hero-section-bg-mobile xs:bg-hero-section-bg-tab  md:bg-hero-section-bg-desktop pl-[13px] xs:pl-[35px] md:pl-[30px] pt-[13px] xs:pt-6 md:pt-[26px]  flex  bg-cover bg-no-repeat rounded-[14px]  w-full">
                <div className="w-8/12 lg:w-3/4 pb-6 md:pb-[34px] md:pr-11 lg:pr-0">
                    <p className="m-0 text-white text-sm sm:text-base font-normal tracking-[.25rem] mb-2 uppercase">COMPETE AND WIN A</p>
                    <Image src="/images/new_iphone_15_pro.avif" alt="Iphone image" width={465} height={61} className="hidden md:block" />
                    <Image src="/images/new_iphone_15_pro.avif" alt="Iphone image" width={359} height={47} className="hidden sm:block md:hidden" />
                    <Image src="/images/new_iphone_15_pro.avif" alt="Iphone image" width={204} height={26} className="sm:hidden" />

                    <p className="mt-3 sm:mt-6 bg-brand-aqua w-fit mb-0 text-xs xs:text-sm md:text-base font-black text-black tracking-[.19rem]">1 SEP - 15 SEP</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-5 sm:mt-[49px] md:mt-[26px] max-xs:pr-12">
                        <p className="text-brand-aqua flex-1 max-sm:order-last text-xs xs:text-sm md:text-base font-bold underline max-xs:mt-2">Register before 15th AUG</p>
                        <p className="uppercase text-white flex-1 text-left lg:text-right font-bold text-[10px] xs:text-xs md:text-base">*Only first 200 registrations can pariticpate</p>
                    </div>
                </div>
                <div className="w-4/12 lg:w-1/4  relative">
                    <Image src="/images/iphone.avif" alt="Iphone image" width={289} height={270} className="absolute min-w-[160px] min-h-[148px] sm:min-w-[250px] sm:min-h-[230px] lg:min-w-0 lg:min-h-0  right-0 bottom-0" />
                </div>
            </div>
            <div className=" md:hidden  flex flex-col xs:flex-row">
                <button className="flex flex-1 justify-center items-center mt-[10px] xs:mt-4 border border-brand-purple rounded-lg py-[14px] xs:py-3 px-6 xs:mr-3">
                    <Image src={IconShoppingBag} alt="Icon Marketplace" className="mr-[10px]" />
                    <span className="btn-text">Marketplace</span>
                </button>
                <button className="flex flex-1 justify-center items-center mt-[10px] xs:mt-4 max-xs:order-first rounded-lg bg-brand-blue px-5 py-[14px] xs:py-3">
                    <Image src={IconShuttle} alt="Icon Start Game" className="mr-[10px]" />
                    <span className="btn-text">Start New Game</span>
                </button>
            </div>
        </div>
    )
}