import React, { useEffect, useState } from 'react';
import './TimeSuggestionPopup.css';

const TimeSuggestionPopup = ({ setCategory }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [combo, setCombo] = useState([]);
  const [timeMessage, setTimeMessage] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    let selectedCombo = [];
    let message = '';

    if (hour >= 5 && hour < 11) {
      selectedCombo = ['sandwich', 'cake'];
      message = '☀️ It’s breakfast time!';
    } else if (hour >= 11 && hour < 16) {
      selectedCombo = ['pasta', 'deserts'];
      message = '🍝 It’s lunch time!';
    } else if (hour >= 16 && hour < 22) {
      selectedCombo = ['noodles', 'rolls'];
      message = '🍽️ It’s dinner time!';
    } else {
      selectedCombo = ['salad', 'pure veg'];
      message = '🌙 It’s late night, go light!';
    }

    setCombo(selectedCombo);
    setTimeMessage(message);
    setShowPopup(true);

    const timer = setTimeout(() => setShowPopup(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (dish) => {
    if (setCategory) {
      setCategory(dish === 'pure veg' ? 'Pure Veg' : dish.charAt(0).toUpperCase() + dish.slice(1));
    }

    const section = document.getElementById('explore-menu');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!showPopup) return null;

  return (
    <div className="popup">
      <p className="time-message">{timeMessage}</p>
      <p>
        Hungry? Try our combo{" "}
        {combo.map((dish, index) => (
          <span
            key={index}
            className="combo-link"
            onClick={() => handleClick(dish)}
          >
            {dish.charAt(0).toUpperCase() + dish.slice(1)}
            {index < combo.length - 1 ? " and " : ""}
          </span>
        ))}
      </p>
      <button onClick={() => setShowPopup(false)}>Close</button>
    </div>
  );
};

export default TimeSuggestionPopup;
