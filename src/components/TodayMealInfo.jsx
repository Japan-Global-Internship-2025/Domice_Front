import styled from "styled-components";

const MealsContent = styled.div`
    display: flex;
`;

const MealBox = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

const MealTitle = styled.div`
    align-self: stretch;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const MealInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MealInfoBox = styled.div`
    display: flex;
    justify-content: center; 
`;

const MealSpan = styled.span`
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-weight: 400;
    line-height: 22px;
`

const meal_title = ['아침', '점심', '저녁'];

export default function TodayMealInfo(props) {
    return <MealsContent>
        {meal_title.map((item, idx) => {
            const meals = props.meals[idx];
            return (
                <MealBox key={idx}>
                    <MealTitle>{item}</MealTitle>
                    <MealInfoBox>
                        <MealInfo>
                            {meals && Array.isArray(meals) && meals.map((item, mealIdx) => (
                                <MealSpan key={mealIdx}>
                                    {item}
                                </MealSpan>
                            ))}
                        </MealInfo>
                    </MealInfoBox>
                </MealBox>
            )
        })}
    </MealsContent>
};
