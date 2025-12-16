import styled from "styled-components";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import HomeMain from "./HomeMain";
import HomeOut from "./HomeOut";
import { getMeal } from '../services/meal'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Content = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 0px 24px 60px 24px;
    background-color: #f9f9f9;
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
    transition: 0.2s ease-in-out;
`;

const NavList = [
    { value: '홈', idx: 0, left: "25%" },
    { value: '외출관리', idx: 1, left: "75%" }
]

export default function Home() {
    const [navMenu, setNavMenu] = useState(0);
    const [mealInfo, setMealInfo] = useState([["로딩중..."], ["로딩중..."], ["로딩중..."]]);
    const [outRequestData, setOutRequestData] = useState(null);
    const SERVER_URL = import.meta.env.VITE_SERVER_URL
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${SERVER_URL}/api/leave`, {
                method: 'GET',
                credentials: 'include'
            })
            const temp = await response.json()
            console.log(temp);
            setOutRequestData(temp.data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getMeal();
                const data = response.mealServiceDietInfo[1].row;
                const meals = [];
                data.forEach(row => {
                    const temp = [];
                    const info = row.DDISH_NM.split("<br/>");
                    info.forEach(item => {
                        const menu = item.split(" ")[0];
                        temp.push(menu);
                    });
                    meals.push(temp);
                });
                setMealInfo(meals);
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [])
    console.log(mealInfo);

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
            <Content>
                {navMenu == 0 ? <HomeMain meals={mealInfo} /> : <HomeOut outRequest={outRequestData}/>}
            </Content>
            <Navigation idx={0} />
        </Container>

    );
}