import styled from "styled-components";
import BoardList from "../components/BoardList";
import { useState, useEffect } from "react";

const Container = styled.div`
`;

// const data = [
//         {
//             id: 1,
//             title: "419호 조명 나갔어요",
//             author_name: "민재",
//             content: "조명이 나갔다 켜졌다 해요 빨리 고쳐주세요....",
//             user_id: "3c1b3b5b-xxxx-xxxx-xxxx",
//             reply: false,
//             created_at: "2025-01-03T11:20:00Z",
//             updated_at: "2025-01-03T11:20:00Z"
//         },
//         {
//             id: 2,
//             title: "윗 방이 너무 시끄러워요",
//             author_name: null,
//             content: "윗 방이 자꾸 쿵쿵 거려요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
//             user_id: "3c1b3b5b-xxxx-xxxx-xxxx",
//             reply: true,
//             created_at: "2025-12-01T11:20:00Z",
//             updated_at: "2025-12-01T11:20:00Z"
//         }
//     ]

export default function BoardPrivate() {
    const [data, setData] = useState(null);
    const SERVER_URL = import.meta.env.VITE_SERVER_URL
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${SERVER_URL}/api/inquires`, {
                method: 'GET',
                credentials: 'include'
            })
            const temp = await response.json()
            console.log(temp);
            setData(temp.data);
        }
        fetchData();
    }, [])
    return (
        <Container>
            <BoardList data={data} type={"private"} />
        </Container>
    )
};
