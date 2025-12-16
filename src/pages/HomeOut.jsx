import styled from "styled-components";
import TodayNotice from "../components/TodayNotice";
import OutRequest from "../components/OutRequest";
import LeftBoxTitle from "../components/LeftBoxTitle";
import SelectRemain from "../components/SelectRemain";
import CheckInIcon from "../assets/icon/check_in.svg?react";
import { useEffect, useState, useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../services/UserContext";
import { stuNumToGradeANDClass } from "../services/NumberFormat";

const Container = styled.div`
    overflow-y: auto;
`;

const CheckInContainer = styled.div`
    margin-top: 32px;
`;

const CheckInBox = styled.div`
    margin-top: 18.5px;
`;

const NearyByDates = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 10px;
`;

const DateBox = styled.div`
    display: flex;
    flex: 1 1 0;
    padding: ${props => props.$today ? "9.5px 23px" : "10px 19px"};
    flex-direction: column;
    align-items: center;
    gap: ${props => props.$today ? "9.5" : "7"}px;
    flex-shrink: 0;
    border-radius: 14px;
    background: ${props => props.$today ? "#48BFA2" : "#FFF"};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    transition: 0.5s ease-in-out;
`;

const MonthText = styled.p`
    color: ${props => props.$today ? "#FFF" : "#616161"};
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: ${props => props.$today ? "13" : "9.5"}px;
    font-weight: 500;
    line-height: normal;
`;

const DateText = styled.p`
    color: ${props => props.$today ? "#FFF" : "#616161"};
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: "Lexend Deca";
    font-size: ${props => props.$today ? "22" : "16"}px;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    min-width: ${props => props.$today && "26"}px;
`;

const SelectDayCheckIn = styled.div`
    display: flex;
    padding: 16px;
    align-items: center;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid #48BFA2;
    background: #FFF;
    box-shadow: 0 0 10.876px 0 rgba(0, 0, 0, 0.06);
    margin-top: 14px;
`;

const CheckInText = styled.p`
    flex: 1 1 0;
    color: #404040;
    text-align: start;
    font-family: Pretendard;
    font-size: 17.402px;
    font-style: normal;
    font-weight: 500;
    line-height: 25.805px;
`;

const CheckInIconBox = styled.div`
    svg {
        path {
            fill: ${props => props.$isCheckIn ? "#48BFA2" : "#D9D9D9"};
        }
    }
`;

const StudentCheckList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8.5px;
    overflow-y: auto;
    padding-right: 10px;
    margin-top: 20px;
    max-height: 180px;
`

const StudentCheckInBox = styled.div`
    border-radius: 15px;
    background: #FFF;
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    align-self: stretch;
`;

const StudentProfileImgBox = styled.div`
    width: 37px;
    height: 37px;
    border-radius: 27px;
    background: #484848;
`;

const StudentProfileImg = styled.img`
    border-radius: 27px;
    object-fit: cover;
    width: 100%;
`;

const StudentInfoBox = styled.div`
    flex-grow: 1;
`;

const StduentInfoRow = styled.div`
    display: flex;
    gap: 3px;
`;

const StudentName = styled.p`
    color: #404040;
    font-family: Pretendard;
    font-size: 12.336px;
    font-weight: 600;
    line-height: 16.962px; /* 137.5% */
`;

const StudentRoom = styled.p`
    color: #404040;
    text-align: center;
    font-family: Pretendard;
    font-size: 9.252px;
    font-weight: 400;
    line-height: 16.962px; /* 183.333% */
`;

const StudentNumber = styled.p`
    color: rgba(64, 64, 64, 0.64);
    font-family: Pretendard;
    font-size: 9.252px;
    font-style: normal;
    font-weight: 400;
    line-height: 16.962px; /* 183.333% */
`;

const StudentCheckInStatusBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CheckInStatus = styled.div`
    display: flex;
    padding: 2px 8px;
    text-align: center;
    color: #FFF;
    font-family: Pretendard;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-weight: 600;
    line-height: 22px;
    border-radius: 30px;
    background: ${props => props.$isCheckIn ? "#3D8EFF" : "#FF2929"};
`;

const return_list = {
    EARLY: '입실 시간이 아닙니다',
    AFTER_SCHOOL: '하교 후 입실 체크 16:00 ~ 16:30',
    AFTER_DINNER: '석식 후 입실 체크 17:20 ~ 18:20',
    RETURN_8PM: '8시 복귀 후 입실 체크 20:00 ~ 20:30',
    LATE: '입실 시간이 아닙니다',
}

export default function HomeOut() {
    const { isTeacher, user } = useContext(UserContext);
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const dayOffsets = [-2, -1, 0, 1, 2];
    const [nearbyDate, setNearbyDate] = useState([]);
    const [selectDayCheckIN, setSelectDayCheckIN] = useState()
    const [studentRoomCheckINs, setStudentRoomCheckINs] = useState([])
    const [outRequestData, setOutRequestData] = useState(null);
    const [remainData, setRemainData] = useState(null);
    const SERVER_URL = import.meta.env.VITE_SERVER_URL

    useEffect(() => {
        const calculatedDates = dayOffsets.map(offset => {
            const tempDate = new Date(currentDate);
            tempDate.setDate(currentDate.getDate() + offset);
            return tempDate;
        });
        setNearbyDate(calculatedDates);
    }, [currentDate])

    if (isTeacher) {
        useEffect(() => {
            async function fetchData() {
                // const response = await fetch(`${SERVER_URL}/api/roomcheckins/all`, {
                //     method: 'GET',
                //     credentials: 'include'
                // })
                // const result = await response.json()
                const result = {
                    data: [
                        { id: 2, user_id: '110920903544055292951', name: "김민재", profile_img: 'https://lh3.googleusercontent.com/a/ACg8ocKrQj1NJQYFo7WZEkmJsEPL305ciYcU0O_iGgEclsMSTlVdQvec=s96-c', isCheckIn: false, room: '518', stu_num: 2402 },
                        { id: 3, user_id: '110920903544055292953', name: "김가루", profile_img: null, isCheckIn: false, room: '518', stu_num: 2200 },
                        { id: 1, user_id: '110920903544055292954', name: "신채은", profile_img: null, isCheckIn: true, room: '517', stu_num: 2100 },
                        { id: 4, user_id: '110920903544055292952', name: "김미림", profile_img: null, isCheckIn: true, room: '516', stu_num: 2500 },
                    ]
                }
                console.log(result);
                setStudentRoomCheckINs(result.data);
            }
            fetchData();
        }, []);
    }
    else {
        useEffect(() => {
            async function fetchData() {
                const response = await fetch(`${SERVER_URL}/api/roomcheckins/today`, {
                    method: 'GET',
                    credentials: 'include'
                })
                const result = await response.json()
                console.log(result);
                setSelectDayCheckIN(result.data);
            }
            fetchData();
        }, []);
    }

    // 출입 신청 데이터 불러오기
    useEffect(() => {
        if (isTeacher) {
            async function fetchData() {
                // const response = await fetch(`${SERVER_URL}/api/leave`, {
                //     method: 'GET',
                //     credentials: 'include'
                // })
                // const temp = await response.json()
                const temp = {
                    data: [
                        { id: 1, user_id: '110920903544055292951', leave_date: '2025-12-04', reason: '병원', is_approved: true, created_at: '2025-12-03', profiles: { name: "김민재", stu_details: { room: 518, stu_num: 2402 } }},
                        { id: 2, user_id: '110920903544055292952', leave_date: '2025-12-04', reason: '개인사정', is_approved: false, created_at: '2025-12-03', profiles: { name: "김가루", stu_details: { room: 517, stu_num: 2402 }  }}
                    ]
                }; // 임시 데이터
                console.log(temp);
                setOutRequestData(temp.data);
            }
            fetchData();
        }
        else {
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
        }
    }, [isTeacher])

    // 잔류 신청 데이터 불러오기
    useEffect(() => {
        if (isTeacher) {
            async function fetchData() {
                // const response = await fetch(`${SERVER_URL}/api/leave`, {
                //     method: 'GET',
                //     credentials: 'include'
                // })
                // const temp = await response.json()
                const temp = {
                    data: [
                        { id: 1, user_id: '110920903544055292951', type: 0, created_at: '2025-12-15', profiles: { name: "김민재", stu_details: { room: 518, stu_num: 2402 } }},
                        { id: 2, user_id: '110920903544055292952', type: 1, created_at: '2025-12-15', profiles: { name: "김가루", stu_details: { room: 517, stu_num: 2402 }  }}
                    ]
                }; // 임시 데이터
                console.log(temp);
                setRemainData(temp.data);
            }
            fetchData();
        }
        else {
            async function fetchData() {
                // const response = await fetch(`${SERVER_URL}/api/leave`, {
                //     method: 'GET',
                //     credentials: 'include'
                // })
                // const temp = await response.json()
                const temp = {
                    data: [
                        { id: 1, user_id: '110920903544055292951', type: 0, profiles: { name: "김민재" }},
                    ]
                }; // 임시 데이터
                console.log(temp);
                setRemainData(temp.data);
            }
            fetchData();
        }
    }, [isTeacher]);

    const handleCheckInClick = () => {
        if (selectDayCheckIN.length != 0) {
            alert("이미 입실체크가 완료되었습니다.");
        }
        else {
            navigate("/checkin");
        }
    }

    const changeDate = (offset) => {
        const tempDate = new Date(currentDate);
        tempDate.setDate(currentDate.getDate() + offset);
        setCurrentDate(tempDate);
    }

    if (!outRequestData || !remainData) {
        return <Container></Container>;
    }

    return (
        <Container>
            <TodayNotice />
            <CheckInContainer>
                <LeftBoxTitle text={"입실체크"} />
                <CheckInBox>
                    <NearyByDates>
                        {nearbyDate.map((item, idx) => {
                            const today = item.getMonth() == currentDate.getMonth() && item.getDate() == currentDate.getDate();
                            return (
                                <DateBox key={idx} $today={today} onClick={() => { changeDate(dayOffsets[idx]) }}>
                                    {/* <DateBox key={idx} $today={today}> */}
                                    <MonthText $today={today}>
                                        {item.getMonth() + 1}월
                                    </MonthText>
                                    <DateText $today={today}>
                                        {item.getDate()}
                                    </DateText>
                                </DateBox>
                            )
                        })}
                    </NearyByDates>
                    {!isTeacher
                        ?
                        <SelectDayCheckIn onClick={handleCheckInClick}>
                            <CheckInText>
                                {selectDayCheckIN.length == 0 ? getReturnStatus() : return_list[selectDayCheckIN.check_type] }
                            </CheckInText>
                            <CheckInIconBox $isCheckIn={selectDayCheckIN.length != 0}>
                                <CheckInIcon />
                            </CheckInIconBox>
                        </SelectDayCheckIn>
                        :
                        <StudentCheckList>
                            {studentRoomCheckINs.map((item, idx) => (
                                <StudentCheckInBox key={idx}>
                                    <StudentProfileImgBox>
                                        <StudentProfileImg src={item.profile_img} />
                                    </StudentProfileImgBox>
                                    <StudentInfoBox>
                                        <StduentInfoRow>
                                            <StudentName>{item.name}</StudentName>
                                            <StudentRoom>{item.room}호</StudentRoom>
                                        </StduentInfoRow>
                                        <StduentInfoRow>
                                            <StudentNumber>미림마이스터고등학교 {stuNumToGradeANDClass(item.stu_num)}</StudentNumber>
                                        </StduentInfoRow>
                                    </StudentInfoBox>
                                    <StudentCheckInStatusBox>
                                        <CheckInStatus $isCheckIn={item.isCheckIn}>
                                            {item.isCheckIn ? "입실" : "미입실"}
                                        </CheckInStatus>
                                    </StudentCheckInStatusBox>
                                </StudentCheckInBox>
                            ))}
                        </StudentCheckList>
                    }
                </CheckInBox>
            </CheckInContainer>
            <OutRequest outRequest={outRequestData} isTeacher={isTeacher} />
            { (isTeacher || user.stu_details?.region===1) && <SelectRemain data={remainData} /> }
        </Container >
    )
}

const getReturnStatus = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const totalMinutes = hour * 60 + minute;

    const TIME_LIMITS = {
        AFTER_SCHOOL_START: 960,
        AFTER_DINNER_START: 990,
        AFTER_DINNER_START_ACTUAL: 1040,
        RETURN_8PM_START: 1100,
        RETURN_8PM_END: 1230,
        LATE_START: 1230,
    };

    if (totalMinutes < TIME_LIMITS.AFTER_SCHOOL_START) {
        return return_list.EARLY;
    } else if (totalMinutes < TIME_LIMITS.AFTER_DINNER_START) {
        return return_list.AFTER_SCHOOL;
    } else if (totalMinutes < TIME_LIMITS.RETURN_8PM_START) {
        return return_list.AFTER_DINNER;
    } else if (totalMinutes < TIME_LIMITS.LATE_START) {
        return return_list.RETURN_8PM;
    } else {
        return return_list.LATE;
    }
};

