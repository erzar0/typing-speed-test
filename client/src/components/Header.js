import { Link } from "react-router-dom";
import style from "./Header.module.css";
import LogoutButton from "./LogoutButton";

const Header = ({ user }) => {
  return (
    <div className={style.HeaderContainer}>
      <Link className={style.Link} to={"/"}>
        <div className={style.HeaderButton}>Test</div>
      </Link>

      <Link className={style.Link} to={"/recent-stats"}>
        <div className={style.HeaderButton}>Recent Stats</div>
      </Link>

      {user ? (
        <LogoutButton style={{ alignSelf: "flex-end" }} />
      ) : (
        <>
          <Link className={style.Link} to={"/login"} replace>
            <div className={style.HeaderButton}>Login</div>
          </Link>
          <Link className={style.Link} to={"/register"} replace>
            <div className={style.HeaderButton}>Register</div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
