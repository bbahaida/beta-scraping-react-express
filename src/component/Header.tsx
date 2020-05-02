import React from "react";
// import { ReactComponent as Logo } from '../imgs/logo-white.svg';
const Header = ({handleRefresh}) => {
    const location = "Seattle, WA";
    return (
        <div className="heading">
        {/* <Logo /> */}
        <h1>Beta offres</h1>
        <div className="btn" onClick={handleRefresh}>refresh</div>
      </div>
    );
  };
export default Header;
