import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './common/Spinner';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://codevibe-3.onrender.com/api/auth/register", {
        username,
        Email: email,   // ✅ lowercase, same as Dashboard
        password,
        college,
        year,
      });

      console.log("✅ Signup successful", response.data);
      setResponseMsg(response.data.message);

      if (response.data.success) {
        // ✅ signup ke baad direct Dashboard me bhejna
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("❌ Signup error", error.response?.data || error.message);
      setResponseMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <div style={{ width: "100%" }}>
          <label htmlFor="username">USERNAME:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
            aria-label="Username"
          />
        </div>

        <div style={{ width: "100%" }}>
          <label htmlFor="college">COLLEGE:</label>
          <input
            id="college"
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
            placeholder="Enter your college name"
            aria-label="College"
          />
        </div>

        <div style={{ width: "100%" }}>
          <label htmlFor="year">YEAR:</label>
          <input
            id="year"
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            placeholder="Enter your year (e.g., 2nd, 3rd)"
            aria-label="Year"
          />
        </div>

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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
