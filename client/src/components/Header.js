import { Link } from "react-router-dom";
import style from "./Header.module.css";
const Header = () => {
  return (
    <div className={style.headerContainer}>
      <Link className={style.link} to={"/"}>
        <div className={style.button}>Test</div>
      </Link>

      <Link className={style.link} to={"/currentStats"}>
        <div className={style.button}>Recent Stats</div>
      </Link>
    </div>
  );
};

export default Header;
