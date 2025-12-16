import styled from "styled-components";
import { dateAndDay, getFridayToSundayForWeekOf } from "../services/DateFormat"
import { useState, useEffect } from "react";

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

const TitleInfo = styled.p`
    color: #404040;
    font-family: Pretendard;
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
`

const TitleBox = styled.div`
    
`;

export default function OutListBox({ children, item, type = "outRequest" }) {
    // console.log(item);   
    const [strDate, setStrDate] = useState("");
    useEffect(() => {
        if (type === "outRequest") {
            setStrDate(dateAndDay(new Date(item?.created_at)));
        }
        else {
            setStrDate(dateAndDay(new Date()));
        }
    }, [item, type]);
    
    return (
        <OutRequestList>
            <OutRequestListTitle>
                <TitleLine />
                <TitleBox>
                    {item?.profiles && <TitleInfo>{item.profiles.stu_details.room}호 {item.profiles.name}</TitleInfo>}
                    <TitleInfo>{strDate}</TitleInfo>
                </TitleBox>
            </OutRequestListTitle>
            {children}
        </OutRequestList>
    )
};
