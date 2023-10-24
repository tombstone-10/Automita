import Login from "./pages/login/Login";
import "./App.css";
import { useContext } from "react";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./hooks/isLogedInHook";


const useAuth= () => {
  return useContext(AuthContext);
}


function App() {
    const {isLoggedIn} = useAuth();
    return (
      <>
      {!isLoggedIn?<Login />:<Dashboard />}   
      </>
    );
}

export default App;
