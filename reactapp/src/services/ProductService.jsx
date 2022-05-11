import axios from "axios";
const getAllProducts=()=>{
    return axios
        .get("http://localhost:8001/admin")
        .then((response) => {
          return response.data;
        },
        (error)=>{
            console.log(error.response);

        });
}
const addProduct=(imageUrl,productName,price,desc,quantity)=>{
    return axios.post(
        "http://localhost:8001/admin/addProduct",{
            imageUrl,
        productName,
        price,
        desc,
        quantity
      }
    )
    .then((response)=>{
      return response
    },
    (error)=>{
      console.log(error.response);
    }

    )
  
  }
export {getAllProducts,addProduct}