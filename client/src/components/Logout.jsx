import { useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../hooks/LogedUserHook";
import {AuthContext} from '../hooks/isLogedInHook';
import { useNavigate } from 'react-router-dom';

const useUser = () => {
    return useContext(UserContext);
  }
  const useAuth = () => {
    return useContext(AuthContext);
  }

function Logout() {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const {setuser} = useUser();
  useEffect(() => {
        sessionStorage.removeItem('userToken');
        setuser(null);
        logout();
        
    navigate('/');
  }, [navigate]);

  return null;
}

export default Logout;
