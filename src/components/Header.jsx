import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    background: #48BFA2;
    display: flex;
    justify-content: space-between;
`;

const Logo = styled.img`
    width: 82px;
    margin: 18px 18px 20px;
`;

export default function Header() {
    const navigate = useNavigate();
    return (
        <Container>
            <Logo src="/images/logo_white.png" onClick={() => navigate("/home")} />
        </Container>
    );
}