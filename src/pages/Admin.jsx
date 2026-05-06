import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import './admin.css'

function Admin() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Electronics")
  const [imageFile, setImageFile] = useState(null);
  const [stock, setStock] = useState("")

  const token = localStorage.getItem("token")
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const api =  import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${api}/products`)
      setProducts(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${api}/orders`, config)
      setOrders(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // const handleAddProduct = async (e) => {
  //   e.preventDefault()
  //   try {
  //     await axios.post(`${api}/products`, {
  //       name, description, price: Number(price), category, stock: Number(stock)
  //     }, config)
  //     alert("Product added!")
  //     setName(""); setDescription(""); setPrice(""); setStock("")
  //     fetchProducts()
  //   } catch (err) {
  //     alert(err.response.data.message)
  //   }
  // }

  const handleAddProduct = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("category", category);
    formData.append("stock", Number(stock));
    formData.append("image", imageFile); // 👈 VERY IMPORTANT

    await axios.post(`${api}/products`,formData,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`
                          // ❌ don't manually set Content-Type
                        }
                      });

    alert("Product added!");
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setImageFile(null);

    fetchProducts();

  } catch (err) {
    alert(err.response?.data?.message || "Error adding product");
  }
};

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${api}/products/${id}`, config)
      fetchProducts()
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axios.put(`${api}/orders/${orderId}`, { status }, config)
      fetchOrders()
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchOrders()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
      <div className="py-3 admin-page">
      <h1 className="admin-title text-center mb-5">Admin Dashboard</h1>
      
  {/* Add Product */}
  <div className="card admin-card mb-5">
  <h2 className="ms-3 mt-3">Add Product</h2>

  <div className="card-body">
    <form onSubmit={handleAddProduct}>
      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6 col-lg">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6 col-lg">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6 col-lg">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Food</option>
            <option>Books</option>
            <option>Other</option>
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg">
          <input
            type="number"
            className="form-control"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6 col-lg">
        <input 
          type="file" 
          onChange={(e) => setImageFile(e.target.files[0])} 
        />
        </div>

        <div className="col-12 col-md-6 col-lg">
          <button className="btn btn-success w-100" type="submit">
            Add Product
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

      {/* Products List */}
  <div className="card admin-card mb-5">
  <div className="card-body">
    <h2 className="section-title mb-4">All Products</h2>

    <div className="list-group product-list">
      {products.map((product) => (
        <div
          key={product._id}
          className="list-group-item product-list-item d-flex justify-content-between align-items-center flex-wrap gap-3"
        >
          <div>
            <h6 className="mb-1">{product.name}</h6>
            <small className="text-muted">
              ₹{product.price} • Stock: {product.stock} • {product.category}
            </small>
          </div>

          <button
            className="btn-remove"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Orders List */}
      <div className="card admin-card">
  <div className="card-body">
    <h2 className="section-title mb-4">All Orders</h2>

    {orders.map((order) => (
      <div key={order._id} className="order-row mb-3 p-3 rounded">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md-6 col-lg-3">
            <span className="label">User</span>
            <p className="mb-0">{order.user.username}</p>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <span className="label">Total</span>
            <p className="mb-0">₹{order.totalAmount}</p>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <span className="label">Status</span>
            <p className="mb-0 status-text">{order.status}</p>
          </div>

          <div className="col-12 col-lg-5">
            <select
              className="form-select"
              value={order.status}
              onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>
      </div>
    </div>
  )
}

export default Admin