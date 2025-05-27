import { NavLink } from "react-router";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <nav className={classes.container}>
      <p>Dummy Test pages:</p>
      <div>
        <NavLink to="/product-page-dummy">
          <p>Product-Page</p>
        </NavLink>
      </div>
      <div>
        <NavLink to="/cart">
          <p>Cart-Page</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Footer;

//https://reactrouter.com/start/framework/navigating
