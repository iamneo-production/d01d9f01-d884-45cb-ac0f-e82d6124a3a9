import { yupResolver } from '@hookform/resolvers/yup';
import { useForm} from "react-hook-form";
import * as Yup from 'yup';
import { saveUser } from '../services/userService';
import "yup-phone";
import { useState } from 'react';
const Signup=()=>{
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .required("enter email")
        .email("Enter valid email"),
        username:Yup.string()
        .required("Username is required"),
        phoneNumber:Yup.string()
        .required("Phone Number isRequired")
        .phone("IN",true),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
      })
      const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
  const submit=(data)=>{
  saveUser(data.email,data.username,data.password,data.phoneNumber).then((response)=>{
    setSuccess(true)
  },
  (error)=>{
    const resMessage =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();
  setMessage(resMessage);
  }

  )
  
  }
    return(
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
            <div className="card text-center signup">
            <div className="card-body">
            <h5>{message}</h5>
            <h1>Sign Up</h1>
            <form  onSubmit={handleSubmit(submit)} className="add-product-Form">
            <div className="mb-3 row">
            <input type="email"  id="email" placeholder="Enter Email" {...register("email")} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="mb-3 row">
            <input type="text"  id="username" placeholder="Enter Username" {...register("username")} className={`form-control ${errors.username ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="mb-3 row">
            <input type="phone"  id="mobileNumber" placeholder="Enter Phone Number" {...register("phoneNumber")} className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.phoneNumber?.message}</div>
            </div>
            <div className="mb-3 row">
            <input type="password"  id="password" placeholder="Password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="mb-3 row">
            <input type="password"  id="confirmPassword" placeholder="Confirm Password"  {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
            </div>
            <input type="submit" className="btn btn-primary" id="submitButton" /><br/>
            <div><p>Already a User <a href="/" id="signinLink">Login</a></p></div>
            </form>
            </div>
            </div>
       )}
        </>
            
    )

}
export default Signup;