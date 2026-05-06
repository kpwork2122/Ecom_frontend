import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import './style.css';
import { motion } from "framer-motion";

function Home() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const token= localStorage.getItem("token");
    const config = {headers: {Authorization: `Bearer ${token}`}}

    const fetchProducts = async () => {
        try{
            const res = await axios.get(`${api}/products`);
            setProducts(res.data);
        }catch(err){
            console.log(err);
        }
    }


    const addToCart = async (productId) => {
        try{
            await axios.post(`${api}/cart`, {productId, quantity: 1}, config);
            alert("Added to cart");
        }catch(err) {
            alert(err.response.data.message);
        }
    }

    useEffect(() => {fetchProducts()}, [])


    return(
        <div>
            <Navbar/>   
            <div className="container-fluid">          
                <div className="product-page">
                    <h1 className="page-title">PRODUCTS</h1>
                     <p className="page-description">
                        Browse all our latest electronics and gadgets
                    </p>
                     <form className="d-flex page-search" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn" type="submit"><i class="bi bi-search"></i></button>
                    </form>
                        <div className="row g-4">
                            {products.map(product => (
                                <div className="col-12 col-md-6 col-lg-3" key= {product._id}>
                                    <motion.div
                                    className="product-card"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    >
                                    <img 
                                        src={`${product.image}`} 
                                        alt={product.name} 
                                        className="product-image"
                                        loading="lazy"
                                        width="250"
                                        height="300"
                                    />

                                    <h3 className="product-title">{product.name}</h3>
                                    <p className="product-desc">{product.description}</p>

                                    <div className="product-footer">
                                        <p className="product-price">AED {product.price} |</p>
                                        <p className="product-category">Stock: {product.stock}</p>
                                    </div>

                                    <button 
                                        className="btn btn-sm product-btn" 
                                        onClick={() => addToCart(product._id)}
                                    >
                                        Add to Cart
                                    </button>
                                    </motion.div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Home;