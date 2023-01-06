import style from "./Header.module.css";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../reduxSlices/userSlice";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.log(e);
    }
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <div className={style.HeaderButton} onClick={handleLogout}>
      Logout
    </div>
  );
};

export default LogoutButton;
