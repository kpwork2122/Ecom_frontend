import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const api =  import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${api}/orders/myorders`,
        config
      );
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
      <div className="orders-page">
        <h1 className="text-center mb-5 orders-title">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center empty-orders">
            <i className="bi bi-bag-x fs-1 mb-3"></i>
            <p>No orders yet!</p>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div key={order._id}>
                <div className="card order-card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
                      <div>
                        <h5 className="card-title mb-1">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </h5>
                        <p className="mb-0 order-date">
                          Status: <span className="status-badge">{order.status}</span>
                        </p>
                      </div>

                      <div className="text-md-end mt-3 mt-md-0">
                        <h4 className="order-total mb-0">
                          ₹{order.totalAmount}
                        </h4>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h6 className="section-heading">Shipping Address</h6>
                      <p className="mb-0 address-text">
                        {order.shippingAddress.street},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.pincode}
                      </p>
                    </div>

                    <div className="list">
                      <h6 className="section-heading">Items Ordered</h6>
                      <ul className="list-group list-group-flush">
                        {order.items.map((item) => (
                          <li
                            key={item._id}
                            className="list-group-item order-item d-flex justify-content-between align-items-center"
                          >
                            <span>
                              {item.product.name} × {item.quantity}
                            </span>
                            <span className="item-price"> ₹{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
}

export default Orders;