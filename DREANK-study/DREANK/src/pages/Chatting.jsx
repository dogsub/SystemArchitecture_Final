import Box from '@mui/joy/Box';
import MyMessages from '../components/MyMessages';
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Chatting() {
    const username = localStorage.getItem('nickname');
    const navigate = useNavigate();
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            // 처음 마운트된 경우
            isMounted.current = true;

            if (!username) {
                alert("로그인 후 이용해주세요!");
                navigate("/login");
            }
        }
    }, [username, navigate]);  // useEffect 의존성 배열 추가

    return (
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Box component="main" className="MainContent" sx={{ flex: 1 }}>
                <MyMessages />
            </Box>
        </Box>
    );
}
