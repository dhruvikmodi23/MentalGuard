import React, { useContext,useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Appointments from "./pages/Appointments";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Counseling from "./pages/Counseling";
import Workshops from "./pages/Workshops";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContactMessages from "./pages/AdminContactMessages";
import Notifications from "./pages/Notifications";
import { AuthContext } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import NotificationDisplay from "./components/NotificationDisplay";
import Profile from "./pages/Profile";
import "./App.css";
import ChatBot from "./components/Chatbot";
import DynamicQuestionnaire from "./components/DyamicQuestion";
import AddQuestion from "./pages/AddQuestion";
import UserVideoCall from "./pages/UserVideoCall";
import AdminVideoCall from "./pages/AdminVideoCall";
// import PremiumPage from "./pages/Premium";
import Payment from "./pages/Payment";

const App = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const [roomId, setRoomId] = useState("testRoom123");
  return (
    <NotificationProvider>
      <NotificationDisplay />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/appointments"
            element={
              isAuthenticated && !isAdmin ? (
                <Appointments />
              ) : (
                <Navigate to="/appointments" />
              )
            }
          />
          <Route
            path="/chat"
            element={
              isAuthenticated && !isAdmin ? (
                <ChatBot />
              ) : (
                <Navigate to="/chat" />
              )
            }
          />
          <Route
            path="/user/test"
            element={
              isAuthenticated && !isAdmin ? (
                <DynamicQuestionnaire />
              ) : (
                <Navigate to="user/test" />
              )
            }
          />
          <Route
            path="/upg"
            element={
              isAuthenticated && !isAdmin ? (
                <Payment/>
              ) : (
                <Navigate to="/upg" />
              )
            }
          />
          <Route
            path="/user/video"
            element={
              isAuthenticated && !isAdmin ? (
                <UserVideoCall roomId={roomId}/>
              ) : (
                <Navigate to="user/video" />
              )
            }
          />
          <Route
            path="/admin/question"
            element={
              isAuthenticated && isAdmin ? (
                <AddQuestion />
              ) : (
                <Navigate to="/admin/question" />
              )
            }
          />
          <Route
            path="/admin/video"
            element={
              isAuthenticated && isAdmin ? (
                <AdminVideoCall roomId={roomId}/>
              ) : (
                <Navigate to="/admin/video" />
              )
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user/dashboard"
            element={
              isAuthenticated ? (
                <UserDashboard />
              ) : (
                <Navigate to="/user/dashboard" />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated && isAdmin ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            }
          />
          <Route
            path="/admin/contact"
            element={
              isAuthenticated && isAdmin ? (
                <AdminContactMessages />
              ) : (
                <Navigate to="/admin/contact" />
              )
            }
          />
          <Route
            path="/counseling"
            element={
              isAuthenticated ? <Counseling /> : <Navigate to="/counseling" />
            }
          />
          <Route
            path="/workshops"
            element={
              isAuthenticated ? <Workshops /> : <Navigate to="/workshops" />
            }
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
};

export default App;