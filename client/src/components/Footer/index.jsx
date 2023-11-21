import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div id="footer">
      <h3>petCHAT 2023</h3>
        <div>
        <Link to="https://github.com/Jaxson20"><FontAwesomeIcon icon={faSquareGithub} size="lg" style={{color: "#6E7C7C",}} /></Link>
        </div>
        <div>
        <Link to="https://github.com/britaing"><FontAwesomeIcon icon={faSquareGithub} size="lg" style={{color: "#6E7C7C",}} /></Link>
        </div>
        <div>
        <Link to="https://github.com/elchinatalpf"><FontAwesomeIcon icon={faSquareGithub} size="lg" style={{color: "#6E7C7C",}} /></Link>
        </div>
        <div>
        <Link to="https://github.com/noahsimcoe" ><FontAwesomeIcon icon={faSquareGithub} size="lg" style={{color: "#6E7C7C",}} /></Link>
        </div>
    </div>
  );
}

export default Footer;
