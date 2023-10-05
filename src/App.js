import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import VideoRoom from "./components/VideoRoom";
import Video from "./pages/Video";

function App() {
  const [joined,setJoined] = useState(false)
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };
  console.log()
  console.log("hello")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
             <Route
              path="/chatroom"
              element={
                <ProtectedRoute>
                  <Video/>
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="chatroom" element={<Video />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
