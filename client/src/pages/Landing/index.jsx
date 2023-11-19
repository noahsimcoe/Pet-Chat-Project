import Signup from "../../components/SignUp";
import Login from '../../components/Login';

export const Landing = () => {
  return (

  <div className="container">
    
    <Signup className='signup'/>
    <h1>Login</h1>
    <Login />
  </div>
  );
}

export default Landing;