import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home';
import Notice from '../pages/Notice';
import MealInfo from '../pages/Meal';
import Board from '../pages/Board';
import Mypage from '../pages/Mypage';
import Manage from '../pages/Manage';
import ManageRoom from '../pages/ManageRoom';
import ManageScore from '../pages/ManageScore';
import NoticeDetail from '../pages/NoticeDetail';
import BoardDetail from '../pages/BoardDetail';
import BoardWrite from '../pages/BoardWrite';
import QRScan from '../pages/QRScan';
import NoticeWrite from '../pages/NoticeWrite';
import { UserProvider } from '../services/UserContext';
import NoticeUpdate from '../pages/NoticeUpdate';

export default function HomeRouter() {
    return (
        <UserProvider>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/notice' element={<Notice />} />
                <Route path='/notice/:id' element={<NoticeDetail />} />
                <Route path='/notice/write' element={<NoticeWrite />} />
                <Route path='/notice/update/:id' element={<NoticeUpdate/>} />
                <Route path='/meal' element={<MealInfo />} />
                <Route path='/board' element={<Board />} />
                <Route path='/mypage' element={<Mypage />} />
                <Route path='/manage' element={<Manage />} />
                <Route path='/manage/room/:room' element={<ManageRoom />} />
                <Route path='/manage/room/:room/score' element={<ManageScore />} />
                <Route path='/board/private/:id' element={<BoardDetail type={"private"} title={"1대1 문의"} />} />
                <Route path='/board/all/:id' element={<BoardDetail type={"all"} title={"전체 게시판"} />} />
                <Route path='/board/write' element={<BoardWrite title={"작성하기"} />} />
                <Route path='/checkin' element={<QRScan />} />
            </Routes>
        </UserProvider>
    )
};
