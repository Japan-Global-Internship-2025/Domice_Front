import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home';
import Notice from '../pages/Notice';
import MealInfo from '../pages/Meal';
import Board from '../pages/Board';
import Mypage from '../pages/Mypage';
import Manage from '../pages/Manage';
import NoticeDetail from '../pages/NoticeDetail';
import BoardDetail from '../pages/BoardDetail';
import BoardWrite from '../pages/BoardWrite';
import QRScan from '../pages/QRScan';
import NoticeWrite from '../pages/NoticeWrite';

export default function HomeRouter() {
    return (
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/notice' element={<Notice />} />
            <Route path='/notice/:id' element={<NoticeDetail />} />
            <Route path='/notice/write' element={<NoticeWrite/>}/>
            <Route path='/meal' element={<MealInfo />} />
            <Route path='/board' element={<Board />} />
            <Route path='/mypage' element={<Mypage />} />
            <Route path='/manage' element={<Manage />} />
            <Route path='/board/private/:id' element={<BoardDetail type={"private"} title={"1대1 문의"} />} />
            <Route path='/board/all/:id' element={<BoardDetail type={"all"} title={"전체 게시판"} />} />
            <Route path='/board/write' element={<BoardWrite title={"작성하기"} />} />
            <Route path='/qr/scan' element={<QRScan />} />
        </Routes>
    )
};
