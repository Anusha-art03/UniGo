import { useState } from "react";
import { supabase } from "../lib/supabase";
import "./Login.css";

type LoginProps = {
  onLogin?: () => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = () => {
    setIsSignup(!isSignup);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setError("");
    setMessage("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (isSignup) {
      if (
        !name.trim() ||
        !cleanEmail ||
        !password ||
        !confirmPassword
      ) {
        setError("Please fill in all fields.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      try {
        setLoading(true);

        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: name.trim(),
            },
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) {
          setError(error.message);
          return;
        }

        setMessage(
          "Account created! Check your email to confirm your account."
        );

        setPassword("");
        setConfirmPassword("");
      } catch {
        setError(
          "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (error) {
        setError(error.message);
        return;
      }

      if (onLogin) {
        onLogin();
      }
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* LOGO */}
        <div className="login-logo">
          <span>Uni</span>Go
        </div>

        <p className="login-small-title">
          {isSignup ? "JOIN UNIGO" : "WELCOME BACK"}
        </p>

        <h1>
          {isSignup
            ? "Create your account"
            : "Login to UniGo"}
        </h1>

        <p className="login-subtitle">
          {isSignup
            ? "Join your student world, all in one place."
            : "Your student world, all in one place."}
        </p>

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}
          {isSignup && (
            <div className="login-form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                disabled={loading}
              />
            </div>
          )}

          {/* EMAIL */}
          <div className="login-form-group">
            <label htmlFor="email">
              College Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              disabled={loading}
            />
          </div>

          {/* PASSWORD */}
          <div className="login-form-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="password-wrapper">
              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder={
                  isSignup
                    ? "Create a password"
                    : "Enter your password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
              />

              <button
                type="button"
                className="show-password-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                disabled={loading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          {isSignup && (
            <div className="login-form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="password-wrapper">
                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  disabled={loading}
                />

                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  disabled={loading}
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {message && (
            <p className="login-success">
              {message}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="login-submit-btn"
            disabled={loading}
          >
            {loading
              ? isSignup
                ? "Creating Account..."
                : "Logging in..."
              : isSignup
                ? "Create Account"
                : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="login-divider">
          <span>OR</span>
        </div>

        {/* SWITCH */}
        <p className="signup-text">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            className="signup-link"
            onClick={switchMode}
            disabled={loading}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

      </div>
    </div>
  );
}
