import React, {FC, useEffect, useState} from "react";

import {Dialog} from "../widgets/modal/Dialog";
import {APP_EVENT} from "../types";
import {useDialogState} from "../hooks/useDialogState";
import {ExceptionResultDto} from "../api/rest-client";
import {Loader} from "../widgets/Loader";

export const Interceptor: FC = () => {
    const [isPending, setIsPending] = useState<boolean>(false)
    const [state, open, close] = useDialogState<ExceptionResultDto>()

    useEffect(() => {
        const errorHandler = (event: Event) => {
            if (event instanceof CustomEvent<ExceptionResultDto>) {
                open((event as CustomEvent<ExceptionResultDto>).detail)
            }
        }
        const pendingHandler = (event: Event) => setIsPending((event as CustomEvent<boolean>).detail)

        document.addEventListener(APP_EVENT.INTERCEPTOR_ERROR, errorHandler)
        document.addEventListener(APP_EVENT.INTERCEPTOR_PENDING_STATUS, pendingHandler)
        return () => {
            document.removeEventListener(APP_EVENT.INTERCEPTOR_ERROR, errorHandler)
            document.removeEventListener(APP_EVENT.INTERCEPTOR_PENDING_STATUS, pendingHandler)
        }
    }, []);

    return (
        <>
            <Loader show={isPending} size={30} style={{position: "absolute", zIndex:500, top:0, left: "50%", transform: "translateX(-50%) translateY(-2px)", scale: "1 -1", backgroundColor: "#caedde"}}/>
            {
                state &&
                <Dialog onClose={close} onAccept={close} title={state.title} unmissable>
                    {state.message}
                </Dialog>
            }
        </>
    )
}