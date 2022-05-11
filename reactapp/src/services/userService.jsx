import axios from '../api/axios';
const saveUser=(email,username,password,mobileNumber)=>{
    const REGISTER_URL = '/signup';
    var active=true;
    var role="USER"
    return axios.post(REGISTER_URL,{
        email,
        password,
        username,
        mobileNumber,
        active,
        role
    })
}
const login=(email,password)=>{
    const REGISTER_URL = '/login';
    return axios.post(REGISTER_URL,{
        email,
        password
    })
}
const getCurrentUser=()=>{
    return JSON.parse(localStorage.getItem("user"));
  }
  const logout=()=>{
    localStorage.removeItem("user");
    
  }
  
export {saveUser,login,getCurrentUser,logout};