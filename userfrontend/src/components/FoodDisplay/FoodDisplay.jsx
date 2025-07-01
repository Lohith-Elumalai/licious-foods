import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodCard from '../FoodCard/FoodCard';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodCard
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  description={item.description}
                />
              );
            }
            return null;
          })
        }
      </div>
    </div>
  );
};

export default FoodDisplay;
