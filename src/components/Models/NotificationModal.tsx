import UserProfile from '@/assets/images/svg/user_profile.svg';
import LineImage from '@/assets/images/svg/line.svg';
import Image from 'next/image';
import { ReactNode } from 'react';
import IconClose from '@/assets/images/svg/close.svg';

interface Props {
    children: ReactNode;
    closeModel: () => void;
}


const NotificationModal = (props: Props) => {
    const { children, closeModel } = props;
    return <>
        <div className="z-50 absolute bg-[#131313] bottom-8 right-5 text-white rounded-xl border border-[#ffffff29] border-opacity-[84] drop-shadow-notification-block-shadow">

            <div className=' w-[356px] my-[21px] mx-[26px] relative'>
                <button onClick={closeModel} className='absolute -right-4 -top-2'><Image src={IconClose} alt='Close Button' width={14} height={14}/></button>
                {children}
                {/* <div className='flex mb-[15px]'>

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


                </div> */}

            </div>

        </div>
    </>
}

export default NotificationModal;