import styled from "styled-components";
import NoticeIcon from "../assets/icon/notice.svg?react";
import ArrowIcon from "../assets/icon/top_right_arrow.svg?react";
import { useState, useEffect } from "react";

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
    color: ${prorp => prorp.$isActive? '#000000' : '#B3B3B3'};
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
`;

export default function TodayNotice() {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const [noticeCount, setNoticeCount] = useState(0);
    useEffect(() => {
        async function fetchNoticeCount() {
            const response = await fetch(`${SERVER_URL}/api/notices/today-count`, {
                method: 'GET',
                credentials: 'include',
            })
            const result = await response.json()
            setNoticeCount(result.data.count)
        }
        fetchNoticeCount();
    }, [])

    return (
        <TodayNoticeContainer>
            <TodayNoticeBox>
                <NoticeIcon />
                <TodayNoticeText $isActive={noticeCount > 0}>
                    {noticeCount ? `오늘의 공지가 ${noticeCount}개 입니다.` : "오늘공지가 없습니다"}
                </TodayNoticeText>
            </TodayNoticeBox>
            <ArrowIcon />
        </TodayNoticeContainer>
    )
}