// UserContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 유저 정보 담을 곳
  const [loading, setLoading] = useState(true); // 로딩 중인지 확인
  const SERVER_URL = import.meta.env.VITE_SERVER_URL

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 쿠키는 브라우저가 알아서 같이 보냅니다 (proxy 설정 등이 되어있다는 가정)
        // const response = await axios.get(`${SERVER_URL}/api/auth/me`); 
        // console.log(response.data);
        const response = { data : { role: 'student', name : '김사감'}}
        console.log(response);
        setUser(response.data);
      } catch (error) {
        console.log("로그인 안 된 상태거나 에러 발생");
        setUser([]);
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, isTeacher: user?.role === 'teacher' }}>
      {children}
    </UserContext.Provider>
  );
};