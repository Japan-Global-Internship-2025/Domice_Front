import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import home from "../assets/icon/home.svg?react";
import notice from "../assets/icon/notice.svg?react";
import meal from "../assets/icon/meal.svg?react";
import board from "../assets/icon/board.svg?react"; 
import mypage from "../assets/icon/user.svg?react";

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed; 
    bottom: 0; 
    left: 0;
    right: 0;
    z-index: 1000;
    padding-top: 10px;
    background-color: #fff;
`;

const InnerBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    align-self: stretch;
`;

const Menu = styled.div`
    display: flex;
    width: 56px;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 2px;

    svg {
        width: 20px;
        height: 20px;
        
        path {
            fill: rgb(64, 64, 64);
            fill-opacity: ${props => props.$active ? 1 : 0.32};
            transition: fill-opacity 0.2s ease-in-out;
        }
    }

    p {
        color: ${props => props.$active ? 'rgba(64, 64, 64, 1)' : 'rgba(64, 64, 64, 0.32)'};
        transition: color 0.2s ease-in-out;
    }
`;

const Label = styled.p`
    color: rgba(64, 64, 64, 0.32);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`;

const list = [
    { img: home, value: "홈", idx: 0, link: "/home" },
    { img: notice, value: "공지", idx: 1, link: "/notice" },
    { img: meal, value: "급식정보", idx: 2, link: "/meal" },
    { img: board, value: "게시판", idx: 3, link: "/board" },
    { img: mypage, value: "마이페이지", idx: 4, link: "/mypage" },
]

export default function Navigation(props) {
    const navigate = useNavigate();
    return (
        <Container>
            <InnerBox>
                {list.map((item, idx) => {
                    const IconComponent = item.img; 
                    const isActive = idx === props.idx;

                    return (
                        <Menu key={idx} $active={isActive} onClick={() => {navigate(item.link)}}>
                            <IconComponent /> 
                            <Label>{item.value}</Label>
                        </Menu>
                    )
                })}
            </InnerBox>
        </Container>
    )
}   