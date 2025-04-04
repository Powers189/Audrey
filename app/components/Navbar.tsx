import react from "react";
import { Link } from "react-router-dom";
import routes from "~/routes";

const Navbar = () => {
  return (
    <>
      <></>
      <div className="stocks">
        <Link to="/about" state={{ from: "homepage" }}>
          About
        </Link>
        <Link to="/" state={{ from: "homepage" }}>
          Welcome
        </Link>
      </div>
    </>
  );
};

export default Navbar;
