import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./Login.css"; // Make sure to include the CSS for the toggle

function ToggleButton({ isLoginPage = false }) {
  const [isToggled, setIsToggled] = useState(isLoginPage);
  const navigate = useNavigate();

  const handleToggleChange = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  return (
    <div
      className="toggle-wrapper"
      style={{
        position: "absolute",
        top: -70,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Typography style={{ fontSize: "16px", color: "white" }}>Login</Typography>

      <input
        className="toggle-checkbox"
        type="checkbox"
        checked={isToggled}
        onChange={handleToggleChange}
      />
      <div className="toggle-container">
        <div className="toggle-button">
          <div className="toggle-button-circles-container">
            <div className="toggle-button-circle"></div>
            <div className="toggle-button-circle"></div>
          </div>
        </div>
      </div>

      <Typography style={{ fontSize: "16px", color: "white" }}>Signup</Typography>
    </div>
  );
}

export default ToggleButton;