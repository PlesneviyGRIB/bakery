import {FC} from "react";
import {Popover} from "../../widgets/Popover";
import {Styled as S} from "./User.styled"
import {Icon} from "../../widgets/Icon";
import {useNavigate} from "react-router-dom";

interface UserMenuProps {

}

export const UserMenu: FC<UserMenuProps> = ({}) => {
    const navigation = useNavigate()
    return (
        <>
            <Popover target={<b>Savchenko Egor</b>} placement={'bottom-end'} interaction={'hover'}>
                <S.UserMenu >
                    <S.UserMenuLi>Избранное <Icon img={"heart"}/></S.UserMenuLi>
                    <S.UserMenuLi>Мои продукты</S.UserMenuLi>
                    <S.UserMenuLi onClick={() => navigation("/login")}>Выход <Icon img={"logout"}/></S.UserMenuLi>
                </S.UserMenu >
            </Popover>
        </>
    )
}