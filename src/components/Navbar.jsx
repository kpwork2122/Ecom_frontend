import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import './navbar.css'

function Navbar() {
    const navigate  = useNavigate();
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const navbarRef = useRef(null);

    useEffect(() => {
        const navbar = navbarRef.current;
        const collapseEl = document.getElementById("navbarSupportedContent");

        const updateBodyPadding = () => {
            document.body.style.paddingTop = navbar.offsetHeight + "px";
        };

        // Set initial padding
        updateBodyPadding();

        // Update padding when menu opens/closes
        collapseEl.addEventListener("shown.bs.collapse", updateBodyPadding);
        collapseEl.addEventListener("hidden.bs.collapse", updateBodyPadding);

        // Update on resize
        window.addEventListener("resize", updateBodyPadding);

        return () => {
            collapseEl.removeEventListener("shown.bs.collapse", updateBodyPadding);
            collapseEl.removeEventListener("hidden.bs.collapse", updateBodyPadding);
            window.removeEventListener("resize", updateBodyPadding);
        };
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        navigate("/");
    }

    return(
        <nav ref={navbarRef} className="navbar fixed-top navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                <span className="navbar-brand" style={{marginRight: "10px", cursor: "pointer"}} onClick={() => navigate("/home")}>EShop</span> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item ms-auto me-2 pe-3 ">
                            <span onClick={() => navigate("/cart")}><i className="bi bi-cart4"></i>Cart</span>
                        </li>
                        <li className="nav-item ms-auto me-2 ">
                            <span onClick={() => navigate("/orders")}>Orders</span>
                        </li>
                        <li className="nav-item ms-auto me-2 ">
                            {isAdmin && <span onClick={() => navigate("/admin")}><i class="bi bi-person-fill"></i>Admin</span>}
                        </li>
                        <li className="nav-btn ms-auto me-3 ">
                            <button className="logout-btn" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i></button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;