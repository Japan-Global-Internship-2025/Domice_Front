import styled from "styled-components";
import MidBoxTitle from "../components/MidBoxTitle";
import { useState, useEffect } from "react";
import { getMeal } from '../services/Meal'
import RightArrowIcon from "../assets/icon/meal_right_arrow.svg?react";
import LeftArrowIcon from "../assets/icon/meal_left_arrow.svg?react";
import MealCalendar from "../assets/icon/meal_calendar.svg?react"
import { dateAndDay } from "../services/DateFormat"

const Container = styled.div``;

const DateBox = styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const MoveDate = styled.div`
    width: 24px;
    height: 24px;
    aspect-ratio: 1/1;  

    svg {
        width: 24px;
        height: 24px;
    }
`;

const DateTextBox = styled.div`
    display: flex;
    padding: 10px 14px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 50px;
    border: 1px solid rgba(64, 64, 64, 0.32);
`;

const DateText = styled.p`
    color: #404040;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
`;

const MealInfoContainer = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;
    height: auto;
    gap: 24px;
    margin-top: 36.5px;
`;

const MealInfoMain = styled.div`
    flex-grow: 1;
    display: flex;
    padding: 50px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    background: #48BFA2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    min-height: 300px;
    gap: 36px;
`;

const MealInfoInnerBox = styled.div`
    
`;

const SideWrapper = styled.div`
    display: flex;
    align-items: center; /* 내부의 FakeBox를 세로 중앙 정렬 */
    width: 10%;         /* FakeBox의 너비 설정 (필요시 조절) */
`;

const MealInfoFakeBox = styled.div`
    display: flex;
    width: 100%;
    height: 83.2%;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: ${props => props.$border_radius};
    background: #FFF;
    box-shadow: 0 3.2px 3.2px 0 rgba(0, 0, 0, 0.06);
`

const MealTimeBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    align-self: stretch;
`;

const TimeText = styled.p`
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const MealContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    margin-top: 32px;
    margin-bottom: 23px;
`;

const MealContentText = styled.p`
    color: rgba(255, 255, 255, ${props => props.$opacity});
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

const MealInfoView = styled.p`
    margin-top: 4px;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
`;

const SelectMeal = styled.div`
    width: 24px;
     
    svg {
        width: 24px;
        height: 24px;
        aspect-ratio: 1/1;

        path {
            stroke: #fff;
        }
    }
`

export default function MealToday() {
    const [mealInfo, setMealInfo] = useState([[{ data: "로딩중..." }], [{ data: "로딩중..." }], [{ data: "로딩중..." }]]);
    const [selectMeal, setSelectMeal] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());

    async function changeDate(input) {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + input);
        setCurrentDate(newDate);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                setMealInfo([[{ data: "로딩중..." }], [{ data: "로딩중..." }], [{ data: "로딩중..." }]])
                const response = await getMeal(currentDate);
                const data = response.mealServiceDietInfo[1].row;
                const meals = [];
                data.forEach(row => {
                    const temp = [];
                    const info = row.DDISH_NM.split("<br/>");
                    info.forEach(item => {
                        const menu = item.split(" ")[0];
                        temp.push(menu);
                    });
                    const result = { time: row.MMEAL_SC_NM, data: temp, cal: row.CAL_INFO, info: row.NTR_INFO }
                    meals.push(result);
                });
                setMealInfo(meals);
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [currentDate])
    console.log(mealInfo);

    return (
        <Container>
            <MidBoxTitle text={"오늘의 급식"} />
            <DateBox>
                <MoveDate onClick={() => { changeDate(-1) }}>
                    <LeftArrowIcon />
                </MoveDate>
                <DateTextBox>
                    <MealCalendar />
                    <DateText>
                        {dateAndDay(new Date(currentDate))}
                    </DateText>
                </DateTextBox>
                <MoveDate onClick={() => { changeDate(1) }}>
                    <RightArrowIcon />
                </MoveDate>
            </DateBox>
            <MealInfoContainer>
                <SideWrapper>
                    <MealInfoFakeBox $border_radius={"0px 19.2px 19.2px 0px"} />
                </SideWrapper>
                <MealInfoMain>
                    <SelectMeal>
                        {selectMeal > 0 && <LeftArrowIcon onClick={() => { setSelectMeal(selectMeal - 1) }} />}
                    </SelectMeal>
                    <MealInfoInnerBox>
                        <MealTimeBox>
                            <TimeText>
                                {mealInfo[selectMeal].time}
                            </TimeText>
                        </MealTimeBox>
                        <MealContent>
                            {mealInfo[selectMeal].data && (mealInfo[selectMeal].data).map((item, idx) => {
                                return (
                                    <MealContentText key={idx} $opacity={0.96}>
                                        {item}
                                    </MealContentText>
                                )
                            })}
                        </MealContent>
                        <MealContentText $opacity={0.64}>
                            {mealInfo[selectMeal].cal}
                        </MealContentText>
                        {mealInfo[selectMeal].info && <MealInfoView onClick={() => { alert((mealInfo[selectMeal].info).replaceAll("<br/>", "\n")) }}>
                            영양정보 더보기
                        </MealInfoView>}
                    </MealInfoInnerBox>
                    <SelectMeal>
                        {selectMeal < 2 && <RightArrowIcon onClick={() => { setSelectMeal(selectMeal + 1) }} />}
                    </SelectMeal>
                </MealInfoMain>
                <SideWrapper>
                    <MealInfoFakeBox $border_radius={"19.2px 0px 0px 19.2px"} />
                </SideWrapper>
            </MealInfoContainer>
        </Container>
    )
};
