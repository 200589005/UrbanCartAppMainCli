import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView } from 'react-native';

const orders = [
  {
    id: '1',
    image: 'https://m.media-amazon.com/images/I/4109t2-iaPL._AC_UF1000,1000_QL80_.jpg',
    title: 'Tomato',
    description: 'Price: $1.5/lb',
    orderDate: '2024-08-11',
    orderStatus: 'Delivered',
  },
];

const MyOrderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {orders.length === 0 ? (
          <Text style={styles.noItemsText}>No orders available</Text>
        ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.order}>
              <Image source={{ uri: item.image }} style={styles.orderImage} />
              <View style={styles.orderInfo}>
                <Text style={styles.orderTitle}>{item.title}</Text>
                <Text style={styles.orderDescription}>{item.description}</Text>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderDate}>Date: {item.orderDate}</Text>
                  <Text style={styles.orderStatus}>{item.orderStatus}</Text>
                </View>
              </View>
            </View>
          )}
        />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  order: {
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
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 20,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  orderDescription: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 14,
    color: '#555',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#32cd32',
  },
  noItemsText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});

export default MyOrderScreen;
