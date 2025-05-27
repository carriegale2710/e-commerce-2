import { NavLink } from "react-router";
import classes from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={classes.container}>
      <div>
        <NavLink to="/" end>
          <p>Home</p>
        </NavLink>
      </div>
      <div>
        <NavLink to="/cart">
          <p>Cart</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;

//https://reactrouter.com/start/framework/navigating
