import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2, Pencil } from "lucide-react";
import PBLogo from "../asserts/PBLogo.png";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ name: "", price: "", quantity: "" });
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch products from the DB
    const fetchProducts = async () => {
        try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        } catch (error) {
        console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Method to delete existing products
    const handleDelete = async (id) => {
        try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        Swal.fire({
            title: "Deleted!",
            text: "Product successfully deleted!",
            icon: "success",
            confirmButtonText: "Okay",
            customClass: {
                confirmButton: 'w-[400px] bg-yellow-600 hover:bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300'
            },
            buttonsStyling: false,
        });
        fetchProducts();
        } catch (err) {
        Swal.fire({
            title: "Error!",
            text: "Failed to delete product!",
            icon: "error",
            confirmButtonText: "Try Again",
            customClass: {
                confirmButton: 'w-[400px] bg-red-600 hover:bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300'
            },
            buttonsStyling: false,
        });
        }
    };

    // Method to start the edit function
    const startEdit = (product) => {
        setEditingId(product._id);
        setEditData({ name: product.name, price: product.price, quantity: product.quantity });
    };

    // Handle updating the product
    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // Save the updated product in the DB
    const saveEdit = async (id) => {
        try {
        await axios.put(`http://localhost:5000/api/products/${id}`, {
            name: editData.name,
            price: Number(editData.price),
            quantity: Number(editData.quantity),
        });
        Swal.fire({
            title: "Updated!",
            text: "Product successfully updated!",
            icon: "success",
            confirmButtonText: "Okay",
            customClass: {
                confirmButton: 'w-[400px] bg-yellow-600 hover:bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300'
            },
            buttonsStyling: false,
        });
        setEditingId(null);
        fetchProducts();
        } catch (error) {
        Swal.fire({
            title: "Error!",
            text: "Failed to update product!",
            icon: "error",
            confirmButtonText: "Try Again",
            customClass: {
                confirmButton: 'w-[400px] bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
            },
            buttonsStyling: false,
        });
        }
    };

    // Method for the product searching
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[url('https://res.cloudinary.com/fmart/image/upload/v1743648804/BGImage02_hzx5in.png')] bg-cover bg-center bg-no-repeat">
            <div className="pt-20 max-w-6xl mx-auto mt-10 p-4 ">
                {/* Company name header */}
                <div className="flex items-center justify-center text-center">
                    <img src={PBLogo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0" />
                    <div className="sm:ml-2">
                        <h1 className="font-roboto text-3xl sm:text-5xl font-bold text-yellow-600">PRODUCT BLOG</h1>
                        <h5 className="font-roboto text-[0.5rem] sm:text-[0.7rem] font-bold text-black tracking-[0.5em] sm:tracking-[0.65em]">SMART PRODUCT MANAGEMENT</h5>
                    </div>
                </div>
                {/* sub header */}
                <div className="flex items-center justify-center my-6">
                    <div className="flex-grow border-t border-yellow-600 mb-4"></div>
                    <h2 className="font-roboto text 1xl sm:text-2xl font-bold text-center mb-4 mx-4 tracking-widest">AVAILABLE PRODUCTS</h2>
                    <div className="flex-grow border-t border-yellow-600 mb-4"></div>
                </div>

                {/* Search Feild */}
                <div className="flex justify-center mb-6 shadow-sm">
                    <input
                        type="text"
                        placeholder="Search Products..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Display products */}
                {filteredProducts.map(product => (
                    <div
                    key={product._id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mb-4"
                    >
                    {editingId === product._id ? (
                        <div className="w-full flex flex-col space-y-2">
                        <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleEditChange}
                            className="border rounded p-1"
                            placeholder="Product Name"
                        />
                        <input
                            type="number"
                            name="price"
                            value={editData.price}
                            onChange={handleEditChange}
                            className="border rounded p-1"
                            placeholder="Price"
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={editData.quantity}
                            onChange={handleEditChange}
                            className="border rounded p-1"
                            placeholder="Quantity"
                        />
                        <div className="flex space-x-2">
                            <button
                            onClick={() => saveEdit(product._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800 font-bold"
                            >
                            Submit
                            </button>
                            <button
                            onClick={() => setEditingId(null)}
                            className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600 font-bold"
                            >
                            Cancel
                            </button>
                        </div>
                        </div>
                    ) : (
                        <>
                        {/* Left: Info */}
                        <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                            <p className="text-yellow-600 font-semibold">Rs. {product.price}</p>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex space-x-4 items-center">
                            <button
                            onClick={() => startEdit(product)}
                            className="text-blue-500 hover:text-blue-700"
                            >
                            <Pencil size={20} />
                            </button>
                            <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-600"
                            >
                            <Trash2 size={20} />
                            </button>
                        </div>
                        </>
                    )}
                    </div>
                ))}<br/><br/>
            </div>
        </div>
    );
};

export default ProductList;
