import styled from "styled-components";
import TodayNotice from "../components/TodayNotice";
import Calendar from "../components/Calendar";
import { useNavigate } from "react-router-dom";
import UserIcon from "../assets/icon/user.svg?react";
import RightArrowIcon from "../assets/icon/right_outline_arrow.svg?react";
import LeftBoxTitle from "../components/LeftBoxTitle";
import TodayMealInfo from "../components/TodayMealInfo";

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

export default function HomeMain(props) {
    const navigate = useNavigate();
    const teacher_name = "김사감";
    const teacher_phone = "010-1234-5678";

    return (
        <Container>
            <TodayNotice/>
            <Calendar dates={getWeekDates()} $padding={"12px 20px"} now_day={true}/>
            <TodayTeacherContainer>
                <LeftBoxTitle text={"오늘의 선생님"}/>
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
            <TodayMealsContainer>
                <MealsTitle>
                    <LeftBoxTitle text={"오늘의 급식"}/>
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
                    <TodayMealInfo meals={props.meals}/>
                </MealsInfo>
            </TodayMealsContainer>
        </Container>
    )
}

function getWeekDates() {
    const today = new Date();
    let currentDay = today.getDay();
    let diff = (currentDay === 0) ? 6 : currentDay - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - diff);
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        weekDates.push(date.getDate());
    }
    return [weekDates];
}