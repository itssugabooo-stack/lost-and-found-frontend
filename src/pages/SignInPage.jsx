import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function SignInPage() {
  const [tab, setTab] = useState("signin");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/browse");
  };

  return (
    <div className="authPage">
      <div className="authTop">
        <h1 className="authBrand">Lost &amp; Found</h1>
        <p className="authTagline">Reuniting people with their belongings</p>
      </div>

      <div className="authCard">
        <h2 className="authTitle">Welcome</h2>
        <p className="authSubtitle">
          Sign in to report lost items or help return found items.
        </p>

        <div className="authTabs">
          <button
            type="button"
            className={`authTab ${tab === "signin" ? "active" : ""}`}
            onClick={() => setTab("signin")}
          >
            Sign In
          </button>

          <button
            type="button"
            className={`authTab ${tab === "signup" ? "active" : ""}`}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
        </div>

        <form className="authForm" onSubmit={handleSubmit}>
          {tab === "signup" && (
            <>
              <label className="authLabel">Full Name</label>
              <div className="authField">
                <span className="authIcon">👤</span>
                <input className="authInput" placeholder="Your name" />
              </div>
            </>
          )}

          <label className="authLabel">Email</label>
          <div className="authField">
            <span className="authIcon">✉️</span>
            <input className="authInput" placeholder="you@example.com" type="email" />
          </div>

          <label className="authLabel">Password</label>
          <div className="authField">
            <span className="authIcon">🔒</span>
            <input className="authInput" placeholder="••••••••" type="password" />
          </div>

          {tab === "signin" && (
            <div className="authRow">
              <label className="authCheck">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button className="authLink" type="button">
                Forgot password?
              </button>
            </div>
          )}

          <button className="authPrimary" type="submit">
            {tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
