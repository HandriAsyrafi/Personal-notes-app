import { getUserLogged, login, putAccessToken } from "../utils/network-data";
import { Link, useNavigate } from "react-router";
import useInput from "../hooks/useInput";
import { useContext } from "react";
import LocalContext from "../contexts/LocalContext";

export default function LoginPage({ setUser }) {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const { locale } = useContext(LocalContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, data } = await login({ email, password });
    if (!error) {
      putAccessToken(data.accessToken);
      const userResult = await getUserLogged();
      if (!userResult.error) {
        setUser(userResult.data);
      }
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <h1>{locale === "id" ? "Masuk" : "Login"}</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">{locale === "id" ? "Email" : "Email"}</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
          autoComplete="username"
        />
        <label htmlFor="password">
          {locale === "id" ? "Kata Sandi" : "Password"}
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
          autoComplete="current-password"
        />
        <button type="submit">{locale === "id" ? "Masuk" : "Login"}</button>
      </form>
      <div className="login-register-link">
        {locale === "id" ? "Belum punya akun?" : "Don't have an account?"}
        <Link to="/register">{locale === "id" ? "Daftar" : "Register"}</Link>
      </div>
    </div>
  );
}
