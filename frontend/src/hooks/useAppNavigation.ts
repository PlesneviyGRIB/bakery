import {useCallback} from "react";
import {PagePath} from "../types";
import {useNavigate} from "react-router-dom";

export const useAppNavigation = () => {
    const navigateTo = useNavigate()
    return useCallback((path: PagePath) => navigateTo(path), [navigateTo])
}