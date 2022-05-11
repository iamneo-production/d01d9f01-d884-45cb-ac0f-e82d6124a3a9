import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddProduct from './components/AddProduct';
import Signup from './components/Signup';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Unauthorized from './components/Unauthorized';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home';
function App() {
  return (
    <Routes>
      
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup/>} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route path="/" element={<Layout />}>
            <Route element={<RequireAuth allowedRoles={["USER","ADMIN"]} />}>
              <Route path="home" element={<Home />} />
            </Route>
            
            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
              <Route path="addProduct" element={<AddProduct />} />
            </Route>
      </Route>
    </Routes>
  );
}

export default App;
