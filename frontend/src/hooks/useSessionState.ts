import {Dispatch, SetStateAction, useCallback, useState} from "react";

export const useSessionState = <S>(key: string, defaultValue: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
    const [state, setPureState] = useState(() => {
        const getDefault = () => defaultValue instanceof Function ? defaultValue() : defaultValue
        const s = sessionStorage.getItem(key)
        let val : S
        if(s){
            try {
                val = JSON.parse(s)
            } catch (e){
                val = getDefault()
            }
        } else {
            val = getDefault()
        }
        return val
    })

    const setState: Dispatch<SetStateAction<S>> = useCallback((s : SetStateAction<S>) => {
        const val = s instanceof Function ? s(state) : s
        sessionStorage.setItem(key, JSON.stringify(val))
        setPureState(val)
    }, [key, state])

    return [state, setState]
}