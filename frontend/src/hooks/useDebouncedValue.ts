import {useCallback, useEffect, useState} from "react";
import {debounce} from "../app/App";

export const useDebouncedValue = <V>(initial: V, handler: (value: V) => void, timeout?: number): [V, (value: V) => void] => {
    const [value, setValue] = useState<V>(initial)

    useEffect(() => {
        setValue(initial)
    }, [initial]);

    const handleDebounced = useCallback(debounce((value: V) => handler(value), timeout || 200), [handler])

    const setValueExternal = useCallback((value: V) => {
        setValue(value)
        handleDebounced(value)
    }, [handleDebounced])

    return [value, setValueExternal]
}