import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../../../redux/slices/cartSlice';

const CartScreen = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    console.log('Incrementing quantity for item:', item.id);
    dispatch(increaseQuantity(item));
  };

  const handleDecrement = (item) => {
    console.log('Decrementing quantity for item:', item.id);
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item));
    } else {
      dispatch(removeFromCart(item));  // Optionally remove item if quantity is 1 and decremented
    }
  };

  const clearCartItems = () => {
    dispatch(clearCart());
    navigation.navigate('Home')
    // navigation.replace('home');
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigation.replace('Checkout');
    } else {
      Alert.alert('Your cart is empty', 'Please add items to your cart before proceeding to checkout.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.noItemsText}>No items available</Text>
      ) : (
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>{item.description}</Text>
              <View style={styles.productDetails}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleDecrement(item)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.productQuantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleIncrement(item)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      )}
      {cartItems.length > 0 && (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearCartItems}>
          <Text style={styles.buttonText}>Clear Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreacontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 20,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    color: '#1e90ff',
    marginHorizontal: 10,
  },
  productQuantity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 0.45,
  },
  checkoutButton: {
    backgroundColor: '#32cd32',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 0.45,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  noItemsText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});

export default CartScreen;
