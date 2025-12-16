import styled from "styled-components";
import { useState } from "react";
import ArrowIcon from "../assets/icon/right_outline_arrow.svg?react";
import LeftBoxTitle from "./LeftBoxTitle";

const Container = styled.div`
    margin-top: 40px;
`;

const ContainerTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

const ToDetail = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    &:focus, &:active {
        outline: none;
        box-shadow: none;
    }
`;

const GoDetailText = styled.span`
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

export default function SelectRemain() {
    const data = [

    ];
    const [remainDetail, setRemainDetail] = useState(false);
    return (
        <Container>
            <ContainerTitle>
                <LeftBoxTitle text={"잔류 여부 선택"} />
                <ToDetail onClick={() => { setRemainDetail(!remainDetail) }}>
                    <GoDetailText>
                        {remainDetail ? '잔류내역 숨기기' : '잔류내역 보기'}
                    </GoDetailText>
                    <GoDetailIcon $rotate={remainDetail}>
                        <ArrowIcon />
                    </GoDetailIcon>
                </ToDetail>
            </ContainerTitle>

        </Container>
    );
};
