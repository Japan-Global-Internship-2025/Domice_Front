import styled from "styled-components";
import BoardBackBtn from "../assets/icon/board_back_btn.svg?react";

const Nav = styled.div`
    gap: 10px;
    background: #48BFA2;
    display: flex;
    align-items: flex-start;
    position: relative;
    padding: 16px;
    justify-content: center;
`;

const BackBtnWrapper = styled.div`
    position: absolute;
    left: 18px;
`;

const NavTitle = styled.div`
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
`

export default function BoardInNav(props) {
    return (
        <Nav>
            <BackBtnWrapper onClick={() => { window.history.back() }}>
                <BoardBackBtn />
            </BackBtnWrapper>
            <NavTitle>
                {props.title}
            </NavTitle>
        </Nav>
    )
};
