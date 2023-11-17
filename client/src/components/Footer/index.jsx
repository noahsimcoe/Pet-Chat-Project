import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div id="footer">
      <h3>petCHAT</h3>
      <p>
        <Link to="#">Javier</Link>
        <Link to="#">Britain</Link>
        <Link to="#">Jaxson</Link>
        <Link to="#">Noah</Link>
      </p>
    </div>
  );
}

export default Footer;
