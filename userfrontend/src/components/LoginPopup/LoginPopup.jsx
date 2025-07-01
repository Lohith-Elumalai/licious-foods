import { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { url, token, setToken } = useContext(StoreContext);

  const [curState, setCurState] = useState('Sign in');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let newUrl = url;

    if (curState === 'Sign in') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, data);
      if (curState === 'Sign up') {
        toast.success('Account created successfully! Please sign in.');
        setCurState('Sign in');
      } else {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful!');
        setShowLogin(false);
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="login-popup-inputs">
          {curState !== 'Sign in' && (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{curState}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to Terms and Conditions</p>
        </div>
        {curState === 'Sign in' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurState('Sign up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurState('Sign in')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
