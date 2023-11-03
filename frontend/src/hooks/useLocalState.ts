import {Dispatch, SetStateAction, useCallback, useState} from "react";

export const useLocalState = <S>(key: string, defaultValue: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
    const [state, setPureState] = useState(() => {
        const getDefault = () => defaultValue instanceof Function ? defaultValue() : defaultValue
        const s = localStorage.getItem(key)
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
        let val;
        if(s instanceof Function){
            val = s(state)
        } else {
            val = s
        }
        localStorage.setItem(key, JSON.stringify(val))
        setPureState(val)
    }, [key, state])

    return [state, setState]
}