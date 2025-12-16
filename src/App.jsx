import './App.css'
import { BrowserView, MobileView } from 'react-device-detect'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Notice from './pages/Notice';
import MealInfo from './pages/Meal';
import Board from './pages/Board';
import Mypage from './pages/Mypage';
import NoticeDetail from './pages/NoticeDetail';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';
import Intro from './pages/Intro'
import Login from './pages/Login'

function App() {
  return (
    <>
      <BrowserView>
        <h1>PC에서는 제공되지 않습니다.</h1>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/notice' element={<Notice/>}/>
          <Route path='/notice/:id' element={<NoticeDetail/>}/>
          <Route path='/meal' element={<MealInfo/>}/>
          <Route path='/board' element={<Board/>}/>
          <Route path='/mypage' element={<Mypage/>}/>
          <Route path='/board/private/:id' element={<BoardDetail type={"private"}/>}/>
          <Route path='/board/all/:id' element={<BoardDetail type={"all"}/>}/>
          <Route path='/board/write' element={<BoardWrite/>}/>
          <Route path="/" element={<Intro/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </MobileView>
    </>
  )
}

export default App
