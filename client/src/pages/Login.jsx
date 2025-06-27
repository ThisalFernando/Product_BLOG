import { useState } from "react";
import { loginUser } from "../api/api";  // Assuming loginUser handles the API call
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Swal from "sweetalert2";

const Login = () => {
  document.title = "PRODUCT BLOG | Login";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit user credentials to login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);  // Send login request
      localStorage.setItem("token", res.data.token);  // Save the token in localStorage

      Swal.fire({
        title: "Success!",
        text: "Login successful!",
        icon: "success",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: 'w-[200px] sm:w-[400px] bg-yellow-600 hover:bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300'
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/products"); 
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Invalid credentials!",
        icon: "error",
        confirmButtonText: "Try Again!",
        customClass: {
          confirmButton: 'w-[200px] sm:w-[400px] bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://res.cloudinary.com/fmart/image/upload/v1750896916/diminishing-perspective-old-archive-shelves-glow-generated-by-ai_xlmccb.jpg')] bg-cover bg-center bg-no-repeat pt-20 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-90 sm:w-[500px]">
        <h2 className="text-2xl font-bold text-center mb-6">USER LOGIN</h2>
        <hr/><br/>
        <form onSubmit={handleSubmit}>
          <InputField label="Email" type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
          <InputField label="Password" type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
          <Button text="Login" type="submit" />
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-yellow-600 hover:text-black">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;