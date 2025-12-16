import styled from "styled-components";
import BoardList from "../components/BoardList";
import { useState, useEffect } from "react";

const Container = styled.div`
`;

export default function BoardMain() {
    // const data = [
    //     {
    //         id: 1,
    //         title: "기숙사 소음 관련 안내",
    //         author_name: "민재",
    //         content: "대충 내용. 샬라샬라샬라샬라샬라샬라샬라샬라샬라샬라샬라샬라샬라샬라",
    //         user_id: "3c1b3b5b-xxxx-xxxx-xxxx",
    //         is_secret: false,
    //         created_at: "2025-01-03T11:20:00Z",
    //         updated_at: "2025-01-03T11:20:00Z"
    //     },
    //     {
    //         id: 2,
    //         title: "신채은바보",
    //         author_name: null,
    //         content: "대충 바보같다는 내용. 샬라샬라샬라샬라샬라샬라샬라샬라샬라샬라샬라샬라샬라샬라",
    //         user_id: "3c1b3b5b-xxxx-xxxx-xxxx",
    //         is_secret: true,
    //         created_at: "2025-12-01T11:20:00Z",
    //         updated_at: "2025-12-01T11:20:00Z"
    //     }
    // ]
    const [data, setData] = useState(null);
    const SERVER_URL = import.meta.env.VITE_SERVER_URL
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${SERVER_URL}/api/posts`, {
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
            <BoardList data={data} type={"all"} />
        </Container>
    )
};
