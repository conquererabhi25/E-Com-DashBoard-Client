import React, { useState,useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Rings } from 'react-loader-spinner';

const apiStatusCalls = {initial:"INITIAL",success:"SUCCESS",failure:"FAILURE",loader:"LOADER"}
const UpdateProducts = () => {
  const [name, setname] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Mobile');
  const [company, setcompany] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [brandError, setBrandError] = useState('');
  const [apiStatus,setApiStatus] = useState(apiStatusCalls.initial)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    getSingleProductDetails()
  },[])

  const getSingleProductDetails=async()=>{
    const productId = params.id
    const options = {
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    }
    const apiUrl = `https://e-com-backend-server-5-hyas.onrender.com/products/${productId}`
    const serverCall = await fetch(apiUrl,options)
    const JsonData = await serverCall.json()
    setname(JsonData.name)
    setPrice(JsonData.price)
    setCategory(JsonData.category)
    setcompany(JsonData.company)
  }

  const handleProductNameChange = (e) => {
    setname(e.target.value);
    setProductNameError('');
  };

  const handlePriceChange = (e) => {
    const inputPrice = e.target.value;
    if (/^\d*$/.test(inputPrice) || inputPrice === '') {
      setPrice(inputPrice);
      setPriceError('');
    } else {
      setPriceError('Please enter a valid price (numbers only)');
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBrandChange = (e) => {
    setcompany(e.target.value);
    setBrandError('');
  };

 
  const addMoreProducts=()=>{
    setApiStatus(apiStatusCalls.initial)
  }


  // Update Product API 

  const handleConfirm =async()=>{

    const productId = params.id
    const updateProductAPI = `https://e-com-backend-server-5-hyas.onrender.com/product/${productId}`
    const options ={
        method:"put",
        body:JSON.stringify({name,price,category,company}),
        headers:{
            "Content-Type":"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    }
    const serverCall = await fetch(updateProductAPI,options)
   
    if(serverCall.ok){
      const JsonData = await serverCall.json()
      navigate("/")
    }
    else{
      alert("Failed to update Product please try later!")
    }
  }





const handleClose = closePopup => {
  // Close the popup
  closePopup();
};


  const AddProductFormView=()=>(
    <div className="lg:w-full md:max-w-md w-[90vw]  mx-auto mt-8 p-6  rounded-md shadow-2xl bg-slate-100">
      <h2 className="text-xl text-center font-semibold text-gray-900 mb-4">Update Product</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={name}
            onChange={handleProductNameChange}
            className="mt-1 pl-2 lg:text-md h-12 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
            placeholder="Enter Product Name"
          />
          <p className="text-red-500 text-sm mt-1">{productNameError}</p>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Enter Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={handlePriceChange}
            className="mt-1 block pl-2 w-full h-12 border-gray-300 rounded-md shadow-sm  sm:text-sm text-gray-700"
            placeholder="Enter Price"
          />
          <p className="text-red-500 text-sm mt-1">{priceError}</p>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 h- block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Mobile">Mobile</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
            <option value="plants">Plants</option>
            <option value="books">Books</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Enter Company or Brand Name
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={company}
            onChange={handleBrandChange}
            className="mt-1 block w-full h-12 pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Company or Brand Name"
          />
          <p className="text-red-500 text-sm mt-1">{brandError}</p>
        </div>
       

      
      </form>
     
      <Popup
      trigger={ <button
        type="button"
        className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update Product
      </button>}
      position="center"
      closeOnDocumentClick={true}
      
    >
      {close => (
        <div className="p-8 w-72 md:w-96 rounded-lg shadow-lg mb-10 border-blue-600 border-2 bg-[#dfe9f0]">
          <h2 className="text-md text-center font-semibold mb-4">Confirm Product Update</h2>
          <p className='text-sm font-semibold'>Product&emsp;&emsp;:- {name}</p>
          <p className='text-sm font-semibold'>Price &emsp;&emsp;&emsp;:- {price}</p>
          <p className='text-sm font-semibold'>Category &emsp;:- {category}</p>
          <p className='text-sm font-semibold'>Company &emsp;:- {company}</p>
          <p className='text-sm text-red-700 mt-3'>Check all fields are correct before confirm to update</p>
          <div className="flex justify-between mt-4">
            <button className="bg-slate-500 hover:bg-slate-700 text-white p-1 rounded-md text-sm w-24" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="bg-red-600 hover:bg-red-800 text-white p-1 rounded-md text-sm w-24" onClick={() => handleClose(close)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
    </div>
  )

  const lodingView =()=>(
    <div className="flex flex-col w-screen items-center justify-center">
     <h1>Loading...</h1>
     <Rings
       type="Puff"
       color="#00BFFF"
       height={100}
       width={100}
       timeout={3000} // 3 secs
     />
   </div>
  )

  const SuccessView =()=>(
    <div className='flex flex-col w-screen items-center justify-center h-screen'>
      <h1>Product Added successfully</h1>
      <button type="button" onClick={addMoreProducts} className='bg-blue-700 text-white p-1 rounded-md text-sm'>Add More Product</button>
    </div>
  )

  const loadingView=()=>(
    <div>
      <h1>Loading....</h1>
    </div>
  )

  const FailureView=()=>(
    <div>
      <h1>Failure</h1>
    </div>
  )

  const apiStatusViews=()=>{
    switch(apiStatus){
        case apiStatusCalls.initial:
            return AddProductFormView()
            case apiStatusCalls.success:
                return SuccessView()
                case apiStatusCalls.failure:
                    return FailureView()
                    case apiStatusCalls.loader:
                      return loadingView()
                    default :
                    return null
    }
  }
  return(
    <div className='bg-slate-200 min-h-screen'>
      {apiStatusViews()}
    </div>
  )

};






export default UpdateProducts;
