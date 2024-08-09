import Image from "next/image"

export const HeroSection = () => {
    return (
        <div className="max-w-screen-2xl  mx-auto px-4 xs:px-[30px] md:px-[50px]   pb-7 w-full">
            <div className="bg-hero-section-bg-desktop pl-[30px] pt-[26px]  flex  bg-cover bg-no-repeat rounded-[14px]  w-full">
                <div className="w-8/12 lg:w-3/4 pb-[34px] max-md:pr-11">
                    <p className="m-0 text-white font-normal tracking-[.25rem] mb-2 uppercase">COMPETE AND WIN A</p>
                    <Image src="/images/new_iphone_15_pro.avif" alt="Iphone image" width={465} height={61} className="hidden md:block" />
                    <Image src="/images/new_iphone_15_pro.avif" alt="Iphone image" width={359} height={47} className="md:hidden" />
                    
                    <p className="mt-6 bg-brand-aqua w-fit mb-0 text-base font-black text-black tracking-[.19rem]">1 SEP - 15 SEP</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-[26px]">
                        <p className="text-brand-aqua flex-1 max-sm:order-last text-base font-bold underline">Register before 15th AUG</p>
                        <p className="uppercase text-white flex-1 text-left lg:text-right font-bold text-xs md:text-base">*Only first 200 registrations can pariticpate</p>
                    </div>
                </div>
                <div className="w-4/12 lg:w-1/4  relative">
                <Image src="/images/iphone.avif" alt="Iphone image" width={289} height={270} className="absolute min-w-[160px] min-h-[148px] sm:min-w-[250px] sm:min-h-[230px] lg:min-w-0 lg:min-h-0  right-0 bottom-0" />
                </div>

            </div>
        </div>
    )
}