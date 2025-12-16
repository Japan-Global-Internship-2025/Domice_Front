import styled from "styled-components";

const TodayCalendarContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const CalendarMonth = styled.div`
    margin-top: 16px;
    margin-left: 10px;
    display: flex;
    width: 48px;
    height: 20px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 24px 24px 0 0;
    background: #48BFA2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
`

const CalendarDate = styled.div`
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: ${props => props.$padding};
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
`;

const DateBox = styled.div`
    display: flex;
    width: 100%;
    height: max-content;
    gap: 5px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

const DateTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const DayText = styled.p`
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: #404040;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    opacity: ${props => props.$isActive ? 1 : 0.36};
`;

const DateValue = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    align-self: stretch;
`;

const WeekBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    align-self: stretch;
    padding: 2.5% 0; 
`;

const DateText = styled.p`
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    color: ${props => props.$isActive ? props.$isNow ? "#fff" : "rgba(72, 191, 162, 1)" : "rgba(64, 64, 64, 0.32)"};
    text-align: center;
    font-family: "Lexend Deca", Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    background: ${props => props.$isNow ? "#48BFA2" : "#fff"};
    border-radius: 8px;

    /* 🖱️ 클릭 가능한 날짜일 때 마우스 커서 변경 */
    cursor: ${props => props.$isClickable ? "pointer" : "default"};
    
    /* 🖱️ (선택사항) 클릭 시 눌리는 효과 */
    &:active {
        opacity: ${props => props.$isClickable ? 0.7 : 1};
    }
`;

export default function Calendar(props) {
    const now = new Date();
    const now_month = now.getMonth() + 1;
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const now_day = props.now_day? now.getDay(): 7;
    const todayDate = now.getDate();
    const mondayBasedDay = (now_day === 0) ? 6 : now_day - 1;
    const dates = props.dates;
    // console.log(dates);

    const handleDateClick = (dayNumber) => {
        if (!dayNumber || !props.onDateClick) return;

        const selectedDate = new Date(
            now.getFullYear(), 
            now.getMonth(), 
            dayNumber
        );

        props.onDateClick(selectedDate);
    };

    return (
        <TodayCalendarContainer>
            <CalendarMonth>
                {now_month}월
            </CalendarMonth>
            <CalendarDate $padding={props.$padding}>
                <DateBox>
                    <DateTitle>
                        {days.map((item, idx) => {
                            return (
                                <DayText key={idx} $isActive={idx <= mondayBasedDay}>{item}</DayText>
                            );
                        })}
                    </DateTitle>
                    <DateValue>
                        {dates.map((week, weekIdx) => (
                            <WeekBox key={weekIdx}>
                                {week.map((item, dayIdx) => {
                                    const isNow = item === todayDate;
                                    const isActive = item !== null && item <= todayDate;

                                    return (
                                        <DateText
                                            key={dayIdx}
                                            $isActive={isActive}
                                            $isNow={isNow}
                                            $isClickable={!!item} // 날짜가 있으면 true (커서 변경용)
                                            onClick={() => handleDateClick(item)} // 클릭 이벤트 연결
                                        >
                                            {item ? item : ' '}
                                        </DateText>
                                    );
                                })}
                            </WeekBox>
                        ))}
                    </DateValue>
                </DateBox>
            </CalendarDate>
        </TodayCalendarContainer>
    );
}

