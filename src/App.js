import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./components/AProducts";
import AddProduct from "./components/BAddProduct";
import UpdateProducts from "./components/CUpdateProducts";
import Profile from "./components/Profile";
import SignUpPage from "./components/SignUp";
import { BrowserRouter, Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <div className="h-screen flex flex-col">
      <BrowserRouter>
      <NavBar/>
   <Routes>

    <Route element={<ProtectedRoute/>}>
    <Route path="/" element={<Products/>}/>
    <Route path="/add" element={<AddProduct/>}/>
    <Route path="/update/:id" element={<UpdateProducts/>}/>
    <Route path="/profile" element={<Profile/>}/>
   </Route>

    <Route path="/signup" element={<SignUpPage/>}/>
    <Route path="/login" element={<Login/>}/>
   </Routes>
     
     </BrowserRouter>
     
    </div>
  );
}

export default App;
