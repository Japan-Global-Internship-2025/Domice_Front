import './App.css'
import { BrowserView, MobileView } from 'react-device-detect'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import HomeRouter from './routes/HomeRouter'
import LoginRouter from './routes/LoginRouter'
import { UserProvider } from './services/UserContext';

function App() {
  return (
    <>
      <BrowserView>
        <h1>PC에서는 제공되지 않습니다.</h1>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path='/*' element={<HomeRouter />} />
          <Route path='/login/*' element={<LoginRouter />} />
        </Routes>
      </MobileView>
    </>
  )
}

export default App
