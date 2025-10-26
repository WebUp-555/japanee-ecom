import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Api/userApi";
import "./logoutButton.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err?.response?.data ?? err?.message ?? err);
    } finally {
      localStorage.removeItem("token");
      navigate("/signin", { replace: true });
      window.location.reload();
    }
  };

  return (
    <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
      Logout
    </button>
  );
};

export default LogoutButton;