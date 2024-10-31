import AsyncStorage from '@react-native-async-storage/async-storage';

// Save token
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Retrieve token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      console.log('Retrieved user token:', token);
      return token;
    } else {
      console.log('No token found');
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
  }
};

// Clear token (for logout)
export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    console.log('Token cleared');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};
