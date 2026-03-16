import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Choice from "./pages/Choice";
import Home from "./pages/Home";
import CaptainHome from "./pages/CaptainHome";
import UserWrapper from "./pages/UserWrapper";
import CaptainWrapper from "./pages/CaptainWrapper";
import CaptainLogout from "./pages/CaptainLogout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/user-logout" element={<UserLogout />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/home" element={<UserWrapper><Home /></UserWrapper>} />
        <Route path="/captain-home" element={<CaptainWrapper><CaptainHome /></CaptainWrapper>} />
        <Route path="/captain-logout" element={<CaptainLogout />} />
      </Routes>
    </>
  )
}

export default App