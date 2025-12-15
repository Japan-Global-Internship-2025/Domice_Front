import styled from "styled-components";
import { useState, useEffect, use } from "react";
import ArrowIcon from "../assets/icon/right_outline_arrow.svg?react";
import OutRequestContent from "./OutRequestList";
import LeftBoxTitle from "./LeftBoxTitle";
import { dateAndDay, generateCalendar } from "../services/DateFormat"
import Calendar from "./Calendar";

const OutRequestContainer = styled.div`
    width: 100%;
    margin-top: 45px;
`;

const OutRequsetTitle = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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

const OutRequestHistory = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px; 
    margin-bottom: 12px;
`;

const OutRequestList = styled.div`
    display: flex;
    padding: 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    border-radius: 24px;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
`;

const OutRequestListTitle = styled.div`
    display: flex;
    gap: 7px;
    align-self: stretch;
    height: fit-content;
`;

const TitleLine = styled.div`
    width: 3px;
    border-radius: 1.5px;
    background: #404040;
`;

const TitleDate = styled.p`
    color: #404040;
    font-family: Pretendard;
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
`

const TitleBox = styled.div`
    
`;

const OutRequestBox = styled.div`
`;

const OutRequestBtn = styled.button`
    padding: 10px;
    text-align: center;
    width: 100%;
    border-radius: 13px;
    border: 1px solid #48BFA2;
    background: ${(props) => props.$toggle ? "#48BFA2" : "#fff"};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    color: ${(props) => props.$toggle ? "#fff" : "#48BFA2"};
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    cursor: pointer;
    transition: background-color 0.3s ease;
`;

const OutRequestForm = styled.div`
    border-radius: 24px;
    background: #FFF;
    padding: 18px 24px;
    margin-top: 12px;
`;

const OutRequestCalendar = styled.div`
    display: flex;
    gap: 30px;
    padding: 10px 10px;
`

const CalendarMonth = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    justify-content: center;
    min-width: 10%;

`

const PreviousMonth = styled.div`
    width: 24px;
    height: 24px;
    svg {
        width: 24px;
        height: 24px;
        aspect-ratio: 1/1;
        transform: rotate(-90deg);
        path {
            stroke: #000000;
            stroke-opacity: 1;
        }
    }
`

const CurrentMonth = styled.div``

const NextMonth = styled.div`
    width: 24px;
    height: 24px;
    svg {
        width: 24px;
        height: 24px;
        aspect-ratio: 1/1;
        transform: rotate(90deg);
        path {
            stroke: #000000;
            stroke-opacity: 1;
        }
    }
`

const CalendarView = styled.div`
    flex-grow: 1;
`;

const OutRequestContentBox = styled.div`
    display: flex;
    padding: 14px;
    border-radius: 14px;
    border: 1px solid #48BFA2;
    justify-content: space-between;
    align-items: center;
`;

const OutRequestInput = styled.div`
    flex-grow: 1;
`;

const InputDate = styled.p`
    color: #818181;
    font-family: Pretendard;
    font-size: 9px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`

const InputReason = styled.input`
    color: #404040;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    width: 95%;
    border: none;

    &:focus {
        outline: none;
    }
`

const OutRequestSubmitBtn = styled.button`
    display: flex;
    padding: 5px 10px;
    text-align: center;
    border-radius: 30px;
    background: #3D8EFF;
    color: #FFF;
    border: none;
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-weight: 600;
    line-height: 22px; /* 200% */
`

export default function OutRequest(props) {
    const data = props.outRequest;
    const today = new Date();
    const [outRequsetDetail, setOutRequestDetail] = useState(false);
    const [outRequestBtn, setOutRequestBtn] = useState(false);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [outReason, setOutReason] = useState("");

    const outRequestToggle = () => {
        setOutRequestBtn((prev) => !prev);
    };

    const handleDateSelect = (date) => {
        console.log("선택된 날짜:", date);
        setSelectedDate(date);
    };

    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentYear(prevYear => prevYear - 1);
            setCurrentMonth(12);
        } else {
            setCurrentMonth(prevMonth => prevMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentYear(prevYear => prevYear + 1);
            setCurrentMonth(1);
        } else {
            setCurrentMonth(prevMonth => prevMonth + 1);
        }
    };

    const handleReason = (e) => {
        setOutReason(e.target.value);
    }

    const handleSubmit = () => {
        if (outReason.trim().length == 0) {
            alert("사유를 입력해주세요.");
            return;
        }
        const check = confirm(`일자 : ${dateAndDay(selectedDate)}\n사유 : ${outReason}\n위 내용이 맞습니까?`);
        if (check) {
            alert("정상 처리되었습니다.");
            setOutReason("");
            outRequestToggle();
        }
    }

    return (
        <OutRequestContainer>
            <OutRequsetTitle>
                <LeftBoxTitle text={"외출신청"} />
                <ToDetail onClick={() => { setOutRequestDetail(!outRequsetDetail) }}>
                    <GoDetailText>
                        {outRequsetDetail ? '외출내역 숨기기' : '외출내역 보기'}
                    </GoDetailText>
                    <GoDetailIcon $rotate={outRequsetDetail}>
                        <ArrowIcon />
                    </GoDetailIcon>
                </ToDetail>
            </OutRequsetTitle>
            {outRequsetDetail && <OutRequestHistory>
                {data.map((item, idx) => {
                    const str_date1 = dateAndDay(new Date(item.created_at))
                    const str_date2 = dateAndDay(new Date(item.leave_date));
                    return (
                        <OutRequestList key={idx}>
                            <OutRequestListTitle>
                                <TitleLine />
                                <TitleBox>
                                    <TitleDate>{str_date1}</TitleDate>
                                </TitleBox>
                            </OutRequestListTitle>
                            <OutRequestContent date={str_date2} reason={item.reason} ok={item.is_approved} />
                        </OutRequestList>
                    )
                })}
            </OutRequestHistory>
            }
            <OutRequestBox>
                <OutRequestBtn onClick={outRequestToggle} $toggle={outRequestBtn}>
                    {outRequestBtn ? "외출일정 취소하기" : "외출일정 신청하기"}
                </OutRequestBtn>
                {outRequestBtn &&
                    <OutRequestForm>
                        <OutRequestCalendar>
                            <CalendarMonth>
                                <PreviousMonth onClick={handlePrevMonth}>
                                    <ArrowIcon />
                                </PreviousMonth>
                                <CurrentMonth>
                                    {currentMonth}월
                                </CurrentMonth>
                                <NextMonth onClick={handleNextMonth}>
                                    <ArrowIcon />
                                </NextMonth>
                            </CalendarMonth>
                            <CalendarView>
                                <Calendar dates={generateCalendar(currentYear, currentMonth)} hiddenMonth={true} onDateClick={handleDateSelect}/>
                            </CalendarView>
                        </OutRequestCalendar>
                        <OutRequestContentBox>
                            <OutRequestInput>
                                <InputDate>
                                    {dateAndDay(selectedDate)}
                                </InputDate>
                                <InputReason type="text" placeholder="사유 입력(최대 18자)" onChange={handleReason} maxLength={18} value={outReason}>
                                </InputReason>
                            </OutRequestInput>
                            <OutRequestSubmitBtn onClick={handleSubmit}>
                                승인 요청
                            </OutRequestSubmitBtn>
                        </OutRequestContentBox>
                    </OutRequestForm>
                }
            </OutRequestBox>
        </OutRequestContainer>
    )
}