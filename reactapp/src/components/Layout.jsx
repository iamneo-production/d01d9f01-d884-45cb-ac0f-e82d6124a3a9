import { Outlet,useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "../services/userService"
const Layout = () => {
    const navigate = useNavigate();
    const user=getCurrentUser();
    const handleLogout=()=>{
        logout()
        navigate("/")
    }
    return (
        <main>
            <nav class="navbar navbar-expand-lg navbar-light bg-success">
            <div class="container-fluid">
            <a class="navbar-brand text-info" href="#">Strafe</a>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
{user?.user.role=="USER"?
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active text-white" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Cart</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">My Order</a>
        </li>
        </ul>:
        
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li class="nav-item">
          <a class="nav-link text-white" href="addProduct">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Orders</a>
        </li>
        
        </ul>
        }
<button className="btn btn-primary btn-sm" onClick={handleLogout}>Logout</button>
    </div>
        </div>
    </nav>
            <Outlet />
        </main>
    )
}

export default Layout