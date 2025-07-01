import {useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './screens/Home/Home'
import Cart from './screens/Cart/Cart'
import Order from './screens/Order/Order'
import {Routes,Route} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import {ToastContainer} from 'react-toastify'
import Verify from './screens/Verify/Verify'
import MyOrders from './screens/MyOrders/MyOrders'


const App = () => {

  const[showLogin, setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer/>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />

        </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
