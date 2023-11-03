import React, {Children, FC, PropsWithChildren, ReactElement, useEffect, useState} from "react";
import {Styled as S} from "./Tabs.styled";
import {useSessionState} from "../../hooks/useSessionState";
export const Tabs: FC<PropsWithChildren> = ({ children}) => {
    const [tabIndex, setTabIndex] = useSessionState("Tabs", 0)
    const [myChildren, setMyChildren] = useState<ReactElement[]>([])
    const [child, setChild] = useState<ReactElement>()

    useEffect(() => {
        const arr = Children.toArray(children) as ReactElement[]
        setMyChildren(arr)
        setChild(arr[tabIndex])
    }, [children, tabIndex])

    return (
        <S.Tabs>
            <S.Bookmarks>
                {myChildren.map((c, index) =>
                    <S.Bookmark key={index} $selected={index === tabIndex} onClick={() => setTabIndex(index)} $title={c.props.title}/>
                )}
            </S.Bookmarks>
            {child}
        </S.Tabs>
    )
}