import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN_MUTATION } from '../../utils/mutations'
import Auth from '../../utils/auth';

import { Icon } from 'react-icons-kit';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { eye } from 'react-icons-kit/feather/eye';


import './style.scss';

export default function Nav() {
    const [login, { loading }] = useMutation(LOGIN_MUTATION);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typeP, setType] = useState('password');
    const [icon, setIcon] = useState(eyeBlocked);

    const handleToggle = () => {
        if (typeP == 'password') {
            setIcon(eye);
            setType('text');
            console.log("if")
        } else {
            setIcon(eyeBlocked);
            setType('password');
        }
    };

    const logingHandler = async (evt) => {
        evt.preventDefault();

        try {
            const { data } = await login({
                variables: { email, password }
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        
        <form id="login-form" onSubmit={logingHandler}>
        <p className='loginTitle'> Login </p>
            <div className='mb-3'>
                <div>
                <label htmlFor="login-form-email" className='form-label'>Email</label>
                </div>
                <input id="login-form-email"
                type="text"
                className='form-control form-input'
                onChange={(evt) => setEmail(evt.target.value)} />
            </div>

            <div className='mb-3'>
                <div>
                <label htmlFor="login-form-password" >Password</label>
                </div>
                <div className="password-container">
                    <input id="login-form-password"
                    type={typeP}
                    className='form-control'
                    onChange={(evt) => setPassword(evt.target.value)} 
                    
                    />
                    <span className="icon-container"  style={{ cursor: 'pointer' }} >
                        <Icon className='mr-10' onClick={handleToggle} icon={icon} size={15}></Icon>
                    </span>
                </div>
            </div>
            
            <div>
                <button type="submit" disabled={loading} className='submit-btn'>Login</button>
            </div>
        </form>
        </>
    );
}