import './App.css'
import ProfileStartup from './components/profileStartup';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import TopMenu from './components/TopMenu';
import Footer from './components/Footer';
import Greeting from './components/Greeting';
import HomePage from './components/Home/HomePage';
function App() {
  return (
    <>
      {/* <ProfilePage /> */}
      {/* <Greeting /> */}
      <BrowserRouter>
      <TopMenu />
        <Routes>
        <Route path='*' element={<Navigate to="/" />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Greeting />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
