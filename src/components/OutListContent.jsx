import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContentBox = styled.div`
    display: flex;
    padding: 8px 14px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: 14px;
    border: 0.8px solid rgba(64, 64, 64, 0.24);
`;

const ContentInnerBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ContentDate = styled.p`
    height: 17px;
    align-self: stretch;
    color: #818181;
    font-family: Pretendard;
    font-size: 10px;
    font-weight: 400;
    line-height: 22px;
`

const ContentReason = styled.p`
    color: #404040;
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const ContentCheck = styled.div`
    display: flex;
    gap: 6px;
`;

const CheckText = styled.p`
    display: flex;
    padding: 1px 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background: ${(props) => props.$Background};
    align-self: stretch;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-weight: 600;
    line-height: 22px;
`;

export default function OutListContent(props) {
    const navigate = useNavigate();
    const isTeacher = props.isTeacher;
    const id = props.id;
    const status = props.status;
    const [strStatus, setStrStatus] = useState('');
    const [statusBackground, setStatusBackground] = useState('#fff');
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        if (status === 0) {
            setStrStatus('대기');
            setStatusBackground('#686868');
        }
        else if (status === 1) {
            setStrStatus('승인');
            setStatusBackground('#3D8EFF');
        }
        else {
            setStrStatus('거절');
            setStatusBackground('#FF2929');
        }
    }, [status]);

    const handleApprove = async (approve) => {
        const strApprove = approve ? "승인" : "거절"
        const check = confirm(`${strApprove} 처리를 하시겠습니까?.`);
        if (check) {
            async function fetchData() {
                try {
                    const response = await fetch(`${SERVER_URL}/api/leave/check`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: id, approval: approve })
                    })
                    if (response.ok) {
                        alert(`${strApprove} 완료!`)
                        navigate(0);
                    }
                    else {
                        alert(`${strApprove} 실패. 관리자한테 문의하세요`);
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
            fetchData();
        }
    }

    return (
        <ContentBox>
            <ContentInnerBox>
                <ContentDate>
                    신청 : {props.date}
                </ContentDate>
                <ContentReason>
                    {props.reason}
                </ContentReason>
            </ContentInnerBox>
            {isTeacher && status == 0
                ?
                <ContentCheck >
                    <CheckText $Background={'#3D8EFF'} onClick={() => handleApprove(true)}>
                        승인
                    </CheckText>
                    <CheckText $Background={'#FF2929'} onClick={() => handleApprove(false)}>
                        거절
                    </CheckText>
                </ContentCheck>
                :
                <ContentCheck>
                    <CheckText $Background={statusBackground}>
                        {strStatus}
                    </CheckText>
                </ContentCheck>}
        </ContentBox>
    )
}