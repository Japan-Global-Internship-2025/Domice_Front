import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputRadio from '../components/InputRadio';

const Container = styled.div`
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(72, 191, 162, 0.13) 74.58%, rgba(72, 191, 162, 0.24) 99%);
    height: 100dvh;
`;

const Logo = styled.img`
    display: block;
    margin: 0 auto;
    padding-top: 120px;
    width: 158.929px;
    height: 47.151px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
`;

const InfoContainer = styled.div`
    display: flex;
    width: 100%;
    height: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    border: 1px solid #48BFA2;
    background: #48BFA2;
    gap: 14px;
`;
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const InfoLabel = styled.span`
    color: rgba(255, 255, 255, 0.64);
    text-align: right;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

const InfoText = styled.span`
    color: #00765A;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
`;

const InputLabel = styled.p`
    align-self: stretch;
    color: #404040;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
`;

const InputRoomNumber = styled.input`
    display: flex;
    height: 44px;
    padding: 0 16px;
    align-items: center;
    gap: 2px;
    align-self: stretch;
    border-radius: 14px;
    border: 1px solid #48BFA2;
    background: #FFF;
`;

const UserContainer = styled.div`
    margin: 80px auto 0 auto;
    display: flex;
    width: 309px;
    flex-direction: column;
    align-items: flex-start;
    gap: 36px;
`;

const FinishBtn = styled.button`
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border: none;
    border-radius: 14px;
    background: #48BFA2;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`;

const regionOptions = [
    { label: '수도권', value: 0 },
    { label: '지방', value: 1 },
];
const genderOptions = [
    { label: '남성', value: 0 },
    { label: '여성', value: 1 },
];

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    async function finish() {
        if (!roomNumber) {
            alert('호실를 입력해주세요');
            return;
        }
        else if (selectedRegion === null) {
            alert('주거지역을 선택해주세요');
            return;
        }
        else if (selectedGender === null) {
            alert('성별을 선택해주세요');
            return;
        }

        if (!(roomNumber >= 401 && roomNumber <= 418) && !(roomNumber >= 501 && roomNumber <= 518)) {
            alert('올바른 호실을 입력해주세요');
            return;
        }

        const userData = {
            id: user.id,
            name: user.given_name,
            room: roomNumber,
            region: regionOptions[selectedRegion].value,
            gender: genderOptions[selectedGender].value,
            email: user.email,
            profile_img: user.picture,
            stu_num: user.stu_num,
        };
        console.log(userData);

        try {
            console.log("회원가입 시도");
            const response = await fetch(`${SERVER_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            console.log('Server Response:', data);
            alert('회원가입이 완료되었습니다!');
            if (data.success) {
                navigate('/home');
            }
            return data;
        } catch (error) {
            console.error('Error sending user data:', error);
            alert('회원가입 실패')
        }
    };

    useEffect(() => {
        const parsedHash = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = parsedHash.get('access_token');
        const fetchUserInfo = async (accessToken) => {
            try {
                console.log("로그인 시도");
                const response = await fetch(`${SERVER_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        accessToken: accessToken
                    }),
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.data)

                    if (data.data.join) {
                        navigate('/home');
                    }
                    setUser(data.data);
                }
                else {
                    alert("학교 계정으로 로그인해주세요.");
                    navigate('/');
                    return;
                }

            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo(accessToken);
    }, []);

    return (
        <Container>
            <Logo src="/images/logo_green.png" alt="Logo" />
            <UserContainer>
                <InfoContainer>
                    <UserInfo>
                        <InfoLabel>
                            이름
                        </InfoLabel>
                        <InfoText>
                            {user ? user.given_name : 'Loading...'}
                        </InfoText>
                    </UserInfo>
                    <UserInfo>
                        <InfoLabel>
                            학번
                        </InfoLabel>
                        <InfoText>
                            {user ? user.stu_num : 'Loading...'}
                        </InfoText>
                    </UserInfo>
                </InfoContainer>
                <InputContainer>
                    <InputBox>
                        <InputLabel>
                            호실을 입력해주세요.
                        </InputLabel>
                        <InputRoomNumber type="number" placeholder="ex) 401" name='room' onChange={(e) => { setRoomNumber(e.target.value) }} />
                    </InputBox>
                    <InputBox>
                        <InputLabel>
                            주거지역을 선택해주세요.
                        </InputLabel>
                        <InputRadio
                            options={regionOptions}
                            name="region"
                            selectedValue={selectedRegion}
                            onChange={setSelectedRegion}
                        />
                    </InputBox>
                    <InputBox>
                        <InputLabel>
                            성별을 선택해주세요.
                        </InputLabel>
                        <InputRadio
                            options={genderOptions}
                            name="gender"
                            selectedValue={selectedGender}
                            onChange={setSelectedGender}
                        />
                    </InputBox>
                </InputContainer>
                <FinishBtn onClick={() => finish()}>
                    회원가입하기
                </FinishBtn>
            </UserContainer>
        </Container>
    );
}