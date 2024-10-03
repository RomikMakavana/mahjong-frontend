"use client"

import { AuthService } from "@/services/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import APIService from "@/services/firebase/api";

const PlaygroundLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        checkIsLoggedIn();
    }, [router])

    // const isLoggedIn = async () => {
    //     setIsProcessing(true);
    //     const res = await AuthService.getProfile();
        
    //     if(res == false){
    //         router.replace('/');
    //     }else {
    //         setIsProcessing(false);
    //     }
    // }

    const checkIsLoggedIn = async () => {
        setIsProcessing(true);
        try {
            const res = await APIService.getProfile();
            if (res) {
                
                AuthService.user = res.firebaseUser;
                APIService.user = res;
                setIsProcessing(false);
            } else {
                router.replace('/');
                AuthService.logout();
                setIsProcessing(false);
            }
        } catch (error) {
            console.log(error);
            AuthService.logout();
            setIsProcessing(false);

        }
    }

    return (
        <>
            {isProcessing ? <Loader /> : <>{children}</>}
        </>
    )

}

export default PlaygroundLayout