import React, { useState } from "react";
import { authApi } from "../api";

const AuthPage: React.FC<{ onAuth: () => void }> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      let data;

      if (isLogin) {
        data = await authApi.login(email, password);
      } else {
        data = await authApi.register(email, password, name);
      }

      if (data.error) {
        setError(data.error || "Erro desconhecido");
        return;
      }

      if (isLogin && data.token) {
        localStorage.setItem("token", data.token);
        onAuth();
      } else if (!isLogin) {
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      setError("Erro de conexão");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto" }}>
      <h2>{isLogin ? "Login" : "Registrar"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">{isLogin ? "Entrar" : "Registrar"}</button>
      </form>
      <button
        style={{ marginTop: 16 }}
        onClick={() => {
          setIsLogin(!isLogin);
          setError("");
        }}
      >
        {isLogin ? "Criar conta" : "Já tenho conta"}
      </button>
    </div>
  );
};

export default AuthPage;
