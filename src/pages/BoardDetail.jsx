import styled from "styled-components";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardContentInfo from "../components/BoardContentInfo";
import BoardInNav from "../components/BoardInNav";

const Container = styled.div``;

const Main = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 32px 24px 60px 24px;
    background-color: #f9f9f9;
`;

const ContentBox = styled.div`
    border-radius: 14px;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    padding: 20px 24px 14px 24px;
`;

const Title = styled.p`
    color: #404040;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const Content = styled.p`
    color: #696969;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 20px;
`
const Info = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: end;
`;

export default function BoardDetail(props) {
    const type = props.type;
    const [data, setData] = useState(null);
    const [info2, SetInfo2] = useState(null);
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const id = segments[segments.length - 1];
    const SERVER_URL = import.meta.env.VITE_SERVER_URL
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${SERVER_URL}/api/${type == 'all' ? 'posts' : 'inquires'}/${id}`, {
                method: 'GET',
                credentials: 'include'
            })
            const temp = await response.json()
            const fetchedData = temp.data;
            setData(fetchedData);
            if (type == "private") {
                SetInfo2(fetchedData?.reply ? "답변 완료" : "답변 미완료");
            }
            else {
                SetInfo2(fetchedData?.is_secret ? '익명' : fetchedData?.profiles?.name);
            }

        }
        fetchData();
    }, [navigate])

    return (
        <Container>
            <Header />
            <BoardInNav type={type} />
            <Main>
                {data && <ContentBox>
                    <Title>
                        {data.title}
                    </Title>
                    <Content>
                        {data.content}
                    </Content>
                    <Info>
                        <BoardContentInfo info1={data.created_at} info2={info2} />
                    </Info>
                </ContentBox>}
            </Main>
            <Navigation idx={3} />
        </Container>
    )
};

// function fecthData(id, type) {
//     const datas = type == 'all' ? data_all : data_private;
//     const result = datas.find(item => item.id == id);
//     return result || {};
// }
