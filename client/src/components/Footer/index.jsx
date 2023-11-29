import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div id="footer">
      <h3>petCHAT 2023 ©</h3>
      <div id="link-box">
        <div>
          <Link to="https://github.com/Jaxson20" target="_blank">
            <FontAwesomeIcon
              icon={faSquareGithub}
              size="lg"
              style={{ color: "#6E7C7C" }}
            />
          </Link>
          <h5>Jaxson</h5>
        </div>
        <div>
          <Link to="https://github.com/britaing" target="_blank">
            <FontAwesomeIcon
              icon={faSquareGithub}
              size="lg"
              style={{ color: "#6E7C7C" }}
            />
          </Link>
          <h5>Britain</h5>
        </div>
        <div>
          <Link to="https://github.com/elchinatalpf" target="_blank">
            <FontAwesomeIcon
              icon={faSquareGithub}
              size="lg"
              style={{ color: "#6E7C7C" }}
            />
          </Link>
          <h5>Mr. Ghor</h5>
        </div>
        <div>
          <Link to="https://github.com/noahsimcoe" target="_blank">
            <FontAwesomeIcon
              icon={faSquareGithub}
              size="lg"
              style={{ color: "#6E7C7C" }}
            />
          </Link>
          <h5>Noah</h5>
        </div>
      </div>
    </div>
  );
}

export default Footer;
