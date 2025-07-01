import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url,
    setDiscountPercent,
    discountPercent,
  } = useContext(StoreContext);

  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const hasItems = food_list.some((food) => cartItems[food._id] > 0);

  const subtotal = getTotalCartAmount();
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 0 ? 20 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoInput.toLowerCase() === "licious25") {
      setDiscountPercent(25);
      setPromoApplied(true);
      setError("");
    } else {
      setDiscountPercent(0);
      setPromoApplied(false);
      setError("Invalid promo code");
    }
  };

  return (
    <div className="cart">
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Modify</p>
      </div>
      <hr />

      {hasItems ? (
        <>
          {food_list.map((food) => {
            if (cartItems[food._id] > 0) {
              return (
                <div className="cart-items-item" key={food._id}>
                  <img src={`${url}/image/${food.image}`} alt="food-img" />
                  <p>{food.name}</p>
                  <p>₹{food.price}</p>
                  <p>{cartItems[food._id]}</p>
                  <p>₹{cartItems[food._id] * food.price}</p>
                  <div className="food-item-counter cart-counter">
                    <img
                      onClick={() => removeFromCart(food._id)}
                      src={assets.remove_icon_red}
                      alt="minus"
                    />
                    <p>{cartItems[food._id]}</p>
                    <img
                      onClick={() => addToCart(food._id)}
                      src={assets.add_icon_green}
                      alt="add"
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{subtotal}</p>
              </div>

              {discountPercent > 0 && (
                <div className="cart-total-details">
                  <p>Discount ({discountPercent}% off)</p>
                  <p>-₹{discountAmount.toFixed(2)}</p>
                </div>
              )}

              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{deliveryFee}</p>
              </div>

              <hr />
              <div className="cart-total-details">
                <p><strong>Total</strong></p>
                <p><strong>₹{total.toFixed(2)}</strong></p>
              </div>
              <button onClick={() => navigate("/order")}>Proceed to Checkout</button>
            </div>

            <div className="cart-promocode">
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <button className="btn" onClick={handleApplyPromo}>
                  Apply
                </button>
              </div>
              {promoApplied && <p className="success-text">Promo code applied!</p>}
              {error && <p className="error-text">{error}</p>}
            </div>
          </div>
        </>
      ) : (
        <div className="empty-message">
          <p>Cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
