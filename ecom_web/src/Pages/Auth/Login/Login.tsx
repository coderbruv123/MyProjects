import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import {jwtDecode} from "jwt-decode"; // FIXED: import default

const Login = () => {
  const navigate = useNavigate(); 

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    console.log(credentials);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credentials);
    try {
      const res = await axios.post(
        "https://localhost:7032/api/Auth/login",
        {
          name: "", 
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const token = res.data;
      localStorage.setItem("user", token); 

      type DecodedToken = {
        [key: string]: string;
      };
      const decoded = jwtDecode<DecodedToken>(token);

      const info = {
        id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };

      localStorage.setItem("info", JSON.stringify(info));

      console.log(info);

      navigate("/");

    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.error("Error message: ", error.message);
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };


return (
  <div className="flex items-center justify-center  ">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <input
          onChange={handleChange}
          name="email"
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="px-6 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
      <div className=" mt-4  block text-center">

      <p className="text-gray-700">Don't have an account?</p>
      <Link className="hover:underline text-blue-500" to="/Auth/Register" >
         Register here</Link>
      </div>
    </div>
  </div>
);

};
export default Login;