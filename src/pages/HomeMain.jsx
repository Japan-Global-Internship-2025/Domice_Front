import styled from "styled-components";
import TodayNotice from "../components/TodayNotice";
import Calendar from "../components/Calendar";
import { useNavigate } from "react-router-dom";
import UserIcon from "../assets/icon/user.svg?react";
import RightArrowIcon from "../assets/icon/right_outline_arrow.svg?react";
import LeftBoxTitle from "../components/LeftBoxTitle";
import TodayMealInfo from "../components/TodayMealInfo";
import { useContext, useState } from 'react';
import { UserContext } from '../services/UserContext';
import { getWeekDates, dateAndDay } from '../services/DateFormat';
import { QRCodeCanvas } from 'qrcode.react';

const Container = styled.div``;

const TodayTeacherContainer = styled.div`
    margin-top: 20px;
`;

const TodayTeacherBox = styled.div`
    margin-top: 12px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
`;

const BoxTopLine = styled.div`
    display: flex;
    width: 100%;
    height: 13px;
    border-radius: 24px 24px 0 0;
    background: #48BFA2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
`;

const BoxContent = styled.div`
    display: flex;
    padding: 16px 14px 16px 16px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border: 0px solid #fff;
    border-radius: 0 0 14px 14px;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    svg {
        width: 32px;
        height: 32px;
        aspect-ratio: 1/1;

        path {
            fill: #404040;
            fill-opacity: 1;
        }
    }
`;

const TeacherIconBox = styled.div`
    width: 32px;
    height: 32px;
    padding: 5.33px;
    svg {
        width: 21.333px;
        height: 21.333px;
        aspect-ratio: 1/1;

        path {
            fill: #404040;
            fill-opacity: 1;
        }
    }
`;

const TeacherInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    flex: 1 0 0;
`;

const TeacherName = styled.p`
    color: #404040;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
`;

const TeacherPhone = styled.p`
    align-self: stretch;
    color: rgba(64, 64, 64, 0.64);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

const TodayMealsContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 24px;
    width: 100%;
`;

const MealsTitle = styled.div`
    display: flex;
    justify-content: space-between;
`

const ToDatail = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
`;

const GoDatailText = styled.span`
    color: rgba(64, 64, 64, 0.64);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 183.333% */
`;

const GoDatailIcon = styled.div``;

const MealsInfo = styled.div`
    margin-top: 20px;
    display: flex;
    min-height: 180px;
    padding: 15px 5px;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
    border-radius: 24px;
    background: #48BFA2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
`;

const QRCodeGenerateContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 24px;
    width: 100%;
`;

const QRContainerTitle = styled.div`
    margin-bottom: 16px;
`;

const QRGenerateBox = styled.div`
    border-radius: 14px;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    padding: 18px 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const QRGenerateBoxTitle = styled.div`
    display: flex;
    gap: 7px;
    align-self: stretch;
    height: fit-content;
`;

const BoxTitleLine = styled.div`
    width: 3px;
    border-radius: 1.5px;
    background: #404040;
`;

const BoxTitleDate = styled.p`
    color: #404040;
    font-family: Pretendard;
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
`

const BoxTitleBox = styled.div`
    
`;

const QRGenerateContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const QRGenerateBtnBox = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
`;

const QRGenerateSaveBtn = styled.button`
    display: flex;
    padding: 5px 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 0px solid #fff;
    border-radius: 30px;
    background: #48BFA2;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-weight: 600;
    line-height: 22px; /* 200% */
`

const QRCodeImg = styled.div`
    
`;

export default function HomeMain(props) {
    const navigate = useNavigate();
    const { isTeacher, loading } = useContext(UserContext);
    const teacher_name = "김사감";
    const teacher_phone = "010-1234-5678";

    const downloadQRCode = () => {
        // 1. canvas 요소를 선택합니다.
        const canvas = document.getElementById('qr-code');

        if (!canvas) return;

        // 2. 이미지 URL(base64)을 생성합니다.
        const pngUrl = canvas.toDataURL('image/png');

        // 3. 가상의 링크를 생성하여 다운로드를 실행합니다.
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qrcode.png'; // 다운로드될 파일명
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Container>
            <TodayNotice />
            <Calendar dates={getWeekDates()} $padding={"12px 20px"} now_day={true} />
            <TodayTeacherContainer>
                <LeftBoxTitle text={"오늘의 선생님"} />
                <TodayTeacherBox>
                    <BoxTopLine />
                    <BoxContent>
                        <TeacherIconBox>
                            <UserIcon />
                        </TeacherIconBox>
                        <TeacherInfo>
                            <TeacherName>
                                {teacher_name} 선생님
                            </TeacherName>
                            <TeacherPhone>
                                {teacher_phone}
                            </TeacherPhone>
                        </TeacherInfo>
                    </BoxContent>
                </TodayTeacherBox>
            </TodayTeacherContainer>
            {isTeacher
                ?
                <QRCodeGenerateContainer>
                    <QRContainerTitle>
                        <LeftBoxTitle text={"오늘의 QR코드"} />
                    </QRContainerTitle>
                    <QRGenerateBox>
                        <QRGenerateBoxTitle>
                            <BoxTitleLine />
                            <BoxTitleBox>
                                <BoxTitleDate>{dateAndDay(new Date())}</BoxTitleDate>
                            </BoxTitleBox>
                        </QRGenerateBoxTitle>
                        <QRGenerateContent>
                            <QRCodeImg>
                                <QRCodeCanvas
                                    value={["https://www.naver.com"]}
                                    title={"Domice 출석 체크 QR코드"}
                                    marginSize={1}
                                    id="qr-code"
                                    size={512}
                                    bgColor={"#FFFFFF"}
                                    style={{ width: '128px', height: '128px' }}
                                />
                            </QRCodeImg>
                            <QRGenerateBtnBox>
                                <QRGenerateSaveBtn onClick={downloadQRCode}>
                                    저장
                                </QRGenerateSaveBtn>
                            </QRGenerateBtnBox>
                        </QRGenerateContent>
                    </QRGenerateBox>
                </QRCodeGenerateContainer>
                :
                <TodayMealsContainer>
                    <MealsTitle>
                        <LeftBoxTitle text={"오늘의 급식"} />
                        <ToDatail onClick={() => { navigate("/meal") }}>
                            <GoDatailText>
                                자세히보기
                            </GoDatailText>
                            <GoDatailIcon>
                                <RightArrowIcon />
                            </GoDatailIcon>
                        </ToDatail>
                    </MealsTitle>
                    <MealsInfo>
                        <TodayMealInfo meals={props.meals} />
                    </MealsInfo>
                </TodayMealsContainer>
            }
        </Container>
    )
}