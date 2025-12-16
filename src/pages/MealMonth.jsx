import styled from "styled-components";
import { useState, useEffect } from "react";
import MidBoxTitle from "../components/MidBoxTitle";
import Calendar from "../components/Calendar";
import { getMeal } from '../services/Meal'
import TodayMealInfo from "../components/TodayMealInfo";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: #f9f9f9;
    height: 100%;
`;

const MonthCalendar = styled.div`
    padding: 0px 24px;
`

const SelectMeal = styled.div`
    width: 100%;
    border-radius: 24px 24px 0 0;
    background: #48BFA2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    padding: 27px;
    box-sizing: border-box;
    margin-top: auto;
`;

export default function MealMonth(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mealInfo, setMealInfo] = useState([["로딩중..."], ["로딩중..."], ["로딩중..."]]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getMeal(selectedDate);
                const data = response.mealServiceDietInfo[1].row;
                const meals = [];
                data.forEach(row => {
                    const temp = [];
                    const info = row.DDISH_NM.split("<br/>");
                    info.forEach(item => {
                        const menu = item.split(" ")[0];
                        temp.push(menu);
                    });
                    meals.push(temp);
                });
                console.log(meals);
                setMealInfo(meals);
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [selectedDate])
    // console.log(mealInfo);

    const handleDateSelect = (date) => {
        console.log("선택된 날짜:", date);
        setSelectedDate(date);
    };

    return (
        <Container>
            <MidBoxTitle text={"이번달 급식표"} />
            <MonthCalendar>
                <Calendar dates={props.calendar} $padding={"30px"} onDateClick={handleDateSelect} />
            </MonthCalendar>
            <SelectMeal>
                <TodayMealInfo meals={mealInfo}/>
            </SelectMeal>
        </Container>
    )
};