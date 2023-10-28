import Tabs from "../../components/Tabs";
import "./Profile.css";
import bg from "../../assets/images/profile.svg";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaFile } from "react-icons/fa";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";
import { profileTabs } from "../../data/TabsData";
import UserHeading from "../../components/UserHeading";

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(FaEye);
  const [passwordState, setPasswordState] = useState("Show Password");
  const [showPasswordError, setShowPasswordError] = useState(false); // password confirmation error
  const [isConfirmPasswordOkay, setConfirmPasswordOkay] = useState(true); // we assume that password is right in confirm field\
  const [passwordAlertClass, setPasswordAlertClass] = useState("is-valid");

  useEffect(() => {
    if (!isConfirmPasswordOkay) {
      if (newPassword === confirmPassword) {
        setShowPasswordError(false);
        setPasswordAlertClass("is-valid");
      } else {
        setShowPasswordError(true);
        setPasswordAlertClass("pw-alert");
      }
    }
  }, [confirmPassword][newPassword]);

  const handlePasswordConfirm = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordOkay(false);
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(FaEyeSlash);
      setType("text");
      setPasswordState("Hide Password");
    } else {
      setIcon(FaEye);
      setType("password");
      setPasswordState("Show Password");
    }
  };

  return (
    <>
      <UserHeading />
      <Tabs tabs={profileTabs} parentName={"profile"} />
      <div className="profile-container">
        <form className="profile-form">
          <div className="password-row">
            <h3>Set a New Password</h3>
            <p onClick={handleToggle}>
              {passwordState}
              {icon}
            </p>
          </div>
          <div className="profile-form-row">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type={type}
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="profile-form-row">
            <label htmlFor="newPassword">New Password</label>
            <input
              type={type}
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="profile-form-row">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={type}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handlePasswordConfirm}
            />
          </div>
          {showPasswordError && !isConfirmPasswordOkay && (
            <div className={passwordAlertClass}>
              <p className="pw-alert-prompt">Passwords do not match</p>
            </div>
          )}
          <div className="pw-bar">
            <p>Password Strength</p>
            <PasswordStrengthBar
              password={newPassword}
              className="passwordStrengthBar"
            />
          </div>
          <div className="btn-container">
            <Link to={"/profile"}>
              <button className="cancel-btn">Cancel</button>
            </Link>
            <button type="submit" className="save-btn">
              Save <FaFile />
            </button>
          </div>
        </form>

        <div className="bg-container">
          <img src={bg}></img>
        </div>
      </div>
    </>
  );
};

export default Security;
