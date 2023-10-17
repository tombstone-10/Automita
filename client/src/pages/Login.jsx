import { useEffect, useRef, useState } from "react";
import logo from "../assets/png/logo-no-background.png";
import { data } from "../data";
import Loading from "../components/Loading";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [auth, setAuth] = useState("Authentication Required");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(data);
  const emailInputRef = useRef(null);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(FaEye);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email == "" || password == "") {
      setTimeout(() => {
        setLoading(false);
        setAuth("Empty Input Fields");
      }, 700);
      return;
    }
    if (email != user.email || password != user.password) {
      setAuth("Verifying...");
      setTimeout(() => {
        setLoading(false);
        setAuth("Authentication Failed");
      }, 1000);
      resetFields();
      return;
    }
    if (email == user.email && password == user.password) {
      setAuth("Verifying...");
      setTimeout(() => {
        setLoading(false);
        setAuth("Login Successful");
      }, 1000);
      resetFields();
      return;
    }
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(FaEyeSlash);
      setType("text");
    } else {
      setIcon(FaEye);
      setType("password");
    }
  };

  return (
    <>
      <section className="app-section">
        <section className="login-section">
          <div className="container">
            <form className="form">
              <img src={logo} className="logo" />
              <p className="alert">{auth}</p>
              {isLoading && <Loading />}
              <div className="form-row">
                <label htmlFor="email">Login</label>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email Address"
                    ref={emailInputRef}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <input
                    type={type}
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                  />
                  <span class="password-toggle" onClick={handleToggle}>
                    {icon}
                  </span>
                </div>
              </div>
              <div className="remember-container">
                <label for="checkbox">
                  <input
                    className="remember-me"
                    type="checkbox"
                    id="checkbox"
                    name="remember"
                  />
                  <span className="keep">Stay logged in</span>
                </label>
              </div>
              <span className="form-entry">
                <button type="submit" onClick={handleClick}>
                  Login
                </button>
                <a href="#">Forgot Password?</a>
              </span>
            </form>
          </div>
        </section>
      </section>
    </>
  );
};

export default Login;
