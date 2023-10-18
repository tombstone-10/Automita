import "./DefaultPage.css";
import Lottie from "react-lottie";
import "../pages/profile/Profile.css";
import gif from "../assets/gif/profile-gif.json";
import { FaCheck } from "react-icons/fa";

const DefaultPage = ({ currentPage }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: gif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="profile-container">
        <div className="profile-sub-container">
          <div className="profile-form">
            <h2 className="profile-heading">Let's get started!</h2>

            {currentPage.map((page, index) => {
              return (
                <>
                  <div className="profile-intro-row" key={index}>
                    <div className="profile-box">
                      <div className="profile-box-icon">{page.icon}</div>
                      <p>{page.text}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="bg-container">
            <Lottie options={defaultOptions} height={300} width={600} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultPage;
