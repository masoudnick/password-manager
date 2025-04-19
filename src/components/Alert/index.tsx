import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";


type AlertProps = {
    message: string;
    timeOut?: number;
}

const Alert = ({message, timeOut = 2000}: AlertProps) =>{
    const [showAlert, setShowAlert] = useState<boolean>(true);
    const alertRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if (showAlert) {
            const timer = setTimeout(()=>{
                setShowAlert(false);
                setTimeout(() => alertRef.current?.remove(), 500);
            }, timeOut);
            return () => clearTimeout(timer);
        }
        
    }, [showAlert, timeOut])
    if (message === "") return null
    return ReactDOM.createPortal( 
    <div className={clsx("rounded-md p-4 fixed top-5 right-1/2 w-80 translate-x-1/2 flex items-center justify-center bg-white/40 z-10 transition-all duration-400 ease-in-out", showAlert ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0")} ref={alertRef}>
        {message}
    </div>, 
    document.body)
}


export { Alert };
export type { AlertProps };
