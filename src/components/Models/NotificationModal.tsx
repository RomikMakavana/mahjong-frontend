import UserProfile from '@/assets/images/svg/user_profile.svg';
import LineImage from '@/assets/images/svg/line.svg';
import Image from 'next/image';


export default function NotificationModal() {
    return <>
        <div className="z-50 absolute bg-[#131313] bottom-8 right-5 text-white rounded-xl border border-[#FFFFFF] border-opacity-[84]">

            <div className=' w-[356px] my-[21px] mx-[26px] '>

                <div className='flex mb-[15px]'>

                <Image src={UserProfile} alt="Logo Image" priority className="z-10 w-[34px] h-[34px] bg-[#080C23]   border border-[#60F8F8]  rounded-full" />
                
                <p className="text-white items-center text-sm m-[10px] mr-0">dakshjoshi66758</p>

                <p className="text-white items-center text-sm m-[10px] mr-0">wants to join the game</p>

                </div>

                <div>

                <Image src={LineImage} alt="Line" priority className="z-10 w-full bg-[#080C23] h-auto " />
             
                </div>

                <div className='flex w-full mt-[15px] mb-[21px]'>

                    <button className='w-[95px] h-auto bg-[#DF0000] text-white text-center text-base m-[10px] py-[10px] px-4 rounded-[9px]'>Deny</button>

                    <button className='w-[95px] h-auto bg-[#5500DF] text-white text-base text-center m-[10px] mr-0 py-[10px] px-4 rounded-[9px]'>Approve</button>


                </div>
               
            </div>

        </div>
    </>
}