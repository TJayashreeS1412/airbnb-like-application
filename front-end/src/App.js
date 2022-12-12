import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import TopMenu from './components/TopMenu';
import Footer from './components/Footer';
import HomePage from './components/Home/HomePage';
import Property from './components/Property/Property';
import UploadProperty from './components/UploadProperty/UploadProperty';
import ProfilePage from './components/ProfilePage/profilePage';
function App() {
  return (
    <>
      <BrowserRouter>
        <TopMenu />
        <Routes>
          <Route path='*' element={<Navigate to="/" />} />
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="property/:propertyId" element={<Property />} />
          <Route path="uploadProperty" element={<UploadProperty />} />
          {/* <Route path="profile" element={<ProfilePage />} />
          <Route path="signUpAsHost" element={<UploadProperty />} />
          <Route path="editProperty" element={<UploadProperty />} /> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
