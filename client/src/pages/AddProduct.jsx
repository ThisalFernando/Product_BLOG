// src/pages/AddProduct.jsx
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import PBLogo from "../asserts/PBLogo.png";

// Method to add new products in the DB
const AddProduct = () => {
    document.title = "PRODUCT BLOG | Add Product";
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        price: "",
        quantity: "",
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    // Handle the submission of the products
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post("http://localhost:5000/api/products", form);
        Swal.fire({
            title: "Success!",
            text: "Product successfully added!",
            icon: "success",
            confirmButtonText: "Okay!",
            customClass: {
                confirmButton: 'w-[200px] sm:w-[400px] bg-yellow-600 hover:bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300'
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
            navigate("/products"); 
            }
        });
        setForm({ name: "", price: "", quantity: "" });
        } catch (err) {
        Swal.fire({
            title: "Error!",
            text: "Failed to add product!",
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
        <div className="bg-[url('https://res.cloudinary.com/fmart/image/upload/v1743648804/BGImage02_hzx5in.png')] bg-cover bg-center bg-no-repeat">
            <div className="pt-20 max-w-6xl mx-auto mt-10 p-4">
                {/* Company name header */}
                <div className="flex items-center justify-center text-center">
                    <img src={PBLogo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0" />
                    <div className="sm:ml-2">
                        <h1 className="font-roboto text-3xl sm:text-5xl font-bold text-yellow-600">PRODUCT BLOG</h1>
                        <h5 className="font-roboto text-[0.5rem] sm:text-[0.7rem] font-bold text-black tracking-[0.5em] sm:tracking-[0.65em]">SMART PRODUCT MANAGEMENT</h5>
                    </div>
                </div>
                {/* Sub header */}
                <div className="flex items-center justify-center my-6">
                    <div className="flex-grow border-t border-yellow-600 mb-4"></div>
                    <h2 className="font-roboto text-1xl sm:text-2xl font-bold text-center mb-4 mx-4 tracking-widest">ADD NEW PRODUCTS</h2>
                    <div className="flex-grow border-t border-yellow-600 mb-4"></div>
                </div>
                {/* UI for adding products */}
                <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>
                    <hr/><br/>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField label="Name" type="text" name="name" placeholder="Enter Name" value={form.name} onChange={handleChange}/>
                        <InputField label="Price" type="number" name="price" placeholder="Enter Price" value={form.price} onChange={handleChange}/>
                        <InputField label="Quantity" type="number" name="quantity" placeholder="Enter Quantity" value={form.quantity} onChange={handleChange}/><br/>
                        <Button text="Submit Product" type="submit" />
                    </form>
                </div><br/><br/>
            </div>
        </div>
    );
};

export default AddProduct;
