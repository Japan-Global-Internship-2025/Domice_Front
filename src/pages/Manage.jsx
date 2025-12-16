import styled from "styled-components";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import LeftBoxTitle from "../components/LeftBoxTitle";
import { UserContext } from "../services/UserContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100dvh;
    overflow: hidden;
`

const Main = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 0px 24px 60px 24px;
    background-color: #f9f9f9;
`;

const RoomListContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 40px;
    margin-bottom: 5px;
`;

const RoomList = styled.div`
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    width: 100%;
    overflow-y: auto;
    flex: 1; 

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 9px;
        background: rgba(0, 0, 0, 0.31); /* 스크롤바 색상 */
    }
    &::-webkit-scrollbar-track {
        background-color: #f1f1f1; /* 스크롤 트랙 색상 */
    }
`

const RoomBtn = styled.button`
    display: flex;
    padding: 30px 0;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 18px;
    border: 1px solid #48BFA2;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    color: #48BFA2;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 600;
    line-height: 22px; /* 110% */
`

export default function Manage() {
    const navigate = useNavigate();
    const { isTeacher, user, loading } = useContext(UserContext);
    const floor = user?.gender === 0 ? 5 : 4; // 0: 남자, 1: 여자
    const rooms = Array.from({ length: 18 }, (_, i) => i + 1).map(num => {
        const roomNumber = floor + String(num).padStart(2, '0');
        return roomNumber;
    });
    // console.log(rooms)

    // 2. 권한 체크 로직을 useEffect로 이동
    useEffect(() => {
        if (!user) return;

        if (!isTeacher) {
            alert("잘못된 접근입니다.");
            navigate("/");
        }
    }, [user, isTeacher, navigate]);

    return (
        <Container>
            <Header />
            <Main>
                <RoomListContainer>
                    <LeftBoxTitle text="호실 목록" />
                    <RoomList>
                        {rooms.map(room => (
                            <RoomBtn key={room} onClick={() => navigate(`/manage/room/${room}`)}>
                                {room}호
                            </RoomBtn>
                        ))}
                    </RoomList>
                </RoomListContainer>
            </Main>
            <Navigation idx={2} />
        </Container>
    )
};
