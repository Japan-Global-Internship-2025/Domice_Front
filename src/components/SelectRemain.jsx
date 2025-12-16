import styled from "styled-components";
import { useState, useContext, use } from "react";
import ArrowIcon from "../assets/icon/right_outline_arrow.svg?react";
import LeftBoxTitle from "./LeftBoxTitle";
import { UserContext } from '../services/UserContext';
import OutListBox from "./OutListBox";
import { stuNumToGradeANDClass } from '../services/NumberFormat';

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

export default function SelectRemain(props) {
    const { isTeacher, user } = useContext(UserContext);
    const [remainDetail, setRemainDetail] = useState(false);
    const [checkedStatus, setCheckedStatus] = useState(0);
    const data = props.data

    useState(() => {
        if (data.type != null) {
            setCheckedStatus(data.type);
        }
    }, [data]);

    const handleRemain = (status) => {
        setCheckedStatus(status)
        if (!isTeacher) {
            const id = user.id;
            const name = user.name;
            const check = confirm(`${name}님의 잔류 상태를 ${status === 0 ? '잔류' : '외박'}으로 변경하시겠습니까?`);
            if (!check) return;
            alert('잔류 상태가 변경되었습니다.');
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
            { remainDetail && <Content>
                <OutListBox type="remain" item={data}>
                    <SelectRemainBox>
                        <SelectBtn $isSelected={checkedStatus === 0} onClick={() => handleRemain(0)}>
                            잔류
                        </SelectBtn>
                        <SelectBtn $isSelected={checkedStatus === 1} onClick={() => handleRemain(1)}>
                            외박
                        </SelectBtn>
                    </SelectRemainBox>
                    {isTeacher && <RemainListBox>
                        {(data.filter(element => element.type === checkedStatus)).map((item, idx) => (
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
            </Content> }
        </Container>
    );
};
