import styled from "styled-components";
import { getRelativeTime } from "../services/DateFormat";
import DivideLine from "../assets/icon/board_info_divide_line.svg?react";

const TimeAndAuthor = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
`;

const DivideLineWapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InfoText = styled.p`
    color: #ADADAD;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
`;

export default function BoardContentInfo(props) {
    // console.log(props);
    return (
        <TimeAndAuthor>
            <InfoText>
                {getRelativeTime(props.info1)}
            </InfoText>
            <DivideLineWapper>
                <DivideLine />
            </DivideLineWapper>
            <InfoText>
                {props.info2}
            </InfoText>
        </TimeAndAuthor>
    )
};
