import { useState } from "react";
import axios from "axios";
import { useToken } from "../context/TokenContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [protectedMessage, setProtectedMessage] = useState("");
  const { token, setToken, logout } = useToken();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setToken(response.data.token);
      setError("");
    } catch (err) {
      setError("Login failed. Please check your username and password.");
    }
  };

  const handleProtected = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/protected", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProtectedMessage(response.data.message);
    } catch (err) {
      setProtectedMessage("Access to protected resource failed.");
    }
  };

  const handleLogout = () => {
    logout();
    setProtectedMessage("");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      {token && (
        <div>
          <p>Token: {token}</p>
          <button onClick={handleProtected}>Protected</button>
          {protectedMessage && <p>{protectedMessage}</p>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
