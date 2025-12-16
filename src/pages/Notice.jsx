import styled from "styled-components";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import TodayNotice from "../components/TodayNotice";
import LeftBoxTitle from "../components/LeftBoxTitle";
import NewNoticeIcon from "../assets/icon/new_notice.svg?react"
import { dataAndDayAndTime, isLastNDays } from "../services/date_format"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div``;

const Main = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 40px 24px 60px 24px;
    background-color: #f9f9f9;
`;

const TodayNoticeBox = styled.div``;

const ListTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

const NoticeList = styled.div`
    margin-top: 40px;
`;

const ListContent = styled.div`
    margin-top: 20px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
`;

const ListContentBox = styled.div`
    display: flex;
    gap: 4px;
    padding: 14px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 14px;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
`;

const NoticeListBoxTitle = styled.p`
    align-self: stretch;
    color: #404040;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
`

const NoticeListBoxContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const DetailText = styled.div`
    color: rgba(64, 64, 64, 0.50);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    display: flex;
    align-items: center;
    align-self: stretch;
`

const NewNoticeIconBox = styled.div`
    display: flex;
    width: 12px;
    height: 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 2px;
    background: rgba(255, 41, 41, 0.20);
    margin-left: 4px;
`;

export default function Notice() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const SERVER_URL = import.meta.env.VITE_SERVER_URL
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${SERVER_URL}/api/notices`, {
                method: 'GET'
            })
            const temp = await response.json()
            console.log(temp);
            setData(temp.data);
        }
        fetchData();
    }, [])

    return (
        <Container>
            <Header />
            <Main>
                <TodayNoticeBox>
                    <LeftBoxTitle text={"오늘의 공지"} />
                    <TodayNotice />
                </TodayNoticeBox>
                <NoticeList>
                    <ListTitle>
                        <LeftBoxTitle text={"전체 공지"} />
                    </ListTitle>
                    <ListContent>
                        {data && data.map((item, idx) => {
                            const date = new Date(item.created_at)
                            const str_date = dataAndDayAndTime(date)
                            const isLast3Days = isLastNDays(3, date)
                            return (
                                <ListContentBox key={idx} onClick={() => { navigate(`/notice/${item.id}`) }}>
                                    <NoticeListBoxTitle>
                                        {item.title}
                                    </NoticeListBoxTitle>
                                    <NoticeListBoxContent>
                                        <DetailText>
                                            {item.target}학년
                                        </DetailText>
                                        <DetailText>
                                            {str_date} · {item.author} 선생님
                                            {isLast3Days && <NewNoticeIconBox><NewNoticeIcon /></NewNoticeIconBox>}
                                        </DetailText>
                                    </NoticeListBoxContent>
                                </ListContentBox>
                            )
                        })}
                    </ListContent>
                </NoticeList>
            </Main>
            <Navigation idx={1} />
        </Container>
    )
}