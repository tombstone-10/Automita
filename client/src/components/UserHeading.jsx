import { useContext } from "react";
import { UserContext } from "../hooks/LoggedUserHook";

const useUser = () => {
  return useContext(UserContext);
};

const UserHeading = () => {
  const { user } = useUser();
  return (
    <div className="user-heading">
      <h2>Hello {user.name}!</h2>
    </div>
  );
};

export default UserHeading;
