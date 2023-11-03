import {useCallback, useState} from "react";

export const useDialog = (initialState?: boolean | (() => boolean)) : [boolean, () => void, () => void] => {
    const [opened, setOpened] = useState<boolean>(initialState || false)
    const open = useCallback(() => setOpened(true), [])
    const close = useCallback(() => setOpened(false), [])
    return [opened, open, close]
}

export const useDialogState = <S>(initialState?: S | (() => S)) : [S | undefined, (state : S | undefined) => void, () => S | undefined] => {
    const [opened, setOpened] = useState<S | undefined>(initialState)
    const open = useCallback((state? : S) => setOpened(state), [])
    const close = useCallback(() => {
        setOpened(undefined)
        return opened
    }, [opened])
    return [opened, open, close]
}