import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {restClient} from "../../api/axios.conf";
import {CreateTags} from "./CreateTag";
import {TagDto} from "../../api/rest-client";
import {Styled as S} from "./Tag.styled"
import {Btn} from "../../widgets/default/Btn";
import {FlexColumn} from "../../widgets/default/Flex.styled";
import {Icon} from "../../widgets/Icon";


interface TagsProps {
    selectedIds: number[]
    mode?: 'select' | 'selectImmediate' | 'edit'
    limit?: number

    onChange(ids: number[]): void
}

export const Tags: FC<TagsProps> = ({selectedIds, mode = 'select', limit, onChange}) => {
    const [tags, setTags] = useState<TagDto[]>([])
    const [currentIds, setCurrentIds] = useState<number[]>(selectedIds)

    const fetchTags = useCallback(() => {
        restClient.tags().then(setTags)
    }, [])

    useEffect(() => {
        fetchTags()
    }, []);

    const tagIdsSet = useMemo(() => new Set(currentIds), [currentIds])
    const handleClick = useCallback((id: number) => {
        if (mode === 'edit') {
            return
        }
        const func = (prevState: number[]) => (prevState.includes(id) ? [...prevState.filter(e => e !== id)] : [...prevState, id]).slice(limit && -limit)
        if (mode === 'selectImmediate') {
            const ids = func(selectedIds)
            onChange(ids)
            setCurrentIds(ids)
        } else {
            setCurrentIds(prevState => func(prevState))
        }
    }, [mode, onChange, selectedIds, limit])

    const canApply = useMemo(() => {
        const set = new Set(currentIds)
        return selectedIds.length !== set.size || selectedIds.some(id => !set.has(id))
    }, [selectedIds, currentIds])

    const handleDiscard = useCallback(() => {
        setCurrentIds([])
        mode === 'selectImmediate' && onChange([])
    }, [mode])
    const handleApply = useCallback(() => onChange(currentIds), [currentIds])
    const handleDelete = useCallback((id: number) => restClient.deleteTag(id).then(fetchTags), [fetchTags])

    return (
        <FlexColumn>
            <S.TagCloud>
                {tags.map(t =>
                    <S.Tag key={t.id} $selected={tagIdsSet.has(t.id)} $edit={mode === 'edit'}
                           onClick={() => handleClick(t.id)}>
                        {t.title}
                        <Icon img={"cross"} size={"18px"} onClick={() => handleDelete(t.id)}/>
                    </S.Tag>)}
            </S.TagCloud>
            {mode !== 'edit' ?
                tags.length > 0 ?
                    <S.Buttons>
                        <Btn link disabled={!currentIds.length} style={{boxShadow: "none"}}
                             onClick={handleDiscard}>Очистить</Btn>
                        {mode === 'select' &&
                            <Btn link disabled={!canApply} style={{boxShadow: "none"}}
                                 onClick={handleApply}>Применить</Btn>}
                    </S.Buttons>
                    : null
                : <CreateTags onCreate={fetchTags}/>
            }
        </FlexColumn>
    )
}