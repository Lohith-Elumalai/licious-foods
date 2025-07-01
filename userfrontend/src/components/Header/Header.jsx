import React, { useEffect, useState } from 'react';
import './Header.css';

const images = [
  '/headerimg/header_img1.jpg',
  '/headerimg/header_img2.jpg',
  '/headerimg/header_img3.jpg',
  '/headerimg/header_img4.jpg',
  '/headerimg/header_img5.jpg',
  '/headerimg/header_img6.jpg',
  '/headerimg/header_img7.jpg',
  '/headerimg/header_img8.jpg',
];

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <h2 className='h2h'>Order your favourite food here</h2>
    <div
      className='header'
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className='header-contents'>
        <button>View Menu</button>
      </div>
    </div></>
    
  );
};

export default Header;
