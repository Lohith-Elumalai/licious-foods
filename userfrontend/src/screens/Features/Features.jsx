import "./Features.css";
import { useState, useEffect } from "react";

const Features = () => {
  const images = [
    "/headerimg/header_img1.jpg",
    "/headerimg/header_img2.jpg",
    "/headerimg/header_img3.jpg",
    "/headerimg/header_img4.jpg",
    "/headerimg/header_img5.jpg",
    "/headerimg/header_img6.jpg",
    "/headerimg/header_img7.jpg",
    "/headerimg/header_img8.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Image Slider",
      description: "Showcases popular dishes and deals in a smooth carousel.",
      isSlider: true, // custom flag
    },
    {
      title: "Auto Time-Based Food Suggestions",
      description: "Smart popups recommend meals based on the time of day.",
      icon: "/features/clock_icon.png",
    },
    {
      title: "Promo Code Support",
      description: 'Use promo code "licious25" to get 25% off!',
      icon: "/features/promocode_icon.png",
    },
    {
      title: "Fully Responsive",
      description: "Optimized for all screen sizes, down to 470px.",
      icon: "/features/responsive_icon.png",
    },
    {
      title: "Theme Optimization",
      description: "Seamless UI with consistent colors and smooth interactions.",
      icon: "/features/theme_icon.png",
    },
  ];

  return (
    <div className="features">
      <h2>Our Features</h2>
      <div className="features-list">
        {features.map((feature, index) => (
          <div className="feature-item" key={index}>
            {feature.isSlider ? (
              <div
                className="slider-icon"
                style={{
                  backgroundImage: `url(${images[currentImageIndex]})`,
                  width: "100%",
                  height: "150px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "12px",
                  marginBottom: "20px",
                }}
              ></div>
            ) : (
              <img src={feature.icon} alt={`${feature.title} icon`} />
            )}
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
