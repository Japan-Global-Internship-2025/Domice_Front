import styled from "styled-components";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import RoomInfo from "../components/RoomInfo";
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
    padding: 0px 14px 60px 14px;
    background-color: #f9f9f9;
    display: flex; 
    flex-direction: column; 
    overflow: hidden;
`;

const RoomManageContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const RoomNumberWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`

const RoomNumberBox = styled.div`
    display: inline-flex;
    padding: 10px 18px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 46px;
    background: #48BFA2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    color: #FFF;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 600;
    line-height: 22px; /* 110% */
`

const StudentListBox = styled.div`
    flex-grow: 1;
    margin-top: 30px;
    overflow-y: auto;
    padding: 10px; 
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const GiveScoreBox = styled.div`
    padding: 0px 10px;
    display: flex;
    gap: 10px;
    margin-top: 12px;
    margin-bottom: 24px;
`;

const GiveScoreBtn = styled.button`
    flex-grow: 1;
    display: flex;
    padding: 10px;
    flex-direction: column;
    border-radius: 14px;
    border: 1px solid #48BFA2;
    background: ${props => props.$background};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    color: ${props => props.$color};
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
`

export default function ManageRoom() {
    const navigate = useNavigate();
    const { isTeacher, user, loading } = useContext(UserContext);
    const [students, setStudents] = useState([]);
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const roomId = Number(segments[segments.length - 1]);

    useEffect(() => {
        if ((roomId < 401 || roomId > 418) && (roomId < 501 || roomId > 518)) {
            alert("존재하지 않는 호실입니다.");
            navigate("/manage");
        }
    }, [roomId, navigate]);

    useEffect(() => {
        if (!user) return;

        if (!isTeacher) {
            alert("잘못된 접근입니다.");
            navigate("/");
        }
    }, [user, isTeacher, navigate]);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const SERVER_URL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(`${SERVER_URL}/api/admin/rooms/${roomId}/students`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const result = await response.json();
                const data = result.data;
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
                alert("학생 목록을 불러오는 중 오류가 발생했습니다.");
            }
        }
        fetchStudents();
    }, []);

    return (
        <Container>
            <Header />
            <Main>
                <RoomManageContainer>
                    <RoomNumberWrapper>
                        <RoomNumberBox>
                            {roomId}호
                        </RoomNumberBox>
                    </RoomNumberWrapper>
                    <StudentListBox>
                        {students.map((student, idx) => (
                            <RoomInfo student={student} key={idx} />
                        ))}
                    </StudentListBox>
                    <GiveScoreBox>
                        <GiveScoreBtn $background={"#fff"} $color={"#48BFA2"} onClick={() => navigate(`/manage/room/${roomId}/score?type=plus`)}>
                            상점주기
                        </GiveScoreBtn>
                        <GiveScoreBtn $background={"#48BFA2"} $color={"#fff"} onClick={() => navigate(`/manage/room/${roomId}/score?type=minus`)}>
                            벌점주기
                        </GiveScoreBtn>
                    </GiveScoreBox>
                </RoomManageContainer>
            </Main>
            <Navigation idx={2} />
        </Container>
    )
};
