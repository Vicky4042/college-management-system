import { useState } from "react";
import { authService, RegisterRequest, AuthResponse } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }

    const userData: RegisterRequest & { name: string } = { email, password, name };

    try {
      const response: AuthResponse = await authService.register(userData);

      // Save token & user info in localStorage
      localStorage.setItem("Token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setError("");
      alert(`Welcome ${response.user.email}`);

      // Redirect to login or dashboard after registration
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-md bg-white">
      <h1 className="text-2xl mb-4 font-semibold text-center">Register</h1>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

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
        onClick={handleRegister}
        className="bg-green-600 text-white p-2 w-full rounded hover:bg-green-700 transition"
      >
        Register
      </button>
    </div>
  );
}
