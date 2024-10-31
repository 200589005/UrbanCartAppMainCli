import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CheckoutSuccessScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://img.icons8.com/fluency/96/000000/checked.png' }}
        style={styles.successIcon}
      />
      <Text style={styles.successText}>Thank you for your purchase!</Text>
      <Text style={styles.message}>Your order has been placed successfully.</Text>
      <Button title="Go to Home" onPress={() => navigation.replace('AppDrawer')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
});

export default CheckoutSuccessScreen;
