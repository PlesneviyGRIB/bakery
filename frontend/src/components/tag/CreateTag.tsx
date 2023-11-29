import React, {createRef, FC, useCallback} from "react";
import {Btn} from "../../widgets/default/Btn";
import {Icon} from "../../widgets/Icon";
import {useDialogState} from "../../hooks/useDialogState";
import {Input} from "../../widgets/default/Form";
import {FlexRow} from "../../widgets/default/Flex.styled";
import {restClient} from "../../api/axios.conf";
import {useOutsideClick} from "../../hooks/useOutsideClick";

interface CreateTagsProps {
    onCreate(): void
}

export const CreateTags: FC<CreateTagsProps> = ({onCreate}) => {
    const [state, open, close] = useDialogState<string>()
    const ref = createRef<HTMLDivElement>()

    useOutsideClick(ref, close)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => open(e.target.value),[open])
    const handleCreate = useCallback(() => {
        const title = close() as string
        console.log(title)
        restClient.newTag({title}).then(onCreate)
    }, [close])

    const handleEnter = useCallback((e: React.KeyboardEvent) => e.key === "Enter" && handleCreate(),[handleCreate])

    return (
        state !== undefined ?
            <FlexRow ref={ref}>
                <Input value={state} onChange={handleChange} placeholder={"Введите тег"} onKeyDown={handleEnter} autoFocus/>
                <Btn success outline onClick={handleCreate}><Icon img={"checked"} size={"24px"} coloring={"fill"}/></Btn>
                <Btn info outline onClick={() => open(undefined)}><Icon img={"cross"}/></Btn>
            </FlexRow>
            : <Btn info outline onClick={() => open("")}><Icon img={"plus"}/>Создать тег</Btn>
    )
}