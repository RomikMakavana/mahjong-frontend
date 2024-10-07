import { isTablet, isMobile, } from 'react-device-detect';


export const helpers = {
    handleFullscreenAndLock: async () => {
        if (isMobile || isTablet) {
            try {

                // if (!document.fullscreenElement) {
                //     await document.documentElement.requestFullscreen();
                // }
                helpers.tournOnFullScreenMode();
                //@ts-ignore
                if ('orientation' in screen && typeof screen.orientation.lock === 'function') {
                    await (screen.orientation as any).lock('landscape-primary');
                    return { status: true, code: '' };
                } else {
                    return { status: false, code: 'notSupported' }
                }

            } catch (error) {
                if (error instanceof DOMException) {
                    switch (error.name) {
                        case 'NotAllowedError' || 'AbortError':
                            return { status: false, code: error.name };

                        default:
                            return { status: false, code: 'somethingWentWrong' }
                    }
                } else {
                    return { status: false, code: 'somethingWentWrong' }
                }
            }
        }
    },
    tournOnFullScreenMode: async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }
            return true
        } catch (error) {
            return false;
        }
    },
    isDeviceinFillscreenMode: () => {
        if(isMobile || isTablet) {
            return document.fullscreenElement ? true : false;
        }
    }
}