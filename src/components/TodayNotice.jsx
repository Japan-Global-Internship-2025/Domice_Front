import styled from "styled-components";
import NoticeIcon from "../assets/icon/notice.svg?react";
import ArrowIcon from "../assets/icon/top_right_arrow.svg?react";

const TodayNoticeContainer = styled.div`
    margin-top: 20px;
    display: flex;
    padding: 12px 14px;
    gap: 14px;
    align-self: stretch;
    align-items: center;
    border-radius: 50px;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    justify-content: space-between;

    svg {
        width: 12px;
        height: 12px;
    }
`

const TodayNoticeBox = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    align-self: stretch;

    svg {
        width: 20px;
        height: 18.353px;
        
        path {
            fill: #48BFA2;
            fill-opacity: 1;
        }
    }
`;

const TodayNoticeText = styled.p`
    color: #B3B3B3;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
`;

export default function TodayNotice() {
    return (
        <TodayNoticeContainer>
            <TodayNoticeBox>
                <NoticeIcon />
                <TodayNoticeText>
                    오늘의 공지가 없습니다.
                </TodayNoticeText>
            </TodayNoticeBox>
            <ArrowIcon />
        </TodayNoticeContainer>
    )
}