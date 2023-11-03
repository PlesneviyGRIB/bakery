import {FC, useMemo, useState} from "react";
import {Styled as S} from "./pages.styled";
import {Input, Select, Textarea} from "../widgets/default/Form";
import {Option} from "../types";

export const MainPage: FC = () => {

    const options = useMemo(() => [{id:1, title: "namasd sad sa dsasa dsa dsad ass da d asde 1"}, {id:2, title: "name 2"}, {id:3, title: "name 3"}], [])
    const [selected, setSelected] = useState<Option>()

    return (
        <>
            <S.Header>
                <S.Pretzel />
            </S.Header>
            <S.Body>
                {/*<ProductForm onSave={() => {}}/>*/}
                <Textarea />
                <Textarea />
                <Input />
                <Input />
                <Select options={options} onSelect={setSelected} selected={selected}/>

                {/*<BarList<ProductDto> list={products} perRow={4} onSelectItem={(id) => {*/}
                {/*}}/>*/}
            </S.Body>
        </>
    )
}