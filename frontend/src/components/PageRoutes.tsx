import {CSSProperties, FC} from "react";
import {FlexRow} from "../widgets/default/Flex.styled";
import {Link, PathMatch, useMatch} from "react-router-dom";
import {PagePath} from "../types";

interface PageRoutesProps {
}

function styles(target : null | PathMatch) : CSSProperties {
    const current = target && target.pattern.end
    return {
        color: "var(--color-deep-dark-gray)",
        textDecoration: current ? "underline" : "initial"
    }
}

export const PageRoutes: FC<PageRoutesProps> = ({}) => {
    const productPage = useMatch(PagePath.PRODUCTS)
    const adminPage = useMatch(PagePath.ADMIN)

    return(
        <FlexRow>
            <Link to={PagePath.PRODUCTS} style={styles(productPage)}>Товары</Link>
            <Link to={PagePath.ADMIN} style={styles(adminPage)}>Админ</Link>
        </FlexRow>
    )
}