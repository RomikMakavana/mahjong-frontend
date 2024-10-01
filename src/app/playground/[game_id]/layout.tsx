"use client"

import { AuthService } from "@/services/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const PlaygroundLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        isLoggedIn();
    }, [router])

    const isLoggedIn = async () => {
        setIsProcessing(true);
        const res = await AuthService.getProfile();
        
        if(res == false){
            router.replace('/');
        }else {
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