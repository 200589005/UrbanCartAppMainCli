import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ApiService from '../../../utils/apiservice';
import { useFocusEffect } from '@react-navigation/native';

const MyOrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchOrders = async () => {
        setIsLoading(true);
        try {
          const response = await ApiService.getOrders();
          setOrders(response.data); // Assuming response structure has `data`
        } catch (err) {
          setError('Failed to fetch orders');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchOrders();
    }, [])
  );
  

  // const getStatusColor = (status) => {
  //   switch (status.toLowerCase()) {
  //     case 'delivered':
  //       return '#4CAF50';
  //     case 'processing':
  //       return '#FFA500';
  //     case 'cancelled':
  //       return '#FF0000';
  //     default:
  //       return '#666666';
  //   }
  // };

  const calculateOrderTotal = (products) => {
    return products.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price * item.count;
    }, 0).toFixed(2);
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.quantity}>Quantity: {item.count}</Text>
      </View>
    </View>
  );

  const renderOrderCard = ({ item: order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderDate}>
            Ordered on {new Date(order.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text style={styles.orderId}>Order ID: {order._id}</Text>
        </View>
        {/* <Text style={[styles.orderStatus, { color: getStatusColor(order.status) }]}>
          {order.status}
        </Text> */}
      </View>

      <FlatList
        data={order.productItems}
        keyExtractor={(item, index) => `${order._id}-${index}`}
        renderItem={renderProductItem}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Order Total: ${calculateOrderTotal(order.productItems)}
        </Text>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Delivery Address:</Text>
        <Text style={styles.addressText}>
          {order.address.streetAddress}{'\n'}
          {order.address.city}, {order.address.province}{'\n'}
          {order.address.postalcode}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      {isLoading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Loading orders...</Text>
        </View>
      ) : error ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders found</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderCard}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  contentContainer: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderId: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  productItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 12,
    marginTop: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  addressContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default MyOrderScreen;
