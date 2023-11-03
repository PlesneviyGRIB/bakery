import React, {Children, FC, PropsWithChildren, ReactElement, useEffect, useState} from "react";
import {Styled as S} from "./Tabs.styled";

interface TabsProps {

}

type Child = {child?: ReactElement, index: number}

export const Tabs: FC<PropsWithChildren<TabsProps>> = ({children}) => {
    const [child, setChild] = useState<Child>({index: 0})
    const [myChildren, setMyChildren] = useState<ReactElement[]>([])

    useEffect(() => {
        const arr = Children.toArray(children) as ReactElement[]
        setMyChildren(arr)
        setChild(prevState => ({...prevState, child:arr[prevState.index]}))
    }, [children])

    return (
        child ?
            <S.Tabs>
                <S.Bookmarks>
                    {myChildren.map((c, index) =>
                        <S.Bookmark key={index} $selected={c === child.child} onClick={() => setChild({child: c, index})} $title={c.props.title}/>
                    )}
                </S.Bookmarks>
                {child.child}
            </S.Tabs>
            : <></>
    )
}