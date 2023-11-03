import React, {Children, FC, PropsWithChildren, ReactElement, useEffect, useState} from "react";
import {Styled as S} from "./Tabs.styled";

interface TabsProps {

}

export const Tabs: FC<PropsWithChildren<TabsProps>> = ({children}) => {
    const [child, setChild] = useState<ReactElement | undefined>(undefined)
    const [myChildren, setMyChildren] = useState<ReactElement[]>([])

    useEffect(() => {
        const arr = Children.toArray(children) as ReactElement[]
        setMyChildren(arr)
        if(child === undefined){
            setChild(arr[0])
        }
    }, [children])

    return (
        child ?
            <S.Tabs>
                <S.Bookmarks>
                    {myChildren.map((c, index) =>
                        <S.Bookmark key={index} $selected={c === child} onClick={() => setChild(c)} $title={c.props.title}/>
                    )}
                </S.Bookmarks>
                {child}
            </S.Tabs>
            : <></>
    )
}