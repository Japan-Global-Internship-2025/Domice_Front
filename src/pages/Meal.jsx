import styled from "styled-components";
import { useState, useEffect } from "react";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import MealToday from "./MealToday";
import MealMonth from "./MealMonth";
import { generateCalendar } from "../services/DateFormat";

const Container = styled.div`
    height: 100vh;
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
    padding: 48px 0px 60px 0px;
    background-color: #f9f9f9;
`;

const NavList = [
    { value: '오늘의 급식', idx: 0, left: "25%" },
    { value: '이번달 급식표', idx: 1, left: "75%" }
]

export default function MealInfo() {
    const [navMenu, setNavMenu] = useState(0);
    

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
                {navMenu == 0 ? <MealToday /> : <MealMonth calendar={generateCalendar()} />}
            </Main>
            <Navigation idx={2} />
        </Container>
    )
}