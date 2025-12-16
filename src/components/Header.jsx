import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    background: #48BFA2;
`;

const Logo = styled.img`
    width: 82.042px;
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