import './App.css'
import ProfileStartup from './components/profileStartup';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import TopMenu from './components/TopMenu';
import Footer from './components/Footer';
import Greeting from './components/Greeting';
import HomePage from './components/Home/HomePage';
import Property from './components/Property/Property';
import Reserve from './components/Property/Reserve';
import ReservePropCard from './components/Property/ReservePropCard';
import UploadProperty from './components/Property/UploadProperty';
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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Greeting />} />
          <Route path="property" element={<Property />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="reservePropCard" element={<ReservePropCard />} />
          <Route path="uploadProperty" element={<UploadProperty />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
