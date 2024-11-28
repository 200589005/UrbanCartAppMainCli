import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { clearCart } from '../../redux/slices/cartSlice';
import ApiService from '../../utils/apiservice';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const formatPostalCode = (code) => {
    const cleaned = code.replace(/[^A-Za-z0-9]/g, '');
    if (cleaned.length <= 3) return cleaned;
    return cleaned.slice(0, 3) + ' ' + cleaned.slice(3, 6);
  };

  const handlePostalCodeChange = (code) => {
    setPostalCode(formatPostalCode(code));
  };

  const validatePostalCode = (code) => {
    const regex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    return regex.test(code);
  };

  const validateFields = () => {
    if (!streetAddress || !city || !province || !postalCode) {
      Alert.alert('Incomplete Information', 'Please fill in all fields.');
      return false;
    }
    if (!validatePostalCode(postalCode)) {
      Alert.alert('Invalid Postal Code', 'Please enter a valid Canadian postal code.');
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (validateFields()) {
      const orderDetails = {
        address: {
          streetAddress,
          city,
          province,
          postalcode: postalCode,
        },
        productItems: cartItems.map((item) => ({
          title: item.title,
          count: item.quantity,
          description: item.description,
          image: item.image,
          price: item.price,
        })),
      };

      try {
        const response = await ApiService.orderItems(orderDetails);

        if (response.success) {
          Alert.alert('Order Successful', 'Your order has been placed!');
          dispatch(clearCart());
          navigation.replace('Success'); // Navigate to success screen
        } else {
          Alert.alert('Order Failed', 'Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Error placing order:', error);
        Alert.alert('Order Failed', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Street Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="123 Main St"
        value={streetAddress}
        onChangeText={setStreetAddress}
      />

      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        placeholder="Toronto"
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Province:</Text>
      <TextInput
        style={styles.input}
        placeholder="ON"
        value={province}
        onChangeText={setProvince}
      />

      <Text style={styles.label}>Postal Code:</Text>
      <TextInput
        style={styles.input}
        placeholder="A1A 1A1"
        value={postalCode}
        onChangeText={handlePostalCodeChange}
      />

      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
