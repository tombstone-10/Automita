import { useEffect, useRef, useState } from "react";
import logo from "../assets/png/logo-no-background.png";
import Loading from "../components/Loading";
import "./Login.css";
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../hooks/isLogedInHook";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/LogedUserHook";


const useAuth= () => {
  return useContext(AuthContext);
}
const useUser = () => {
  return useContext(UserContext);
}
const Login = () => {
  const [auth, setAuth] = useState("Authentication Required");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const {setuser} = useUser();
  const emailInputRef = useRef(null);
  const {login} = useAuth();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/profile');
  }

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
    // if (email != user.email || password != user.password) {
    //   setAuth("Verifying...");
    //   setTimeout(() => {
    //     setLoading(false);
    //     setAuth("Authentication Failed");
    //   }, 1000);
    //   resetFields();
    //   return;
    // }
    // if (email == user.email && password == user.password) {
    //   setAuth("Verifying...");
    //   setTimeout(() => {
    //     setLoading(false);
    //     setAuth("Login Successful");
    //   }, 1000);
    //   resetFields();
    //   return;
    // }

    loginUser();
  };
  const loginUser = async () => {
    const url = 'http://localhost:5000/api/users/login';
    try {
      const response = await axios.post(url, { email: email, password: password });
      const data = response.data;
      if (data) {
        sessionStorage.setItem('userToken', JSON.stringify(data.token));    //Storing data in sessions
      }
      if (data) {
        setuser(data);
        setAuth("Verifying...");
        setTimeout(() => {
          setLoading(false);
          setAuth("Login Successful");
          // console.log(user);
        }, 1000);
        resetFields();
        login();
        // console.log(sessionStorage.getItem('userToken'));
        navigateToProfile();
      }

    }
    catch (err) {
      // console.log(err.response.data);
      setuser(null);
      setAuth("Verifying...");
      setTimeout(() => {
        setLoading(false);
        setAuth("Authentication Failed");
      }, 1000);
      resetFields();
    }
  }

  const resetFields = () => {
    setEmail("");
    setPassword("");
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
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Email Address"
                  ref={emailInputRef}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="form-row">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
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
