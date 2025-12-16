import styled from "styled-components";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";
import BoardInNav from "../components/BoardInNav";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    height: 100dvh; 
    display: flex;
    flex-direction: column;
`;

const Main = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 32px 24px 92px 24px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
`;

const FormBox = styled.div`
    flex-grow: 1;
    border-radius: 14px;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    padding: 24px;
    width: 100%;
    box-sizing: border-box;
`;

const InputTitle = styled.input`
    height: 20px;
    align-self: stretch;
    color: #404040;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */
    border: none;
    &:focus {outline:none;}
`

const Line = styled.div`
    height: 1px;
    align-self: stretch;
    background: rgba(64, 64, 64, 0.12);
    margin-top: 8px;
    margin-bottom: 12px;
`;

const InputContent = styled.textarea`
    width: 100%;
    height: 90%;
    color: #404040;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    &:focus {outline:none;}
`

const SubmitBox = styled.div`
    margin-top: 16px;
    display: flex;
    gap: 8px;
`;

const SubmitBtn = styled.div`
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

export default function BoardWrite(props) {
    const navigate = useNavigate()
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const SERVER_URL = import.meta.env.VITE_SERVER_URL

    function submitBoardService(type, is_secret=null) {
        const data = {
            title: title,
            content: content,
        }
        if (is_secret) data.is_secret = is_secret;
        console.log(data);
        async function submitData() {
            const response = await fetch(`${SERVER_URL}/api/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            if (response.ok) {
                alert("등록 성공!")
                navigate("/board");
            }
        }
        submitData();
    }

    function submitBoardAll() {
        const is_secret = confirm("익명으로 하시겠습니까?");
        submitBoardService('posts', is_secret)
    }

    function submitBoardPriavte() {
        submitBoardService('inquires')
    }

    return (
        <Container>
            <Header />
            <BoardInNav />
            <Main>
                <FormBox>
                    <InputTitle type="text" placeholder="제목" onChange={(e) => { setTitle(e.target.value) }} />
                    <Line />
                    <InputContent placeholder="내용" onChange={(e) => { setContent(e.target.value) }} />
                </FormBox>
                <SubmitBox>
                    <SubmitBtn $background={"#fff"} $color={"#48BFA2"} onClick={() => { submitBoardAll() }}>
                        게시판 올리기
                    </SubmitBtn>
                    <SubmitBtn $background={"#48BFA2"} $color={"#fff"} onClick={() => { submitBoardPriavte() }}>
                        1대1 문의하기
                    </SubmitBtn>
                </SubmitBox>
            </Main>
            <Navigation idx={3} />
        </Container>
    )
};
