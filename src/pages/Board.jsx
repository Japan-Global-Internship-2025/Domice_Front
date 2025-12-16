import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import BoardMain from "./BoardMain";
import BoardAnonymous from "./BoardPrivate";
import BoardWriteIcon from "../assets/icon/board_write.svg?react";

const Container = styled.div`
    height: 100dvh; 
    display: flex;
    flex-direction: column;
`;

const Nav = styled.div`
    gap: 10px;
    background: #48BFA2;
    display: flex;
    align-items: flex-start;
    position: relative;
`;

const NavBtn = styled.div`
    padding: 16px 16px;
    width: 50%;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    color: #FFF;
    opacity: ${props => props.$isActive ? 1 : 0.64};
    position: relative;
`;

const SelectMenuLine = styled.div`
    position: absolute;
    left: ${props => props.$left};
    transform: translateX(-50%);
    bottom: 0;
    width: 144px;
    height: 3px;
    border-radius: 9px;
    background: #008263;
    transition: 0.1s ease-in-out;
`;

const Main = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 32px 24px 60px 24px;
    background-color: #f9f9f9;
    position: relative;
`;

const BoardWrite = styled.div`
    right: 24px;
    bottom: 74px;
    position: absolute;
`;

const NavList = [
    { value: '전체 게시판', idx: 0, left: "25%", type: "all"},
    { value: '1대1 문의', idx: 1, left: "75%", type: "private"}
]

export default function Board() {
    const [navMenu, setNavMenu] = useState(0);
    const navigate = useNavigate();
    return (
        <Container>
            <Header />
            <Nav>
                {NavList.map((item, idx) => {
                    return (
                        <NavBtn onClick={() => { setNavMenu(item.idx) }} $isActive={navMenu == item.idx} key={idx}>
                            {item.value}
                        </NavBtn>
                    );
                })}
                {<SelectMenuLine $left={NavList[navMenu].left} />}
            </Nav>
            <Main>
                {navMenu == 0 ? <BoardMain /> : <BoardAnonymous />}
                <BoardWrite onClick={() => {navigate('/board/write')}}>
                    <BoardWriteIcon/>
                </BoardWrite>
            </Main>
            <Navigation idx={3} />
        </Container>
    )
}