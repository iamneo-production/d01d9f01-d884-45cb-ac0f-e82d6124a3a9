import { login } from "../services/userService";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm} from "react-hook-form";
import * as Yup from 'yup';
import { useState } from "react";
import {useNavigate, useLocation } from 'react-router-dom';

const Login=()=>{
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "home";
    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .required("enter email")
        .email("Enter valid email"),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    })
    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const submit=(data)=>{
        
        login(data.email,data.password).then((response)=>{
            const k = response?.data?.role;
            var role=[]
            role.push(k)
            const user = response?.data?.email;
            localStorage.setItem("user", JSON.stringify({user,role}));
            navigate(from, { replace: true });
          },
          (error)=>{
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(error.response.status==404 ?error.response.data:resMessage);
          }
        
          )
    }
    return(
        <div className="card text-center signup">
            <div className="card-body">
                <h5>{message}</h5>
            <h1>Login</h1>
            <div style={{width:"500px",position:"absolute",left:"40px"}}>
            <form onSubmit={handleSubmit(submit)} className="add-product-Form">
            <div className="mb-3 row">
            <input type="email" id="email" placeholder="Enter Email" {...register("email")} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            
            <div className="mb-3 row">
            <input type="password"  id="password" placeholder="Password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <input type="submit" className="btn btn-primary" id="loginButton" value="Login"/><br/>
            <div><p>New User? <a href="/signup" id="signupLink">Sign Up</a></p></div>
            </form>
            </div>
        </div>
        </div>
    )
}
export default Login;