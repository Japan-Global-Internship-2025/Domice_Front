import styled from "styled-components";
import { useState, useEffect } from "react";
import ArrowIcon from "../assets/icon/right_outline_arrow.svg?react";
import OutRequestContent from "./OutRequestContent";
import LeftBoxTitle from "./LeftBoxTitle";
import { dateAndDay } from "../services/date_format"

const OutRequestContainer = styled.div`
    width: 100%;
    margin-top: 45px;
`;

const OutRequsetTitle = styled.div`
    display: flex;
    justify-content: space-between;
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

const OutRequestList = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px; 
`;

const OutRequestBox = styled.div`
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

const OutRequestBoxTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    align-self: stretch;
`;

const TitleLine = styled.div`
    width: 3px;
    height: 18px;
    border-radius: 1.5px;
    background: #404040;
`;

const TitleDate = styled.p`
    color: #404040;
    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
`

const CalendarIconBox = styled.div`
    width: 13.5px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CalendarInput = styled.input.attrs({
    type: 'date'
})`
    color: transparent; 
    background-color: transparent; 
    width: 13.5px;
    height: 15px;
    border: none;
    cursor: pointer;
    -webkit-appearance: none; 
    -moz-appearance: none;
    appearance: none;
    background-image: url('/images/calendar.svg');
    background-repeat: no-repeat;
    background-position: center; 
    background-size: 100% 100%;

    &::-webkit-calendar-picker-indicator {
        width: 100%;
        height: 100%;
        cursor: pointer; 
    }
`;

export default function OutRequest(props) {
    const data = props.outRequest;
    const [outRequsetDetail, setOutRequestDetail] = useState(false);
    console.log(data)

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
            <OutRequestList>
                {outRequsetDetail && data.map((item, idx) => {
                    const str_date1 = dateAndDay(new Date(item.created_at))
                    const str_date2 = dateAndDay(new Date(item.leave_date));
                    return (
                        <OutRequestBox key={idx}>
                            <OutRequestBoxTitle>
                                <TitleLine />
                                <TitleDate>{str_date1}</TitleDate>
                                <CalendarIconBox>
                                    <CalendarInput />
                                </CalendarIconBox>
                            </OutRequestBoxTitle>
                            <OutRequestContent date={str_date2} reason={item.reason} ok={item.is_approved} />
                        </OutRequestBox>
                    )
                })}
            </OutRequestList>
        </OutRequestContainer>
    )
}