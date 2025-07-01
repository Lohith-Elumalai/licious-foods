import {useState, useContext, useEffect} from 'react'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import Loader from '../../components/Loader/Loader';
import './MyOrders.css'

const MyOrders = () => {

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {url, token, setToken} = useContext(StoreContext);

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/order/userorders`, {headers: {token}});
        setData(response.data.data);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
      finally {
        setIsLoading(false);
      }

    }


    useEffect(() => {
        if(token)
            fetchOrders();
      }, [token]);

      if(isLoading){
        return <Loader />
      }

  return (
    <div>
            <div className="my-orders">
                <h2>My Orders</h2>
                <div className="container">
                    {   data.length === 0 ? <p>No orders found</p> :
                        data.map((order,index) => {
                            return (
                                <div key={index} className="my-orders-order">
                                    <img src={assets.parcel_icon} alt="" />
                                    <p>{
                                        order.items.map((item,itemIndex) => {
                                            if(itemIndex === order.items.length-1){
                                                return `${item.name} x ${item.quantity}`
                                            }else{
                                                return `${item.name} x ${item.quantity}, `
                                            }
                                        })  
                                        }
                                    </p>
                                    <p>₹{order.amount}</p>
                                    <p>Items: {order.items.length}</p>
                                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                    <button onClick={fetchOrders}>Track Order</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
    </div>
  )
}

export default MyOrders