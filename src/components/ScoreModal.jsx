import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../assets/icon/modal_cancel.svg?react";
import ScorePlusIcon from "../assets/icon/score_plus.svg?react";
import ScoreMinusIcon from "../assets/icon/score_minus.svg?react";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalBox = styled.div`
    margin: 0 60px;
    width: 100%;
    border-radius: 14px;
    border: 1px solid #48BFA2;
    background: #FFF;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.10);
    padding: 24px 18px;
`;

const Header = styled.div`
    display: flex;
`;

const Title = styled.p`
    flex: 1;
    color: #404040;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 110% */
`;

const CloseBtn = styled.div`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
`;

const ScoreControl = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
`;

const ScoreValue = styled.p`
    flex: 1;
    color: #48BFA2;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 4px;
`;

const SubmitBtn = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 14px;
    background: #48BFA2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
`;

const ReasonInputWrapper = styled.div`
    display: flex;
    margin-top: 20px;
`;

const ReasonInput = styled.input`
    color: #404040;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    width: 95%;
    border: none;

    &:focus {
        outline: none;
    }
`;


export default function ScoreModal({ isOpen, onClose, selectedStudents, type }) {
    const navigation = useNavigate();
    const [score, setScore] = useState(1); // 점수 상태 관리
    const [reason, setReason] = useState("");
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    if (!isOpen) return null; // 열리지 않았으면 아무것도 안 그림

    // 이름 표시 로직
    const getDisplayName = () => {
        if (selectedStudents.length === 0) return "";
        const firstName = selectedStudents[0].name;
        if (selectedStudents.length === 1) return firstName;
        return `${firstName} 외 ${selectedStudents.length - 1}명`;
    };

    const handlerSubmit = () => {
        selectedStudents.forEach(element => {
            const korType = type === "plus" ? "상점" : "벌점"
            console.log(`${element.name}에게 ${score}점 ${korType} 부여`);
            async function fetchData() {
                const payload = {
                    user_id: element.id,
                    reason: reason,
                    score: score,
                    type: type,
                }
                console.log(payload);
                try {
                    const response = await fetch(`${SERVER_URL}/api/admin/meritlogs`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    })
                    if (response.ok) {
                        alert(`${korType} 부여 완료!`)
                    }
                    else {
                        alert("실패. 관리자한테 문의하세요");
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
            fetchData();
        });
        navigation(-1);
    }

    const handleReason = (e) => {
        setReason(e.target.value);
    }

    return (
        <Overlay onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <Header>
                    <Title>{getDisplayName()}</Title>
                    <CloseBtn onClick={onClose}>
                        <CloseIcon width="24" height="24" />
                    </CloseBtn>
                </Header>

                <ScoreControl>
                    <ScoreValue>{score}점</ScoreValue>
                    <ButtonGroup>
                        <ScorePlusIcon onClick={() => setScore(score + 1)} />
                        <ScoreMinusIcon onClick={() => setScore(Math.max(1, score - 1))} />
                    </ButtonGroup>
                </ScoreControl>

                <ReasonInputWrapper>
                    <ReasonInput type="text" placeholder="사유 입력(최대 30자)" onChange={handleReason} maxLength={30} value={reason} />
                </ReasonInputWrapper>

                <SubmitBtn onClick={handlerSubmit}>
                    {type === "plus" ? "상점주기" : "벌점주기"}
                </SubmitBtn>
            </ModalBox>
        </Overlay>
    );
}