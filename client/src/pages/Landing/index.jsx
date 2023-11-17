import Signup from "../../components/SignUp";
import Login from '../../components/Login';

export const Landing = () => {
  return (

  <div>
    <h1>Sign Up</h1>
    <Signup />
    <h1>Login</h1>
    <Login />
  </div>
  );
}

export default Landing;