import React from 'react'
import './Footer.css'
import{assets} from '../../assets/assets.js'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-left">
                <img className='footer-logo' src={assets.logo_bottom}  alt="" />
                <p>Licious is your go-to destination for freshly cooked, delicious meals delivered right to your doorstep. From comforting classics to chef-crafted specialties, we bring you a wide range of mouthwatering dishes prepared with high-quality ingredients and utmost hygiene. Whether you're craving a quick lunch, a family dinner, or a late-night bite, Licious ensures every meal is hot, flavorful, and ready to enjoy. Fast delivery, great taste—only at Licious.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-center">
                <h2>Licious Foods</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Courses</li>
                    <li>Reviews</li>
                </ul>
            </div>
            <div className="footer-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+91 8122918459</li>
                    <li>lohithelu@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        
            <p className='copyright'>Copyright &copy; 2025 Licious Foods. All rights reserved</p>
        
    </div>
  )
}

export default Footer