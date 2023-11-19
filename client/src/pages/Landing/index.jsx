import Signup from "../../components/SignUp";
import Login from '../../components/Login';

export const Landing = () => {
  return (

  <div className="container">
    
    <Signup className='signup'/>
    
    <Login />
  </div>
  );
}

export default Landing;