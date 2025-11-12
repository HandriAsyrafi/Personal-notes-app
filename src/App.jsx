import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import ArchivedNotesPage from "./pages/ArchivedNotesPage";
import LocalContext from "./contexts/LocalContext";
import {
  getAccessToken,
  getUserLogged,
  removeAccessToken,
} from "./utils/network-data";
import { Navigate } from "react-router";
import Header from "./components/Header";

function App() {
  const [locale, setLocal] = useState(localStorage.getItem("locale") || "en");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserLogged() {
      const token = getAccessToken();
      if (!token) {
        setUser(null);
        return;
      }
      const { error, data } = await getUserLogged();
      if (!error) {
        setUser(data);
      }
    }
    fetchUserLogged();
  }, []);

  const navigate = useNavigate();

  function ProtectedUserLogin({ children }) {
    const token = getAccessToken();
    if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  function ProtectedUserNotLogin({ children }) {
    const token = getAccessToken();
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  const localContextValue = useMemo(() => {
    const toggleLocale = () => {
      setLocal((prevLocale) => (prevLocale === "id" ? "en" : "id"));
      localStorage.setItem("locale", locale);
    };

    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      localStorage.setItem("theme", theme);
    };
    return {
      locale,
      toggleLocale,
      theme,
      toggleTheme,
    };
  }, [locale, theme]);

  function handleLogout() {
    removeAccessToken();
    setUser(null);
    navigate("/login");
  }

  return (
    <>
      <LocalContext.Provider value={localContextValue}>
        <header>
          <Header onLogout={handleLogout} user={user} />
        </header>
        <main>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedUserLogin>
                  <LoginPage setUser={setUser} />
                </ProtectedUserLogin>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedUserLogin>
                  <RegisterPage />
                </ProtectedUserLogin>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedUserNotLogin>
                  <HomePage />
                </ProtectedUserNotLogin>
              }
            />
            <Route path="/notes/:id" element={<NoteDetailPage />} />
            <Route
              path="/archived"
              element={
                <ProtectedUserNotLogin>
                  <ArchivedNotesPage />
                </ProtectedUserNotLogin>
              }
            />
          </Routes>
        </main>
      </LocalContext.Provider>
    </>
  );
}

export default App;
