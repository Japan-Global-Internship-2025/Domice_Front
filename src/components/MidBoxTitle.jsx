import styled from "styled-components";

const BoxTitle = styled.p`
    align-self: stretch;
    text-align: center;
    color: #404040;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export default function MidBoxTitle(props) {
    return (
        <BoxTitle>
            {props.text}
        </BoxTitle>
    )
}