import styled, { keyframes } from "styled-components";
import RightArrowIcon from "../assets/icon/right_outline_arrow.svg?react";
import { useState } from "react";

const StudentContentBox = styled.div`
    border-radius: 14px;
    background: #E9E9E9;
`;

const StudentInfo = styled.div`
    display: flex;
    padding: 14px;
    align-items: center;
    gap: 14px;
    align-self: stretch;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 14px;
    background: #FFF;
    position: relative; 
    z-index: 10; 
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

const StudentDetailBtn = styled.div`
    width: 15px;
    height: 15px;
    svg {
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
        transform: ${(props) => (props.$isOpen && 'rotate(90deg)')};
        path {
            stroke-width: 1px;
            stroke: #404040;
            stroke-opacity: 1;
        }
    }
`;

const StudentDetail = styled.div`
    overflow: hidden;
    padding: 18px 24px 12px 24px;
    transition: max-height 0.3s ease-in-out, opacity 0.2s ease-in-out, padding 0.3s ease-in-out;
    max-height: ${(props) => (props.$isOpen ? '500px' : '0')};
    opacity: ${(props) => (props.$isOpen ? '1' : '0')};
    padding: ${(props) => (props.$isOpen ? '20px 24px 12px 24px' : '0 24px')};
`;

const DetailInfo = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
    margin-bottom: 16px;
`;

const SchoolInfoLabel = styled.p`
    color: #404040;
    text-align: center;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 169.231% */
`;

const SchoolInfoText = styled.p`
    flex-grow: 1;
    color: rgba(64, 64, 64, 0.64);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 183.333% */
`;

const RegionInfo = styled.div`
    border-radius: 46px;
    background: #48BFA2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    display: flex;
    padding: 5px 10px;
    text-align: center;
    color: #FFF;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 600;
    line-height: 22px; /* 183.333% */
`;

const PlusMinusScore = styled.div`
    display: flex;
    gap: 8px;
`;

const PlusMinusBox = styled.div`
    gap: 4px;
    flex-grow: 1;
    display: flex;
    padding: 10px 18px;
    justify-content: center;
    align-items: center;
    border-radius: 46px;
    background: ${props => props.$background};
    border: 1px solid ${props => props.$border_color};
    color: ${props => props.$color};
`;

const ScoreLabel = styled.p`
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 183.333% */
`;

const ScoreValue = styled.p`
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 183.333% */
    
`;

export default function RoomInfo(props) {
    const { student, idx } = props;
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    // console.log(student);
    const stu_num = String(student.stu_details.stu_num);
    return (
        <StudentContentBox key={idx}>
            <StudentInfo onClick={() => setIsDetailOpen(!isDetailOpen)}>
                <StudentProfileImgBox>
                    {student.profile_img ? <StudentProfileImg src={student.profile_img} /> : null}
                </StudentProfileImgBox>
                <StudentName>
                    {student.name}
                </StudentName>
                <StudentDetailBtn $isOpen={isDetailOpen}>
                    <RightArrowIcon />
                </StudentDetailBtn>
            </StudentInfo>
            <StudentDetail $isOpen={isDetailOpen}>
                <DetailInfo>
                    <SchoolInfoLabel>학교</SchoolInfoLabel>
                    <SchoolInfoText>미림마이스터고등학교 {`${stu_num.slice(0, 1)}학년 ${stu_num.slice(1, 2)}반`}</SchoolInfoText>
                    <RegionInfo>{student.stu_details.region === 0 ? "수도권" : "지방"}생</RegionInfo>
                </DetailInfo>
                <PlusMinusScore>
                    <PlusMinusBox $background="#48BFA2" $border_color="#48BFA2" $color="#FFF">
                        <ScoreLabel>상점</ScoreLabel>
                        <ScoreValue>{student.stu_details.plus_score}점</ScoreValue>
                    </PlusMinusBox>
                    <PlusMinusBox $background="#FFF" $border_color="#48BFA2" $color="#48BFA2">
                        <ScoreLabel>벌점</ScoreLabel>
                        <ScoreValue>{student.stu_details.minus_score}점</ScoreValue>
                    </PlusMinusBox>
                </PlusMinusScore>
            </StudentDetail>
        </StudentContentBox>
    );
};
