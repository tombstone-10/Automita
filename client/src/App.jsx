import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./components/isLogedInHook";

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
