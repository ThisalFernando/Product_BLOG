import axios from "axios";

const API_URL = "http://localhost:5000/api";  // Adjust the API URL as necessary

// Login the user
export const loginUser = async (formData) => {
  return await axios.post(`${API_URL}/auth/login`, formData);
};

// Register the user
export const registerUser = async (formData) => {
  return await axios.post(`${API_URL}/auth//register`, formData);
};
