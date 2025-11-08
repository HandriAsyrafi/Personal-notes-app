// import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useInput from "../hooks/useInput";
import { register } from "../utils/network-data";
import { useContext } from "react";
import LocalContext from "../contexts/LocalContext";

export default function RegisterPage() {
  const { locale } = useContext(LocalContext);
  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    register({ name, email, password });
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h1>{locale === "id" ? "Daftar" : "Register"}</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">{locale === "id" ? "Nama" : "Name"}</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          required
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <button type="submit">{locale === "id" ? "Daftar" : "Register"}</button>
      </form>
      <div className="register-login-link">
        {locale === "id" ? "Sudah punya akun?" : "Already have an account?"}
        <Link to="/login">{locale === "id" ? "Masuk" : "Login"}</Link>
      </div>
    </div>
  );
}
