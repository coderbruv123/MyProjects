import { useState } from "react";
import  axios from "axios";
import { useNavigate } from "react-router-dom"; 

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
            "Accept": "application/json",
          },
        }
      );
      
      console.log(res.data);
            localStorage.setItem("token", res.data);
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
    <div className="flex flex-col items-center">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 py-4">
          <input onChange={handleChange} name="email" type="text" className="bg-white text-black" placeholder="email" />
          <input onChange={handleChange} type="password" name="password" className="bg-white text-black" placeholder="password" />
        </div>
        <button type="submit" className="bg-blue-600 px-3">Submit</button>
      </form>
    </div>
  );
};
export default Login;