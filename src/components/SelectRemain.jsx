import styled from "styled-components";
import { useState, useContext, use, useEffect } from "react";
import ArrowIcon from "../assets/icon/right_outline_arrow.svg?react";
import LeftBoxTitle from "./LeftBoxTitle";
import { UserContext } from '../services/UserContext';
import OutListBox from "./OutListBox";
import { stuNumToGradeANDClass } from '../services/NumberFormat';
import { getThisFriday, getTodayDateStr } from "../services/DateFormat";

const Container = styled.div`
    margin-top: 40px;
    margin-bottom: 20px;
    overflow-x: hidden;
`;

const ContainerTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

const ToDetail = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    &:focus, &:active {
        outline: none;
        box-shadow: none;
    }
`;

const GoDetailText = styled.span`
    color: rgba(64, 64, 64, 0.64);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 183.333% */
`;

const GoDetailIcon = styled.div`
    display: flex;
    align-items: center;
    width: 12px; 
    height: 12px;
    svg {
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
        ${props => props.$rotate && 'transform: rotate(90deg)'};
        &:focus {
            outline: none;
        }
    }
`;

const Content = styled.div`
    margin-top: 20px;
`

const SelectRemainBox = styled.div`
    display: flex;
    gap: 6px;
`;

const SelectBtn = styled.div`
    padding: 1px 10px;
    text-align: center;
    border-radius: 30px;
    background: ${(props) => props.$isSelected ? "#48BFA2" : "rgba(72, 191, 162, 0.38)"};
    align-self: stretch;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-weight: 600;
    line-height: 22px;
`;

const RemainListBox = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`;

const StudentRemainBox = styled.div`
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

export default function SelectRemain() {
    const { isTeacher, user } = useContext(UserContext);
    const [remainDetail, setRemainDetail] = useState(false);
    const [checkedStatus, setCheckedStatus] = useState(-1);
    const [data, setData] = useState();
    const SERVER_URL = import.meta.env.VITE_SERVER_URL

    const statusList = ['STAY', 'OUT']

    useEffect(() => {
        if (isTeacher) {
            async function fetchData() {
                const response = await fetch(`${SERVER_URL}/api/stay?data=${getTodayDateStr(getThisFriday())}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                const result = await response.json()
                if (response.ok) {
                    console.log(result);
                    setData(result.data);
                }
                setCheckedStatus(0)
            }
            fetchData();
        }
        else {
            async function fetchData() {
                const response = await fetch(`${SERVER_URL}/api/stay?data=${getTodayDateStr(getThisFriday())}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                const result = await response.json()
                if (result) {
                    console.log(result);
                    setCheckedStatus(result.data[0].status == 'STAY' ? 0 : 1);
                }
            }
            fetchData();
        }
    }, [])

    const handleRemain = (status) => {
        setCheckedStatus(status)
        if (!isTeacher) {
            const today = new Date();
            const currentDay = today.getDay();
            if (currentDay == 0 || currentDay == 6) {
                alert("주말 선택은 불가능합니다.");
                return;
            }
            const check = confirm(`잔류 상태를 ${status === 0 ? '잔류' : '외박'}으로 변경하시겠습니까?`);
            if (!check) return;
            async function fecthData() {
                const response = await fetch(`${SERVER_URL}/api/stay`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: status ? 'OUT' : 'STAY' })
                })
                if (response.ok) {
                    alert('잔류 상태가 변경되었습니다.');
                }
                else {
                    alert('처리 과정에서 에러가 발생했습니다.')
                }
            }
            fecthData();
        }

    }

    return (
        <Container>
            <ContainerTitle>
                <LeftBoxTitle text={"잔류 여부"} />
                <ToDetail onClick={() => { setRemainDetail(!remainDetail) }}>
                    <GoDetailText>
                        {remainDetail ? '잔류내역 숨기기' : '잔류내역 보기'}
                    </GoDetailText>
                    <GoDetailIcon $rotate={remainDetail}>
                        <ArrowIcon />
                    </GoDetailIcon>
                </ToDetail>
            </ContainerTitle>
            {remainDetail && <Content>
                <OutListBox type="remain" >
                    <SelectRemainBox>
                        <SelectBtn $isSelected={checkedStatus === 0} onClick={() => handleRemain(0)}>
                            잔류
                        </SelectBtn>
                        <SelectBtn $isSelected={checkedStatus === 1} onClick={() => handleRemain(1)}>
                            외박
                        </SelectBtn>
                    </SelectRemainBox>
                    {isTeacher && <RemainListBox>
                        {(data.filter(element => element.status === statusList[checkedStatus])).map((item, idx) => (
                            <StudentRemainBox key={idx}>
                                <StudentProfileImgBox>
                                    <StudentProfileImg src={item.profiles.profile_img} />
                                </StudentProfileImgBox>
                                <StudentInfoBox>
                                    <StduentInfoRow>
                                        <StudentName>{item.profiles.name}</StudentName>
                                        <StudentRoom>{item.profiles.stu_details.room}호</StudentRoom>
                                    </StduentInfoRow>
                                    <StduentInfoRow>
                                        <StudentNumber>미림마이스터고등학교 {stuNumToGradeANDClass(item.profiles.stu_details.stu_num)}</StudentNumber>
                                    </StduentInfoRow>
                                </StudentInfoBox>
                            </StudentRemainBox>
                        ))}

                    </RemainListBox>}
                </OutListBox>
            </Content>}
        </Container>
    );
};
