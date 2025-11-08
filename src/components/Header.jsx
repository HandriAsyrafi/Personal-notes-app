import { Link } from "react-router";
import LocalContext from "../contexts/LocalContext";
import { useContext } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { getAccessToken } from "../utils/network-data";

export default function Header({ onLogout }) {
  const { locale, toggleLocale, theme, toggleTheme } = useContext(LocalContext);

  return (
    <>
      <div className="note-app__header">
        <h1>
          <Link to="/" className="note-app__header__title">
            Notes
          </Link>
        </h1>
        <div>
          <Link to="/archived">
            {locale === "id" ? "Catatan Terarsip" : "Archived Notes"}
          </Link>
          <button onClick={toggleLocale}>
            {locale === "id" ? "English" : "Indonesia"}
          </button>
          <button onClick={toggleTheme}>
            {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </button>
          {getAccessToken() ? (
            <button onClick={onLogout}>
              {locale === "id" ? "Keluar" : "Logout"}
            </button>
          ) : (
            <Link to="/login">{locale === "id" ? "Masuk" : "Login"}</Link>
          )}
        </div>
      </div>
    </>
  );
}
