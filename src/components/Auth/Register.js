import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiService';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import Language from '../Header/Language';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitRegister = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid Email!");
            return;
        }

        if (!password) {
            toast.error("Invalid Password!");
            return;
        }
        //submit
        let data = await postRegister(email, password, username);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div className="register-container">
            <div className='register-header'>
                <span>Already have an account?</span>
                <button onClick={() => navigate('/login')}>Log in</button>
                <Language />
            </div>
            <div className='register-title col-4 mx-auto'>
                PHT
            </div>
            <div className='register-welcome col-4 mx-auto'>
                Hello, you need to have an account?
            </div>
            <div className='register-content col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input type='email' className='form-control' value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group pass-group'>
                    <label>Password (*)</label>
                    <input type={showPassword ? 'text' : 'password'} className='form-control' value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <span className='icons-eye' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VscEye /> : <VscEyeClosed/>}
                    </span>
                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input type='text' className='form-control' value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />  
                </div>
                <div>
                    <button className='btn-register' onClick={handleSubmitRegister}>Register</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => navigate('/')}>
                        &#60;&#60; Go to Homepage
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register;