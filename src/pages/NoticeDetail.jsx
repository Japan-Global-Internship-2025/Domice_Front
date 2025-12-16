import styled from "styled-components";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataAndDayAndTime } from "../services/date_format"

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Main = styled.div`
    height: 100%;
    overflow-y: auto;
    padding: 30px 24px 60px 24px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const ContentBox = styled.div`
    flex-grow: 1;
    display: flex;
    padding: 32px 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
    border-radius: 24px;
    border: 1px solid #48BFA2;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
`;

const TitleText = styled.p`
    color: #404040;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
`;

const OtherTitleText = styled.p`
    color: rgba(64, 64, 64, 0.50);
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    line-height: 22px;
`;

const Line = styled.div`
    margin: 10px 0px;
    width: 100%;
    height: 1px;
    background: rgba(64, 64, 64, 0.12);
`;

const Content = styled.p`
    color: rgba(64, 64, 64, 0.80);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`

const MoveBox = styled.div`
    display: flex;
    gap: 8px;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const MoveBtn = styled.div`
    flex-grow: 1;
    display: flex;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    border: 1px solid #48BFA2;
    background: ${props => props.$background};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    color: ${props => props.$color};
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
`

export default function NoticeDetail(props) {
    const [data, setData] = useState(null);
    const [postId, setPostId] = useState(null);
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const id = segments[segments.length - 1];
    const SERVER_URL = import.meta.env.VITE_SERVER_URL
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${SERVER_URL}/api/notices/${id}`, {
                method: 'GET'
            })
            const temp = await response.json()
            if (!temp.success || postId < 0) {
                window.history.back();
                alert("마지막입니다.");
            }
            console.log(temp);
            setData(temp.data);
        }
        setPostId(Number(id));
        fetchData();
    }, [navigate])

    return (
        <Container>
            <Header />
            <Main>
                {data &&
                    <ContentBox>
                        <Title>
                            <TitleText>{data.title}</TitleText>
                            <OtherTitleText>{data.author} 선생님</OtherTitleText>
                            <OtherTitleText>{dataAndDayAndTime(new Date(data.created_at))}</OtherTitleText>
                        </Title>
                        <Line></Line>
                        <Content>
                            {data.content}
                        </Content>
                    </ContentBox>
                }
                <MoveBox>
                    <MoveBtn $background={"#fff"} $color={"#48BFA2"} onClick={() => navigate(`/notice/${postId - 1}`)}>
                        이전글
                    </MoveBtn>
                    <MoveBtn $background={"#48BFA2"} $color={"#fff"} onClick={() => navigate(`/notice/${postId + 1}`)}>
                        다음글
                    </MoveBtn>
                </MoveBox>
            </Main>
            <Navigation idx={1} />
        </Container>
    )
};
