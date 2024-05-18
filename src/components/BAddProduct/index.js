import React, { useState } from 'react';
import { Rings } from 'react-loader-spinner';
import Popup from 'reactjs-popup';
import ProductAddAnimation from "./ProductAddAnimation.json"
import Lottie from 'lottie-react';


const apiStatusCalls = {initial:"INITIAL",success:"SUCCESS",failure:"FAILURE",loader:"LOADER"}
const BAddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('mobile');
  const [brand, setBrand] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [brandError, setBrandError] = useState('');
  const [apiStatus,setApiStatus] = useState(apiStatusCalls.initial)

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
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
    setBrand(e.target.value);
    setBrandError('');
  };

  const handleConfirm = async() => {
    let isValid = true;

    if (!productName.trim()) {
      setProductNameError('Please enter a product name');
      isValid = false;
    }

    if (!price.trim()) {
      setPriceError('Please enter a price');
      isValid = false;
    }

    if (!brand.trim()) {
      setBrandError('Please enter a brand/company name');
      isValid = false;
    }

    if (isValid) {
      // Proceed with adding the product
      console.log('Product added successfully');
      // Reset form fields and errors
      setProductName('');
      setPrice('');
      setCategory('mobile');
      setBrand('');

    setApiStatus(apiStatusCalls.loader)
    const addProductServerApi = "https://e-com-backend-server-5-hyas.onrender.com/add-product"
    const userId = JSON.parse(localStorage.getItem("userDetails"))._id;
    const options = {
        method: "post",
        body: JSON.stringify({name:productName,price:price,category:category,userId:userId,company:brand}),
        headers: {
          "Content-Type": "application/json",
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      };
      const fetchServerData = await fetch(addProductServerApi,options)
      if(fetchServerData.ok){
        const JsonFormatData = await fetchServerData.json()
        setApiStatus(apiStatusCalls.success)
    
      }
      else{
        setApiStatus(apiStatusCalls.failure)
      }
     
    
    }
  };

  const addMoreProducts=()=>{
    setApiStatus(apiStatusCalls.initial)
  }


  
 
  const handleClose = closePopup => {
    // Close the popup
    closePopup();
  };

  const AddProductFormView=()=>(
    <div className="lg:w-full md:max-w-md w-[90vw] mx-auto mt-8 p-6 bg-slate-100 rounded-md shadow-2xl">
      <h2 className="text-xl text-center font-semibold text-gray-900 mb-4">Add a New Product</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productName}
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
            <option value="mobile">Mobile</option>
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
            value={brand}
            onChange={handleBrandChange}
            className="mt-1 block w-full h-12 pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Company or Brand Name"
          />
          <p className="text-red-500 text-sm mt-1">{brandError}</p>
        </div>
    
        <Popup
      trigger={    <button
        type="button"
        className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Product
      </button>}
      position="center"
      closeOnDocumentClick={true}
    >
      {close => (
        <div className="p-8 bg-[#dfe9f0] w-72 md:w-96 rounded-lg shadow-lg border-blue-600 border-2">
          <h2 className="text-md text-center font-semibold mb-4">Confirm Add Product</h2>
          <p className='text-sm font-semibold'>Product&emsp;&emsp;&emsp;:- {productName}</p>
          <p className='text-sm font-semibold'>Price  &emsp;&emsp;&emsp;&emsp;:- {price}</p>
          <p className='text-sm font-semibold'>Category &emsp;&emsp;:- {category}</p>
          <p className='text-sm font-semibold'>Company &emsp;&emsp;:- {brand}</p>
          <p className='text-sm text-red-500 mt-5'>Please check all details before clicking to confirm</p>
          <div className="flex justify-between mt-4">
            <button className="bg-slate-500 w-24 hover:bg-slate-700 text-white p-1 text-sm rounded-md" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="bg-red-500 w-24 hover:bg-red-700 text-white p-1 text-sm rounded-md" onClick={() => handleClose(close)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
      </form>
   
    </div>
  )

  const lodingView =()=>(
    <div className="flex flex-col w-[80vw] items-center justify-center">
      <h1>Loading...</h1>
      <Rings
        type="Puff"
        color="#00BFFF"
        height={200}
        width={200}
        timeout={3000} // 3 secs
      />
    </div>
  )

  const SuccessView =()=>(
    <div className='flex flex-col w-screen items-center justify-center h-screen'>
      <Lottie animationData={ProductAddAnimation} className="size-[40vh]" loop={false}/>
      <h1 className='font-semibold'>Product Added successfully</h1>
      <button type="button" onClick={addMoreProducts} className='bg-green-700 mt-3 text-white p-2 rounded-md text-sm'>Add More Product</button>
    </div>
  )

  const loadingView=()=>(
    <div className="flex flex-col w-screen items-center justify-center">
    <h1>Loading...</h1>
    <Rings
      type="Puff"
      color="#00BFFF"
      height={200}
      width={200}
      timeout={3000} // 3 secs
    />
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
                      return lodingView()
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






export default BAddProduct;
