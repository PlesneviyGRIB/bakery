import React, {FC} from "react";
import {Styled as S} from "./pages.styled";
import {FlexColumn, FlexRow} from "../widgets/default/Flex.styled";
import {FormGroup, FormLabel, Input} from "../widgets/default/Form";
import {Btn} from "../widgets/default/Btn";
import {useNavigate} from "react-router-dom";
import p from "../ui/pictures/pretzel_tmp.svg"
export const LoginPage: FC = () => {
    const navigation = useNavigate()

    return (
        <>
            <S.Header>

            </S.Header>
            <S.Body style={{
                backgroundImage: `url(${p})`,
                backgroundRepeat: "space space  ",
                backgroundSize: "1.2%",
            }}>
                <FlexRow style={{height: "100%", justifyContent: "center"}}>
                    <S.Block style={{
                        height: "500px",
                        width: "500px",
                        boxShadow: "0 0 10px 2px rgba(0,0,0,.2)",
                        transform: "translateY(-40px)",
                        padding: "50px 30px"
                    }}>
                        <FlexColumn style={{height: "100%", gap: "1em", marginTop: "30px"}}>
                            <FlexRow $justifyContent={"center"}><h4>Регистрация</h4></FlexRow>
                            <div>
                                <FormGroup>
                                    <FormLabel>Login</FormLabel>
                                    <Input/>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Password</FormLabel>
                                    <Input type={"password"}/>
                                </FormGroup>
                            </div>
                            <FlexColumn style={{marginTop: "20px"}}>
                                <FlexRow $justifyContent={"center"}>
                                    <Btn warning outline style={{width: "95%"}} onClick={() => navigation("/products")}>Войти</Btn>
                                </FlexRow>
                                <FlexRow $justifyContent={"center"}>
                                    <Btn style={{fontSize: "14px"}} link>Создать кабинет</Btn>
                                    <Btn style={{fontSize: "14px"}} link>Забыли пароль?</Btn>
                                </FlexRow>
                            </FlexColumn>
                        </FlexColumn>
                    </S.Block>
                </FlexRow>
            </S.Body>
        </>
    )
}