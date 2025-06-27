import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import PBLogo from "../asserts/PBLogo.png";
import Swal from "sweetalert2";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const isAuthPage = currentPath === "/login" || currentPath === "/register";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Avoid redirect if on login or register page
    if (!token && !isAuthPage) {
      navigate("/login");
      return;
    }

    // Function to fetch user details 
    const fetchUserDetails = async () => {
      try {
        if (!token) return;
        const res = await axios.get("http://localhost:5000/api/auth/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (token && !user) {
      fetchUserDetails();
    }
  }, [navigate, currentPath, isAuthPage, user]);

  // Function to handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Logout!",
      text: "Do you need to logout?",
      icon: "question",
      confirmButtonText: "Yes. Logout!",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "w-[400px] bg-yellow-600 hover:bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300",
        cancelButton:
          "w-[400px] bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
      }
    });
  };

  if (isLoggedIn === null) return null;

  return (
    <nav className="bg-black fixed top-0 left-0 right-0 z-50 text-white p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="https://res.cloudinary.com/fmart/image/upload/v1745471470/CountryHubLogo_xpgvql.png" className="flex items-center">
          <img src={PBLogo} alt="Logo" className="w-12 h-12 mr-2" />
          <div>
            <span className="text-1xl sm:text-2xl font-bold">
              PRODUCT <span className="text-yellow-600">BLOG</span>
            </span>
            {/* Display logged user name */}
            {user?.name && !isAuthPage && (
              <div className="text-sm font-semibold">
                Welcome back, {user.name}👋
              </div>
            )}
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-5">
          {isAuthPage ? (
            <>
              <Link
                to="/register"
                className={`font-bold p-3 rounded-lg transition duration-300 ${
                  currentPath === "/register"
                    ? "bg-yellow-600 text-white"
                    : "hover:bg-yellow-900"
                }`}
              >
                SIGN UP
              </Link>
              <Link
                to="/login"
                className={`font-bold p-3 rounded-lg transition duration-300 ${
                  currentPath === "/login"
                    ? "bg-yellow-600 text-white"
                    : "hover:bg-yellow-900"
                }`}
              >
                LOGIN
              </Link>
            </>
          ) : isLoggedIn ? (
            <>
              <Link
                to="/products"
                className={`font-bold p-3 rounded-lg transition duration-300 ${
                  currentPath === "/products"
                    ? "bg-yellow-600 text-white"
                    : "hover:bg-yellow-900"
                }`}
              >
                PRODUCTS
              </Link>
              <Link
                to="/add-product"
                className={`font-bold p-3 rounded-lg transition duration-300 ${
                  currentPath === "/add-product"
                    ? "bg-yellow-600 text-white"
                    : "hover:bg-yellow-900"
                }`}
              >
                ADD NEW
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:bg-red-600 font-bold bg-black rounded-lg shadow p-3 transition duration-300"
              >
                LOGOUT
                <FiLogOut size={18} />
              </button>
            </>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white p-4 flex flex-col space-y-2 text-center">
          {isAuthPage ? (
            <>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className={`font-bold p-3 rounded-lg transition duration-300 ${
                  currentPath === "/register"
                    ? "bg-yellow-600 text-white"
                    : "hover:bg-yellow-900"
                }`}
              >
                SIGN UP
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`font-bold p-3 rounded-lg transition duration-300 ${
                  currentPath === "/login"
                    ? "bg-yellow-600 text-white"
                    : "hover:bg-yellow-900"
                }`}
              >
                LOGIN
              </Link>
            </>
          ) : isLoggedIn ? (
            <>
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className={`font-bold p-3 rounded-lg transition duration-300 ${
                  currentPath === "/products"
                    ? "bg-yellow-600 text-white"
                    : "hover:bg-yellow-900"
                }`}
              >
                PRODUCTS
              </Link>
              <Link
                to="/add-product"
                onClick={() => setIsOpen(false)}
                className={`font-bold p-3 rounded-lg transition duration-300 ${
                  currentPath === "/add-product"
                    ? "bg-yellow-600 text-white"
                    : "hover:bg-yellow-900"
                }`}
              >
                ADD NEW
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex justify-center items-center gap-2 hover:bg-red-600 font-bold bg-black p-3 rounded-lg shadow transition duration-300"
              >
                LOGOUT
                <FiLogOut size={18} />
              </button>
            </>
          ) : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
