import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div id="footer">
      <h3>petCHAT 2023</h3>
      <p>
        <Link to="https://github.com/Jaxson20"><FontAwesomeIcon icon={faSquareGithub} size="lg" style={{color: "#f7f7f7",}} /></Link>
        <Link to="https://github.com/britaing"><FontAwesomeIcon icon={faSquareGithub} size="lg" style={{color: "#f7f7f7",}} /></Link>
        <Link to="https://github.com/elchinatalpf"><FontAwesomeIcon icon={faSquareGithub} size="lg" style={{color: "#f7f7f7",}} /></Link>
        <Link to="https://github.com/noahsimcoe" ><FontAwesomeIcon icon={faSquareGithub} size="lg" style={{color: "#f7f7f7",}} /></Link>
       
      </p>
    </div>
  );
}

export default Footer;
