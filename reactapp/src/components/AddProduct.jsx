import { useEffect, useState } from "react";
import { addProduct, getAllProducts } from "../services/ProductService";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm} from "react-hook-form";
import * as Yup from 'yup';
const AddProduct=()=>{
    const[list,setList]=useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let cancel = false;
        const fetchData = async () =>{
            if (cancel) return;
          setLoading(true);
          getAllProducts().then((d)=>{setList(d)})
          setLoading(false);
        }
        fetchData();
        
      return () => { 
        cancel = true}
      }, [list]);
      const validationSchema = Yup.object().shape({
        productName: Yup.string()
            .required('Product Name is required'),
            price: Yup.string()
            .required('Product price is required'),
            quantity: Yup.string()
            .required('Product Quantity is required'),
            imageUrl: Yup.string()
            .required('Product Image url is required'),
            desc: Yup.string()
            .required('Product Description is required')
      })
      const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
  const submit=(data)=>{
  addProduct(data.imageUrl,data.productName,data.price,data.desc,data.quantity)
  }
    return(
        <div>
            <div className="card text-center add-product">
            <div className="card-body">
            <h1>Add Product</h1>
                <form onSubmit={handleSubmit(submit)} className="add-product-Form">
                    <div className="mb-3 row">
                    <input type="text" id="enterProductName" placeholder="Enter the product name" {...register("productName")}
                                className={`form-control ${errors.productName ? 'is-invalid' : ''}`}/>
                                <div className="invalid-feedback">{errors.productName?.message}
                        </div>
                    </div>
                    <div className="mb-3 row">
                    <input type="text"  id="enterProductPrice" placeholder="Enter the product price" {...register("price")}
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}/>
                                <div className="invalid-feedback">{errors.price?.message}
                        </div>
                    </div>
                    <div className="mb-3 row">
                    <input type="text"  id="enterProductImageUrl" placeholder="Enter the product image url" {...register("imageUrl")}
                                className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}/>
                                <div className="invalid-feedback">{errors.imageUrl?.message}
                        </div>
                    </div>
                    <div className="mb-3 row">
                    <input type="text"  id="enterProductQuantity" placeholder="Enter the product quantity" {...register("quantity")}
                                className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}/>
                                <div className="invalid-feedback">{errors.quantity?.message}
                        </div>
                    </div> <div className="mb-3 row">
                    <input type="text"  id="enterProductDesc" placeholder="Enter the product description" {...register("desc")}
                                className={`form-control ${errors.desc ? 'is-invalid' : ''}`}/>
                                <div className="invalid-feedback">{errors.desc?.message}
                        </div>
                    </div>
                    <div className="mb-3 row">
                    <input type="submit" className="btn btn-primary btn-sm" id="addProductButton" value="Add"/>
                    </div>
                </form>
                </div>
            </div>
            <div className="product-list card text-center">
            <div className="card-body">
            <h1>All Product</h1>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    list.map((p)=>
                      <tr key={p.productId.toString()}>
                      <td>{p.productId}</td>
                      <td>{p.imageUrl}</td>
                      <td>{p.productName}</td>
                      <td>{p.price}</td>
                      <td>{p.quantity}</td>
                      </tr>
                    )
                  } 
                </tbody>
            </table>
            </div>
            </div>
        </div>
    )
}
export default AddProduct;