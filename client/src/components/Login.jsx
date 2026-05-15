import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./common/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading spinner and button disabled state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://codevibe-3.onrender.com/api/auth/login",
        {
          Email: email,
          password,
        }
      );

      console.log("✅ Login successful", response.data);
      setResponseMsg(response.data.message);

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("❌ Login error", error.response?.data || error.message);
      setResponseMsg(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div style={{ width: "100%" }}>
          <label htmlFor="email">EMAIL:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            aria-label="Email address"
          />
        </div>

        <div style={{ width: "100%" }}>
          <label htmlFor="password">PASSWORD:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            aria-label="Password"
          />
        </div>

        <button type="submit" style={{ width: "100%" }}>
          SUBMIT
        </button>

        {responseMsg && (
          <p style={{ color: "white", textAlign: "center", margin: "0.5rem 0" }}>
            {responseMsg}
          </p>
        )}

        <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
          Don't have an account? <Link to="/Signup">Signup</Link>
        </p>
        <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
          Forgot Password? <Link to="/ForgetPassword">Click Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;