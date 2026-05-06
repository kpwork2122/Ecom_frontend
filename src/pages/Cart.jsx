import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import './style.css'


function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const[pincode, setPincode] = useState("")
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const config = {headers: {Authorization : `Bearer ${token}`}}
     const api =  import.meta.env.VITE_API_URL;

    const fetchCart =  async () => {
        try{
            const res = await axios.get(`${api}/cart`, config);
            setCart(res.data.items);
            setTotal(res.data.total)
        }catch(err){
            console.log(err);
        }
    }

    const removeFromCart = async (productId) => {
        try{
            const res = await axios.delete(`${api}/cart/${productId}`, config);
            fetchCart();
        }catch(err){
            alert(err.response.data.message);
        }
    }

    const placeOrder = async (e) => {
         e.preventDefault(); // 🔥 THIS FIXES IT
        if (!street.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
            alert("Please fill in all shipping address fields.");
            return;
        }
        try{
            const res = await axios.post(`${api}/orders`, {shippingAddress: {street, city, state, pincode}}, config);
            alert("Order placed successfully");
            navigate("/orders")
        }catch(err){
            console.log(err)
            alert(err.response.data.message);
        }       
    }

    useEffect(()=> {fetchCart()}, [])

    return(
        <div>
            <Navbar/>
            <div className="container-fluid">
                <div className="py-2 cartPage">
                    <div className="col-sm-12 col-md-6 col-lg-5">
                    <h1 className="cart-title">My Cart</h1>
                    <div className="cart-card">
                    <h3 className="cart-total">Total: AED {total}</h3>
                    {cart.length === 0 ? (<p>Your cart is empty!</p>) : (
                        <>
                            <ul className="cart-item">
                                {cart.map(item => (
                                    <li className="cart-list" key={item._id}>
                                         {item.product ? (
                                                            <>
                                                                <strong>{item.product.name}</strong> 
                                                                {" - "} ₹{item.product.price} × {item.quantity}
                                                            </>
                                                            ) : (
                                                            <span style={{ color: "red" }}>
                                                                Product removed or unavailable
                                                                <button onClick={() => removeFromCart(item.product._id)}>
                                                                    <i className="bi bi-trash3"></i>
                                                                </button>
                                                            </span>
                                                            )}

                                                            {item.product && (
                                                            <button onClick={() => removeFromCart(item.product._id)}>
                                                                <i className="bi bi-trash3"></i>
                                                            </button>
                                                            )}

                                    </li>
                                ))}
                            </ul>
                            <form className="address-form" onSubmit={placeOrder}>
                            <h3 className="address-titile">Shipping Address</h3>
                                <input type="text" placeholder="Street" required value={street} onChange={(e) => setStreet(e.target.value)} /><br />
                                <input type="text" placeholder="City" required value={city} onChange={(e) => setCity(e.target.value)} /><br />
                                <input type="text" placeholder="State" required value={state} onChange={(e) => setState(e.target.value)} /><br />
                                <input type="text" placeholder="Pincode" required value={pincode} onChange={(e) => setPincode(e.target.value)} /><br />
                                <button type="submit">Place Order</button>
                            </form>
                        </>
                    )}
                    </div>
                    </div>
                  </div>
                </div>
        </div>
    )
}

export default Cart;