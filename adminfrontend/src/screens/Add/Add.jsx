import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', Number(data.price));

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      toast(response.data.message);
      setData({
        name: '',
        description: '',
        category: 'Salad',
        price: '',
      });
      setImage(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="screen">
      <div className="container">
        <form onSubmit={onSubmitHandler} className="flex-col">
          <div className="add-img-upload flex-col">
            <p>Upload an image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                className="upload-area"
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              name="name"
              placeholder="Type here"
              required
            />
          </div>
          <div className="add-product-despcription flex-col">
            <p>Product Description</p>
            <textarea
              value={data.description}
              onChange={onChangeHandler}
              name="description"
              rows="6"
              placeholder="Type here"
              required
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Category</p>
              <select
                value={data.category}
                onChange={onChangeHandler}
                name="category"
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Price</p>
              <input
                value={data.price}
                onChange={onChangeHandler}
                type="number"
                name="price"
                placeholder="₹150"
                required
              />
            </div>
          </div>
          <button className="add-btn" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
