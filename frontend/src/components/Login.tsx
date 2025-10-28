import { useState } from "react";
import { authService, LoginRequest, AuthResponse } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const credentials: LoginRequest = { email, password };

    try {
      const response: AuthResponse = await authService.login(credentials);

      // Save token & user info in localStorage
      localStorage.setItem("Token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setError("");
      alert(`Welcome ${response.user.email}`);

      // Redirect to dashboard/home page after login
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-md bg-white">
      <h1 className="text-2xl mb-4 font-semibold text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
    </div>
  );
}
