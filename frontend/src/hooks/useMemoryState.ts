import {Dispatch, SetStateAction, useCallback, useState} from "react";

const storage : Map<string, object> = new Map<string, object>()

export const useMemoryState = <S>(key: string, defaultValue: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
    const [state, setPureState] = useState(() => {
        const getDefault = () => defaultValue instanceof Function ? defaultValue() : defaultValue
        return storage.has(key) ? storage.get(key) as S : getDefault()
    })

    const setState: Dispatch<SetStateAction<S>> = useCallback((s : SetStateAction<S>) => {
        const val = s instanceof Function ? s(state) : s
        storage.set(key, val as any)
        setPureState(val)
    }, [key, state])

    return [state, setState]
}