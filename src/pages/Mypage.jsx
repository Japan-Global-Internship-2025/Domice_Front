import styled from "styled-components";
import Header from "../components/Header"
import Navigation from "../components/Navigation";
import ArrowIcon from "../assets/icon/right_outline_arrow.svg?react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoMyBoardIcon from "../assets/icon/mypage_go_myboard.svg?react"
import { dateAndDay } from "../services/date_format"

const Container = styled.div``;

const Main = styled.div`
    padding: 32px 24px 60px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const UserInfoContainer = styled.div`
    display: flex;
    padding: 0 14px;
    align-items: center;
    align-self: stretch;
    border-radius: 14px;
    background: #FFF;
`;

const UserProfile = styled.div`
    padding: 22px 0px;
    margin-right: 14px;
    width: 64px;
    height: 64px;
`;

const UserProfileImg = styled.img`
    width: 100%;
    height: 100%;
    background-image: url(${props => props.src});
    border-radius: 100px;
`;

const UserInfoBox = styled.div`
    
`;

const UserInfo = styled.div`
    display: flex;
    gap: 8px;
`;

const UserName = styled.p`
    color: #404040;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 110% */
`;

const UserRoom = styled.p`
    color: #404040;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
`;

const UserSchool = styled.p`
    color: rgba(64, 64, 64, 0.64);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 183.333% */
`;

const UserScoreBox = styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const PlusMinusScore = styled.div`
    width: 100%;
    display: flex;
    gap: 6px;
`;

const ScoreInnerBox = styled.div`
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 24px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 14px;
    border: 1px solid #48BFA2;
    background: ${props => props.$background};
`;

const InnerBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${props => props.$justify};
    
`;

const ScoreBoxText = styled.p`
    color: ${props => props.$color};
    font-family: Pretendard;
    font-size: ${props => props.$size}px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 122.222% */
`;

const TotalScoreContainer = styled.div` 
    display: flex;
    flex-direction: column;
    padding: 18px 16px;
    gap: 20px;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 14px;
    background: #FFF;
`;

const TotalScoreBox = styled.div`
    display: flex;
`

const TotalScoreText = styled.div`
    color: #404040;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1 0 0;
`

const TotalScoreDatailBtn = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const GoDatailText = styled.p`
    color: rgba(64, 64, 64, 0.64);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 183.333% */
`;

const GoDetailIcon = styled.div`
    display: flex;
    align-items: center;
    width: 12px; 
    height: 12px;
    svg {
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
        ${props => props.$rotate && 'transform: rotate(90deg)'};
        &:focus {
            outline: none;
        }
    }
`;

const LogoutBtn = styled.div`
    display: flex;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 14px;
    background: #FFF;
`

const LogoutBtnText = styled.p`
    display: flex;
    align-items: center;
    color: #FF2929;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
`;

const MyBoard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 14px;
`;

const GoMyBoardBtn = styled.div`
    display: flex;
    padding: 16px;
    align-items: center;
    gap: 2px;
    align-self: stretch;
    border-radius: ${props => props.$position == 'top' ? '14px 14px 0.5px 0' : '0.5px 0 14px 14px'};
    border: 0px solid rgba(64, 64, 64, 0.14);
    background: #FFF;
`

const GoBoardBtnText = styled.p`
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1 0 0;color: #404040;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
`;

const LogBox = styled.div`
    
`;

const LogBoxTitle = styled.p`
    color: #404040;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; 
`

const LogBoxContent = styled.div`
    display: flex;
    justify-content: space-around;
`;

const LogBoxReason = styled.p`
    flex: 1 1 0;
    color: rgba(64, 64, 64, 0.64);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`

const LogBoxDate = styled.p`
    color: rgba(64, 64, 64, 0.64);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export default function Mypage() {
    const navigate = useNavigate();
    const [data, setData] = useState(null)
    const [scoreDetail, setScoreDetail] = useState(false);
    const [meritlogs, setMeritlogs] = useState(null);
    const SERVER_URL = import.meta.env.VITE_SERVER_URL
    useEffect(() => {
        async function fecthData() {
            const response = await fetch(`${SERVER_URL}/api/profile`, {
                method: 'GET',
                credentials: 'include'
            })
            const temp = await response.json()
            if (!response.ok) {
                alert("로그인이 필요합니다.")
                navigate("/")
            }
            console.log(temp);
            setData(temp.data);
        }
        fecthData();
    }, []);

    useEffect(() => {
        async function fecthData() {
            const response = await fetch(`${SERVER_URL}/api/meritlogs`, {
                method: 'GET',
                credentials: 'include'
            })
            const temp = await response.json()
            console.log(temp);
            setMeritlogs(temp.data);
        }
        fecthData();
    }, []);

    const logoutHandler = () => {
        async function logout() {
            const response = await fetch(`${SERVER_URL}/api/auth/logout`, {
                method: 'GET',
                credentials: 'include'
            })
            const temp = await response.json()
            if (response.ok) {
                navigate('/')
            }
            console.log(temp);
            setData(temp.data);
        }
        logout();
    }


    return (
        <Container>
            <Header />
            {data && <Main>
                <UserInfoContainer>
                    <UserProfile>
                        <UserProfileImg src={data.profile_img} />
                    </UserProfile>
                    <UserInfoBox>
                        <UserInfo>
                            <UserName>{data.name}</UserName>
                            <UserRoom>{data.room}호</UserRoom>
                        </UserInfo>
                        <UserInfo>
                            <UserSchool>미림마이스터고등학교 {data.stu_num.slice(0, 1)}학년 {data.stu_num.slice(1, 2)}반</UserSchool>
                        </UserInfo>
                    </UserInfoBox>
                </UserInfoContainer>
                <UserScoreBox>
                    <PlusMinusScore>
                        <ScoreInnerBox $background="#48BFA2">
                            <InnerBox $justify="start">
                                <ScoreBoxText $color="#fff" $size="18">상점</ScoreBoxText>
                            </InnerBox>
                            <InnerBox $justify="end">
                                <ScoreBoxText $color="#fff" $size="24">{data.plus_score}점</ScoreBoxText>
                            </InnerBox>
                        </ScoreInnerBox>
                        <ScoreInnerBox $background="#fff">
                            <InnerBox $justify="start">
                                <ScoreBoxText $color="#48BFA2" $size="18">벌점</ScoreBoxText>
                            </InnerBox>
                            <InnerBox $justify="end">
                                <ScoreBoxText $color="#48BFA2" $size="24">{data.minus_score}점</ScoreBoxText>
                            </InnerBox>
                        </ScoreInnerBox>
                    </PlusMinusScore>
                    <TotalScoreContainer onClick={() => { setScoreDetail(!scoreDetail) }}>
                        <TotalScoreBox>
                            <TotalScoreText>
                                총 상점 {data.plus_score - data.minus_score}점
                            </TotalScoreText>
                            <TotalScoreDatailBtn>
                                <GoDatailText>{scoreDetail ? '상벌점 내역 숨기기' : '상벌점 내역 보기'}</GoDatailText>
                                <GoDetailIcon $rotate={scoreDetail}>
                                    <ArrowIcon />
                                </GoDetailIcon>
                            </TotalScoreDatailBtn>
                        </TotalScoreBox>
                        {scoreDetail && meritlogs.map((item, idx) => {
                            return (
                                <LogBox key={idx}>
                                    <LogBoxTitle>{item.log_type} {item.score}점</LogBoxTitle>
                                    <LogBoxContent>
                                        <LogBoxReason>{item.reason}</LogBoxReason>
                                        <LogBoxDate>{dateAndDay(new Date(item.created_at))}</LogBoxDate>
                                    </LogBoxContent>
                                </LogBox>
                            )
                        })}
                    </TotalScoreContainer>
                </UserScoreBox>
                <MyBoard>
                    <GoMyBoardBtn $position='top'>
                        <GoBoardBtnText>내가 쓴 글 보기</GoBoardBtnText>
                        <GoMyBoardIcon />
                    </GoMyBoardBtn>
                    <GoMyBoardBtn $position='bottom'>
                        <GoBoardBtnText>1대1 문의 내역 확인</GoBoardBtnText>
                        <GoMyBoardIcon />
                    </GoMyBoardBtn>
                </MyBoard>
                <LogoutBtn onClick={() => confirm("정말 로그아웃 하시겠습니까?") && logoutHandler}>
                    <LogoutBtnText>로그아웃</LogoutBtnText>
                </LogoutBtn>
            </Main>}
            <Navigation idx={4} />
        </Container>
    )
}