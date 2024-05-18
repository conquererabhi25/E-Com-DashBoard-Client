import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUpPage() {
  // State to hold user input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isShowPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Following functionality is used to avoid display of sign up page when user is already signed up.

  const authorization = localStorage.getItem("userDetails");

  // State to hold list of signed up users
  const [userList, setUserList] = useState([]);

  const toggleShowPass = () => {
    setShowPassword(!isShowPassword);
  };

  // Handler for input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler for sign-up button click
  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const signupUrl = "https://e-com-backend-server-5-hyas.onrender.com/signup";
      const options = {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const signUpResult = await fetch(signupUrl, options);

      if (!signUpResult.ok) {
        throw new Error("Failed to sign up"); // Throw an error if response status is not OK
      }

      const jsonData = await signUpResult.json();

      // Check if jsonData is true, then navigate to "/"
      if (signUpResult.ok) {
        navigate("/login"); // This hook is used to navigate between pages.
      }

      // Here we are saving user data on local storage. You can check it on inspect==> application ==> local Storage

      // localStorage.setItem("userDetails",JSON.stringify(jsonData))
      // localStorage.setItem("token",JSON.stringify(jsonData.auth))

      // Optional: Update UI or perform actions based on response data
    } catch (error) {
      console.error("Error:", error.message);
      // Optional: Handle error, show error message to the user, etc.
    } finally {
      // Optional: Reset form after sign-up
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  console.log(userList);

  return (
    <div className="min-h-screen  w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={isShowPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="mt-3">
                <input
                  type="checkbox"
                  id="show-password"
                  className="cursor-pointer"
                  onChange={toggleShowPass}
                />
                <label
                  htmlFor="show-password"
                  className="text-sm ml-2 text-gray-600 cursor-pointer"
                >
                  Display Password
                </label>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </div>
        </form>
        <p>
          If you have already created your account then click on{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-800 underline font-semibold"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
