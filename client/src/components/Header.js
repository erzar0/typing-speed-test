import { Link } from "react-router-dom";
import style from "./Header.module.css";
const Header = () => {
  return (
    <div className={style.HeaderContainer}>
      <Link className={style.Link} to={"/"}>
        <div className={style.Button}>Test</div>
      </Link>

      <Link className={style.Link} to={"/currentStats"}>
        <div className={style.Button}>Recent Stats</div>
      </Link>

      <Link className={style.Link} to={"/login"}>
        <div className={style.Button}>Login</div>
      </Link>
    </div>
  );
};

export default Header;
