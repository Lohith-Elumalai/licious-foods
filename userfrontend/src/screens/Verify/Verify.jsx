import {useEffect, useContext} from 'react'
import {useSearchParams} from 'react-router-dom'
import {StoreContext} from '../../context/StoreContext'
import './Verify.css'
import Loader from '../../components/Loader/Loader'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Verify = () => {

    

    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    console.log(success,orderId)
    const {url} = useContext(StoreContext);

    const verifyPayment = async()=>{

        try {
            const reponse = await axios.post(`${url}/api/order/verify`,{orderId,success});   //check
            if(reponse.data.message=='Payment failed')
                navigate('/');
            else
                navigate('/myorders');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        verifyPayment();
      }, []);

  return (
    <Loader />
  )
}

export default Verify