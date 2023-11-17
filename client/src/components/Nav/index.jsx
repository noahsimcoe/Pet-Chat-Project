import { Link } from "react-router-dom";

import { THEME_TOGGLE } from "../../utils/actions";
import { useStoreContext } from "../../utils/store-context";
import Auth from "../../utils/auth";

import petLogo from '../../assets/images/petLogo.png';
import darkToggle from '../../assets/images/dark-toggle.svg';

import './style.scss';

export default function Nav() {
  const [theme, dispatch] = useStoreContext('theme');

  return (
    <header className={`header-theme__${theme.dark ? 'dark' : 'light'}`}>
      <div>
        <img className="header-logo" src={petLogo} alt="Logo" />
      </div>

      <div>
        <nav>
          {Auth.loggedIn() && (
            <>
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/register">Register a Pet</Link>
              <div className="logout-link" onClick={() => Auth.logout()}>Logout</div>
            </>
          )}
        </nav>

        <img
          onClick={() => dispatch({ type: THEME_TOGGLE })}
          className="header-theme-toggle"
          src={darkToggle}
          alt="Theme Toggle"
        />
      </div>
    </header>
  );
}