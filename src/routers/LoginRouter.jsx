import { Routes, Route, Navigate } from 'react-router-dom'
import Intro from '../pages/Intro'
import Login from '../pages/Login'

export default function LoginRouter() {
    return (
        <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
};
