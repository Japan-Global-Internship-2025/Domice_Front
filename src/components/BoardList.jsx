import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import DownArrowIcon from "../assets/icon/down_outline_arrow.svg?react";
import { useNavigate } from "react-router-dom";
import BoardContentInfo from "./BoardContentInfo";
import { UserContext } from '../services/UserContext';
import DeleteIcon from "../assets/icon/notice_delete.svg?react";

const Container = styled.div`
    position: relative;
`;

const OrderByWrapper = styled.div`
    display:flex;
    justify-content: end;
    margin-bottom: 20px;
`;

const OrderByBox = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    position: relative;
    width: fit-content;
`

const OrderByText = styled.p`
    color: rgba(64, 64, 64, 0.64);
    text-align: right;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
`;

const OrderByIcon = styled.div`
    
`;

const InvisibleSelect = styled.select`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;  /* 부모 div와 크기를 똑같이 맞춤 */
  height: 100%;
  opacity: 0;   /* 투명하게 만들어서 안 보이게 함 */
  cursor: pointer;
  appearance: none; /* 기본 화살표 제거 */
  z-index: 10;
`;

const ContentList = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
`;

const ContentBox = styled.div`
    display: flex;
    padding: 10px 14px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    border-radius: 14px;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
`;

const ContentInnerBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
`;

const ContentTexts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
`

const ContentTitle = styled.p`
    color: #404040;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const ContentPreview = styled.p`
    color: #696969;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
`;

const ContentBoxInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: stretch;
`;

const BoardDeleteBtn = styled.div`
`
const orderby_text = ['최신순 보기', '오래된순 보기'];
const orderby_sort = ['latest', 'oldest']

export default function BoardList(props) {
    const [orderby, setOrderby] = useState(0)
    const navigate = useNavigate();
    const type = props.type;
    const { isTeacher, user } = useContext(UserContext);
    const [data, setData] = useState(null);
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const fetchData = async () => {
        const response = await fetch(`${SERVER_URL}/api/${type}?sort=${orderby_sort[orderby]}`, {
            method: 'GET',
            credentials: 'include'
        })
        const temp = await response.json()
        // console.log(temp);
        setData(temp.data);
    }

    useEffect(() => {
        setData(null);
        fetchData();
    }, [type, orderby])

    const handlerBoardDelete = (id) => {
        const check = confirm(`정말 삭제하시겠습니까?`);
        if (check) {
            async function deletePost() {
                const response = await fetch(`${SERVER_URL}/api/${type}/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                })
                if (response.ok) {
                    alert("삭제되었습니다.")
                }
                else {
                    alert("서버 에러가 발생했습니다.")
                }
                fetchData();
            }
            deletePost();
        }
    }

    return (
        <Container>
            <OrderByWrapper>
                <OrderByBox>
                    <OrderByText>
                        {orderby_text[orderby]}
                    </OrderByText>
                    <OrderByIcon >
                        <DownArrowIcon />
                    </OrderByIcon>
                    <InvisibleSelect value={orderby} onChange={(e) => setOrderby(e.target.value)}>
                        <option value={0}>최신순</option>
                        <option value={1}>오래된순</option>
                    </InvisibleSelect>
                </OrderByBox>
            </OrderByWrapper>
            <ContentList>
                {data && data.map((item, idx) => {
                    // console.log(item);
                    const content = item.content;
                    let author_name;
                    if (type == "inquires") {
                        author_name = item.reply ? "답변 완료" : "답변 미완료";
                    }
                    else {
                        author_name = item.is_secret ? '익명' : item.profiles?.name;
                    }
                    return (
                        <ContentBox key={idx} >
                            <ContentInnerBox onClick={() => { navigate(`/board/${props.type}/${item.id}`) }}>
                                <ContentTexts>
                                    <ContentTitle>
                                        {item.title}
                                    </ContentTitle>
                                    <ContentPreview>
                                        {content.length > 28 ? content.slice(0, 28) + "..." : content}
                                    </ContentPreview>
                                </ContentTexts>
                                <ContentBoxInfo>
                                    <BoardContentInfo info1={item.created_at} info2={author_name} />
                                </ContentBoxInfo>
                            </ContentInnerBox>
                            {(isTeacher || user?.id === item.user_id) && <BoardDeleteBtn onClick={() => handlerBoardDelete(item.id)}>
                                <DeleteIcon />
                            </BoardDeleteBtn>}
                        </ContentBox>
                    )
                })}
            </ContentList>
        </Container>
    )
};
