// UserContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 중인지 확인
  const SERVER_URL = import.meta.env.VITE_SERVER_URL

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(response.data.data);
      } catch (error) {
        console.log("로그인 안 된 상태거나 에러 발생");
        navigate('/login');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // if (loading || !user) {
  //   return null;
  // }

  return (
    <UserContext.Provider value={{ user, loading, isTeacher: user?.role === 'teacher' }}>
      {children}
    </UserContext.Provider>
  );
};