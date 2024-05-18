import React , {useEffect,useState} from "react"
import {Link} from "react-router-dom"
import { Rings } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import Noresult from "./Noresult.json"
import Lottie from "lottie-react"

const apiStatusCalls = {initial:"INITIAL",success:"SUCCESS",failure:"FAILURE"}

const Products =()=>{
    const [apiStatus,setApiStatus] = useState(apiStatusCalls.initial)
    const [productList,setProductList] = useState([])
    const [serachItem,setSearchItem] = useState("")

    useEffect(()=>{
        fetchAppProducts()

    },[])

    const fetchAppProducts =async()=>{
        const token = JSON.parse(localStorage.getItem("token"))
        const options = {
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        const newAPi = "https://e-com-backend-server-5-hyas.onrender.com/products"
        const fetchProductsData = await fetch(newAPi,options)
        const jsonData = await fetchProductsData.json()

       
        if(fetchProductsData.ok){
            setProductList(jsonData)
            setApiStatus(apiStatusCalls.success)
        }
        else{
           
            setApiStatus(apiStatusCalls.failure)
        }
        
       
    }



    const userSearchInput=async(e)=>{
        const userSearch = e.target.value
        const options = {
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        if(userSearch===""){
            fetchAppProducts()
        }
        else{
            const searchProductAPI = `https://e-com-backend-server-5-hyas.onrender.com/search/${userSearch}`
            const serverCall = await fetch(searchProductAPI,options)
            const jsonData = await serverCall.json()
            if(jsonData.length ===0 ){
                setApiStatus(apiStatusCalls.failure)
            }
            setProductList(jsonData)
        }
       
    }



   


    const handleClose = closePopup => {
        // Close the popup
        closePopup();
      };

   

    const handleDeleteConfirm=async(id)=>{
    
        const deleteApi = `https://e-com-backend-server-5-hyas.onrender.com/products/${id}`;
        const options = {
            method:"Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        const fetchServer = await fetch(deleteApi,options)
        const jsonData = await fetchServer.json()

        if(fetchServer.ok){
            alert("Record Deleted")
            fetchAppProducts()
        }
      
    }

const lodingView =()=>(
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

const SuccessView=()=>{
    if(productList.length===1){     //  SINGLE PRODUCT TABLE
        return(
            <div className="flex flex-col items-center min-h-[100vh]">
                <div className="bg-slate-100 p-1 mb-3 mt-3 rounded-sm">
                    <input className="w-[30vw]  p-2 outline-none bg-transparent"
                    onChange={userSearchInput}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            userSearchInput();
                        }
                      }}
                    placeholder="Search Product by name,price,catergory,brand"/>
                  
                </div>

                {/* Single Product Table */}

                <div className="overflow-x-auto">
      <table className="w-[90vw] bg-white border border-gray-300">
      <thead>
          <tr >
           
            <th className="py-2 px-2 text-xs border-b
             border-2 border-blue-600 bg-slate-600 text-white text-left font-bold h-10">Name</th>
            <th className="py-2 px-2 text-xs border-b
             border-2 border-blue-600 bg-slate-600 text-white text-left  font-bold h-10">Company</th>
            <th className="py-2 px-2 text-xs border-b
             border-2 border-blue-600 bg-slate-600 text-white text-left  font-bold h-10">Price (In Rupee)</th>
            <th className="py-2 px-2 text-xs border-b
             border-2 border-blue-600 bg-slate-600 text-white text-left font-bold h-10">Operations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left text-xs 
                sm:text-md flex-wrap border-2 bg-slate-300 border-blue-600 font-semibold h-10 pl-3 ">{productList[0].name}</td>
            <td className="text-left text-xs bg-slate-300 sm:text-md border-2 border-blue-600 h-10 pl-3">{productList[0].company}</td>
            <td className="text-left text-xs  bg-slate-300 sm:text-md border-2 border-blue-600 h-10 pl-2 md:w-40">{productList[0].price}</td>

            {/*Single product operations */}
            <td className="text-center bg-slate-300 items-center md:w-40 text-xs sm:text-md border-2 h-10 pl-3 border-blue-600">
                <div className="flex flex-col sm:flex-row lg:w">
               <Link  to={`/update/${productList[0]._id}`} className="w-14 mb-1 mt-1 sm:mt-0 sm:mb-0  bg-slate-400 hover:bg-slate-600 text-white text-xs mr-2 py-1 px-2 rounded ">Edit</Link>
                <Popup
      trigger={    <button className="w-14 mb-1 bg-red-400 hover:bg-red-500 text-white mr-1 text-xs py-2 px-4 rounded " 
     >Delete</button>}
      position="center"
      closeOnDocumentClick={true}
    >
      {close => (
        <div className="p-8 bg-[#dfe9f0] rounded-lg shadow-lg border-blue-600 border-2 lg:mr-0 md:mr-10  mr-40 ">
          <h2 className="sm:text-md text-center font-semibold mb-4 sm:text-md text-sm">Confirm Delete Product</h2>
          <p className='text-xs text-red-500 mt-5 sm:text-sm'>Once Product Deleted You Can Not Retrive It.</p>
          <div className="flex justify-between mt-4">
            <button className="bg-slate-500 lg:w-24 md:w-16 hover:bg-slate-700 text-white p-1 text-sm rounded-md" onClick={() => { handleDeleteConfirm(productList[0]._id) }}>
              Confirm
            </button>
            <button className="bg-red-500 lg:w-24 md:w-16 hover:bg-red-700 text-white p-1 text-sm rounded-md" onClick={() => handleClose(close)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
               </div>
                </td>
          </tr>
          
          
        </tbody>
      </table>
    </div>
            </div>
        )
    }
    else{      //  MULTI PRODUCT TABLE
        return(
            <div className="items-center flex flex-col mt-8 w-screen min-h-[100vh]">
                <div className="bg-slate-100 p-1 mb-3 rounded-sm">
                    <input className="lg:w-[30vw] md:w-[60vw] w-[90vw] p-2 outline-none bg-transparent"
                    onChange={userSearchInput}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            userSearchInput();
                        }
                      }}
                    placeholder="Search Product by name,price,catergory,brand"/>
                   
                </div>

    
    {/* CODE FOR Multiple DEVISE TABLE */}
    <div className="mb-10">
      <table className="w-[90vw] bg-white border border-gray-300">
        <thead >
          <tr>
            <th className="py-2 px-2 text-xs border-b
             border-blue-800 border-2 bg-slate-600 text-white text-left font-bold h-10">Sr</th>
            <th className="py-2 px-2 text-xs border-b
             border-2 border-blue-600 bg-slate-600 text-white text-left font-bold h-10">Name</th>
            <th className="py-2 px-2 text-xs border-b
             border-2 border-blue-600 bg-slate-600 text-white text-left  font-bold h-10">Company</th>
            <th className="py-2 px-2 text-xs border-b
             border-2 border-blue-600 bg-slate-600 text-white text-left  font-bold h-10">Price (In Rupee)</th>
            <th className="py-2 px-2 text-xs border-b
             border-2 border-blue-600 bg-slate-600 text-white text-left font-bold h-10">Operations</th>
          </tr>
        </thead>
        <tbody>
        
          {productList.map((eachProduct,index)=>(
            <tr key={eachProduct._id} className="text-left">
                <td className="text-left bg-slate-300 text-xs sm:text-md border-2 border-blue-600 h-10 pl-3">{index +1 }</td>
                <td className="text-left text-xs 
                sm:text-md flex-wrap border-2 bg-slate-300 border-blue-600 font-semibold h-10 pl-3 ">{eachProduct.name}</td>
                <td className="text-left text-xs bg-slate-300 sm:text-md border-2 border-blue-600 h-10 pl-3">{eachProduct.company}</td>
                <td className="text-left text-xs  bg-slate-300 font-semibold sm:text-md border-2 border-blue-600 h-10 pl-2 md:w-40">
                
                    {eachProduct.price}</td>

                    {/* Operations ROW */ }
                <td className="text-center bg-slate-300 items-center md:w-40 text-xs sm:text-md border-2 h-10 pl-3 border-blue-600">
                <div className="flex flex-col sm:flex-row lg:w">
               <Link  to={`/update/${eachProduct._id}`} className="w-14 mb-1 mt-1 sm:mb-0 text-center bg-slate-400 hover:bg-slate-600 text-white text-xs mr-2 py-1 px-2 rounded ">Edit</Link>
                <Popup
      trigger={    <button className="w-14 mb-1 bg-red-400 hover:bg-red-500 text-white mr-1 text-xs py-2 px-4 rounded " 
     >Delete</button>}
      position="center"
      closeOnDocumentClick={true}
    >
      {close => (
        <div className="p-8 bg-[#dfe9f0] rounded-lg shadow-lg border-blue-600 border-2 lg:mr-0 md:mr-10">
          <h2 className="text-md text-center font-semibold mb-4">Confirm Delete Product</h2>
          <p className='text-sm text-red-500 mt-5'>Once Product Deleted You Can Not Retrive It.</p>
          <div className="flex justify-between mt-4">
            <button className="bg-slate-500 lg:w-24 md:w-16 hover:bg-slate-700 text-white p-1 text-sm rounded-md" onClick={() => { handleDeleteConfirm(eachProduct._id) }}>
              Confirm
            </button>
            <button className="bg-red-500 lg:w-24 md:w-16 hover:bg-red-700 text-white p-1 text-sm rounded-md" onClick={() => handleClose(close)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
               </div>
                </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
    
</div>

           
        )
    }
}

const FailureView=()=>(
    <div className="items-center flex flex-col mt-8 w-screen h-screen">
          <div className="bg-slate-100 p-1 mb-3 mt-3 rounded-sm">
                    <input className="w-[30vw]  p-2 outline-none bg-transparent"
                    onChange={userSearchInput}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            userSearchInput();
                        }
                      }}
                    placeholder="Search Product by name,price,catergory,brand"/>
                  
                </div>
                <Lottie animationData={Noresult} className="size-[40vh]"/>
        <h1 className="font-semibold">No Result found in Database</h1>
    </div>
)

// Different view according to api status

const apiStatusViews=()=>{

    switch(apiStatus){
        case apiStatusCalls.initial:
            return lodingView()
            case apiStatusCalls.success:
                return SuccessView()
                case apiStatusCalls.failure:
                    return FailureView()
                    default :
                    return null
    }
}

    return(
        <div className="w-screen text-center bg-slate-200 h-min">
        {apiStatusViews()}
    </div>
    )
}


export default Products