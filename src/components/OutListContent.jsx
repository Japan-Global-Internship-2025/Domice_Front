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
    background: ${(props) => props.$isApproved ? "#3D8EFF" : "#FF2929"};
    align-self: stretch;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-weight: 600;
    line-height: 22px;
`;

export default function OutRequestContent(props) {
    const isTeacher = props.isTeacher;
    const user_id = props.user_id;

    const handleApprove = async (approve) => {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        alert(`${user_id}\n${approve ? "승인" : "거절"} 처리되었습니다.`);
    }

    return (
        <ContentBox>
            <ContentInnerBox>
                <ContentDate>
                    {props.date}
                </ContentDate>
                <ContentReason>
                    {props.reason}
                </ContentReason>
            </ContentInnerBox>
            {isTeacher
                ?
                <ContentCheck >
                    <CheckText $isApproved={true} onClick={() => handleApprove(true)}>
                        승인
                    </CheckText>
                    <CheckText $isApproved={false} onClick={() => handleApprove(false)}>
                        거절
                    </CheckText>
                </ContentCheck>
                :
                <ContentCheck>
                    <CheckText $isApproved={props.ok}>
                        {props.ok ? "승인" : "거절"}
                    </CheckText>
                </ContentCheck>}
        </ContentBox>
    )
}