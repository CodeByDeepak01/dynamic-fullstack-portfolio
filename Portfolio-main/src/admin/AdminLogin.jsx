import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../api/authApi";
import "./AdminLogin.css";

function AdminLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const data = await loginAdmin(
        username,
        password
      );

      localStorage.setItem(
        "adminToken",
        data.token
      );

      localStorage.setItem(
        "adminUsername",
        data.username
      );

      navigate("/admin/dashboard");

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="admin-login">

      <div className="login-card">

        <h1>Admin Login</h1>

        <p>Login to manage your portfolio</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter username"
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
              required
            />

          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;