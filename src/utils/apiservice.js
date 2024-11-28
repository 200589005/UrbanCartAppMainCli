import axios from 'axios';
import auth from '@react-native-firebase/auth'; // Ensure you have Firebase configured

// Base URL for the API
const API_BASE_URL = "https://urbancartnodejs.onrender.com/api";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to set Authorization header dynamically
const setAuthHeader = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      api.defaults.headers.Authorization = `Bearer ${idToken}`;
    } else {
      console.error("No user is signed in.");
    }
  } catch (error) {
    console.error("Error setting auth header:", error);
  }
};

// API methods
const ApiService = {
  getAllProducts: async () => {
    await setAuthHeader();
    try {
      const response = await api.get('/product/getAllProducts');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  orderItems: async (orderDetails) => {
    await setAuthHeader();
    try {
      const response = await api.post('/product/orderItems', orderDetails);
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  },

  getOrders: async () => {
    await setAuthHeader();
    try {
      const response = await api.get('/product/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
};

export default ApiService;
