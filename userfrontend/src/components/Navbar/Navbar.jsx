import { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ showLogin, setShowLogin }) => {
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const [menu, setMenu] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        navigate('/');
    }

    const isCartPage = location.pathname === '/cart' || location.pathname === '/myorders' || location.pathname === '/features';
    const isFeaturesPage = location.pathname === '/features' ;

    return (
        <div className='navbar'>
            <Link to='/' onClick={() => setMenu('home')}>
                <img className="navbar-logo" src={assets.logo} alt="logo" />
            </Link>

            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
                
                {!isCartPage && (
                    <a href="#explore-menu">
                        <li onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</li>
                    </a>
                )}

                <a href="#footer">
                    <li onClick={() => setMenu('contact')} className={menu === 'contact' ? 'active' : ''}>Contact us</li>
                </a>

                <Link to="/features" onClick={() => setMenu('features')} className={menu === 'features' ? 'active' : ''}>
                Features
                </Link>


                
            </ul>

            <div className="navbar-right">
                <div className='navbar-basket-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt="basket-icon" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {
                    !token
                        ? <button onClick={() => setShowLogin(true)}>Sign in</button>
                        : <div className="navbar-profile">
                            <img src={assets.profile_icon} alt="profile" />
                            <ul className='navbar-profile-dropdown'>
                                <li><img src={assets.bag_icon} alt='bag-icon'/><p onClick={()=>navigate("/myorders")}>Orders</p></li>
                                <hr />
                                <li onClick={logout}><img src={assets.logout_icon} alt="logout" /><p>Logout</p></li>
                            </ul>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar;
