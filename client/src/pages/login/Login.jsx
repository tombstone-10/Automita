import { useEffect,useLayoutEffect, useRef, useState } from "react";
import logo from "../../assets/png/logo-no-background.png";
import Loading from "../../components/Loading";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../../hooks/isLogedInHook";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/LogedUserHook";

const useAuth = () => {
  return useContext(AuthContext);
}
const useUser = () => {
  return useContext(UserContext);
}

const Login = () => {
  let storedToken = null;
  const [auth, setAuth] = useState("Authentication Required");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [notRender, setNotRender] = useState(false);
  const { setuser } = useUser();
  const emailInputRef = useRef(null);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(FaEye);
  const { login, logout } = useAuth();
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

  const HandleSessions = async (storedToken) => {
    const urlme = 'http://localhost:5000/api/users/me';
    try {
      let id = null;
      if (storedToken) {
        id = JSON.parse(storedToken)
      }
      const res = await axios.post(urlme, { id: id });
      setuser(res.data);
      return true;

    }
    catch (err) {
      setuser(null);
      return false;
    }
  }
  const fetchData = async () => {
    storedToken = sessionStorage.getItem('userToken');
    if (storedToken) {
      setNotRender(true);
      const session = await HandleSessions(storedToken);
      setNotRender(false);
      if (session === true) {
        login();
      } else {
        console.log('false');
        logout();
      }
    }
  }
  const loginUser = async () => {
    const urlLogin = 'http://localhost:5000/api/users/login';
    try {
      const response = await axios.post(urlLogin, { email: email, password: password });
      const data = response.data;
      if (data) {
        sessionStorage.setItem('userToken', JSON.stringify(data.token));    //Storing data in sessions
        setAuth("Verifying...");
        setTimeout(() => {
          setLoading(false);
          setAuth("Login Successful");
          // console.log(user);
        }, 1000);
        resetFields();
        fetchData();
        
        // console.log(sessionStorage.getItem('userToken'));
        navigateToProfile();
      }

    }
    catch (err) {
      // console.log(err.response.data);
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

  const handleToggle = () => {
    if (type === "password") {
      setIcon(FaEyeSlash);
      setType("text");
    } else {
      setIcon(FaEye);
      setType("password");
    }
  };
  useLayoutEffect(() => { 
    fetchData();
  }, []);
  if(notRender === true) {
    return (
      <Loading/>
    )
  }

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
