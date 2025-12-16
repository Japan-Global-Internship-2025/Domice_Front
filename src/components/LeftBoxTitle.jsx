import styled from "styled-components";

const BoxTitle = styled.p`
    margin-left: 9px;
    color: #404040;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export default function LeftBoxTitle(props) {
    return (
        <BoxTitle>
            {props.text}
        </BoxTitle>
    )
}