import './App.css'
import { BrowserView, MobileView } from 'react-device-detect'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import HomeRouter from './routers/HomeRouter'
// import LoginRouter from './routers/LoginRouter'

function App() {
  return (
    <>
      <BrowserView>
        <h1>PC에서는 제공되지 않습니다.</h1>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path='/*' element={<HomeRouter />} />
          {/* <Route path='/login/*' element={<LoginRouter />} /> */}
        </Routes>
      </MobileView>
    </>
  )
}

export default App
