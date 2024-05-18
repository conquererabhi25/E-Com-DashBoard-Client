import {faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React ,{useEffect,useState}from "react"
import {Link,useNavigate} from "react-router-dom"
import Popup from 'reactjs-popup';


const NavBar =()=>{
    const [userName,setUserName] = useState("")
    const  authorization = localStorage.getItem("userDetails")
    const navigate = useNavigate()
    const logOutUser =()=>{
        localStorage.clear()
        navigate("/login")
    }
   
  
       
    useEffect(()=>{
        const userinfo =localStorage.getItem("userDetails")
        if(userinfo != null){
            setUserName(JSON.parse(userinfo).userdata.name)
            // console.log(JSON.parse(userinfo).userdata.name)
        }
       
    })

    

    return(
        <div className="flex w-screen justify-between p-3 bg-slate-700">
   
        <Link to="/"  className="m-2 text-red-400 font-bold sm:text-xl text-sm">E-Commerse Dashboard</Link>
        {authorization ? ( <ul className="flex text-white sm:mr-14 ">
            <li className="m-2"> 
                <Link to="/" className="font-semibold sm:text-[15px] text-xs">Products</Link>
            </li>
            <li className="m-2">
                <Link to="/add" className="font-semibold sm:text-[15px] text-xs">Add Products</Link>
            </li>
          
            <li className="m-2">
            
                <Popup
      trigger={   <button type="button" className="font-semibold sm:text-[15px] text-sm">Profile</button>}
      position="center"
      closeOnDocumentClick={true}
    >
      {close => (
        <div className="p-8 bg-[#dfe9f0] rounded-lg shadow-lg border-blue-600 border-2 mt-56 mr-40 items-center flex flex-col">
         <img src="https://pic.onlinewebfonts.com/thumbnails/icons_107378.svg" alt="user"/>
        <p className="font-semibold text-sm sm:text-md">{userName}</p>
          <button className="m-2 bg-red-600 w-24  rounded-md ">
            <Link to="/login" onClick={logOutUser} className=" text-white text-center">
                <FontAwesomeIcon icon={faSignOut} className="mr-1"/>  
                Logout</Link>
            </button>
        </div>
      )}
    </Popup>
            </li>
            
           
        </ul>):(
            <ul className="flex">
            <li className="m-2 bg-green-600 sm:w-20 w-12 text-center rounded-md text-white">
             
             <Link to="/signup" className="font-semibold sm:text-sm text-xs">Sign Up</Link>
         </li>
         <li className="m-2 bg-green-600 sm:w-20 w-12 text-center rounded-md text-white">
             
             <Link to="/login" className="font-semibold sm:text-sm text-xs">Login</Link>
         </li>
         </ul>
        ) }
       
    </div>
    )
}


export default NavBar