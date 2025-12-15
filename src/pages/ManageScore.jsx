import styled from "styled-components";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import CheckedIcon from "../assets/icon/student_check_round.svg?react";
import UnCheckedIcon from "../assets/icon/student_uncheck_round.svg?react";
import { UserContext } from "../services/UserContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ScoreModal from "../components/ScoreModal";

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

const StudentContentBox = styled.div`
    border-radius: 14px;
    display: flex;
    padding: 14px;
    align-items: center;
    gap: 14px;
    align-self: stretch;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 14px;
    background: #FFF;
    border: 1px solid ${props => props.$isSelected ? '#48BFA2' : 'transparent'};
`;

const StudentProfileImgBox = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 34px;
    background: #484848;
`;

const StudentProfileImg = styled.img`
    border-radius: 34px;
    object-fit: cover;
    width: 100%;
`;

const StudentName = styled.p`
    flex: 1;
    color: #404040;
    text-align: left;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
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

const StudentCheckbox = styled.div``;

export default function ManageScore() {
    const navigate = useNavigate();
    const { isTeacher, user, loading } = useContext(UserContext);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const roomId = Number(segments[segments.length - 2]);

    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

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
                // const SERVER_URL = import.meta.env.VITE_SERVER_URL;
                // const response = await fetch(`${SERVER_URL}/rooms/${roomId}/students`, {
                //     method: 'GET',
                //     credentials: 'include',
                // });
                // const result = await response.json();
                // const data = result.data;

                const data = [
                    { id: '110920903544055292951', name: "김민재", stu_num: "2402", region: 0, plus_score: 10, minus_score: 5, profile_img: 'https://lh3.googleusercontent.com/a/ACg8ocKrQj1NJQYFo7WZEkmJsEPL305ciYcU0O_iGgEclsMSTlVdQvec=s96-c' },
                    { id: '110920903544055292952', name: "김천재", stu_num: "2100", region: 1, plus_score: 5, minus_score: 15, profile_img: null },
                    { id: '110920903544055292953', name: "김미림", stu_num: "2200", region: 0, plus_score: 20, minus_score: 1, profile_img: null },
                    { id: '110920903544055292954', name: "김밥", stu_num: "2400", region: 1, plus_score: 0, minus_score: 5, profile_img: null }
                ]; // 임시 데이터
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
                alert("학생 목록을 불러오는 중 오류가 발생했습니다.");
            }
        }
        fetchStudents();
    }, []);

    const getSelectedStudentsObj = () => {
        return students.filter(student => selectedStudents.includes(student.id));
    };

    const toggleSelect = (id) => {
        setSelectedStudents((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

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
                        {students.map((student, idx) => {
                            const isSelected = selectedStudents.includes(student.id);
                            return (
                                <StudentContentBox key={idx} onClick={() => toggleSelect(student.id)} $isSelected={isSelected}>
                                    <StudentProfileImgBox>
                                        {student.profile_img ? <StudentProfileImg src={student.profile_img} /> : null}
                                    </StudentProfileImgBox>
                                    <StudentName>
                                        {student.name}
                                    </StudentName>
                                    <StudentCheckbox $isOpen={isSelected}>
                                        {isSelected ? <CheckedIcon /> : <UnCheckedIcon />}
                                    </StudentCheckbox>
                                </StudentContentBox>
                            )
                        })}
                    </StudentListBox>
                    <GiveScoreBox>
                        <GiveScoreBtn $background={"#48BFA2"} $color={"#fff"} disabled={selectedStudents.length === 0} onClick={() => setIsModalOpen(true)}>
                            선택완료
                        </GiveScoreBtn>
                    </GiveScoreBox>
                </RoomManageContainer>
            </Main>
            <ScoreModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} // 닫기 함수 전달
                selectedStudents={getSelectedStudentsObj()} // 선택된 학생 정보 전달
                type={type}
            />
            <Navigation idx={2} />
        </Container >
    )
};
