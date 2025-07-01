import { menu_list } from "../../assets/assets";
import {useState} from "react";
import "./ExploreMenu.css";

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and leave you craving more.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory((category) => category === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
              <img className={category===item.menu_name ? 'active' : ''} src={item.menu_image} alt="dish-img" />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr></hr>
    </div>
  );
};

export default ExploreMenu;
