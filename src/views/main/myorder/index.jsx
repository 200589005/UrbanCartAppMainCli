import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Image, 
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native';

// Sample data structure
const orders = {
  success: true,
  data: [
    {
      productItems: [
        {
          image: "https://i.pinimg.com/736x/78/7e/10/787e1039ac03c715b3640eed85140787.jpg",
          description: "Price: $0.66/ea",
          title: "Tomatoes on the Vine",
          count: 1
        },
        {
          image: "https://i.pinimg.com/736x/e6/36/06/e63606b2e990175629382514d338bcc3.jpg",
          description: "Price: $1.99/ea",
          title: "Iceberg Lettuce",
          count: 2
        },
        {
          image: "https://i.pinimg.com/736x/21/14/9c/21149c4217896398eba60eaea24f3cd5.jpg",
          description: "Price: $7.99/600g",
          title: "Marble Cheddar Cheese",
          count: 4
        }
      ],
      address: {
        streetAddress: "395 Hickling Trail",
        city: "Barrie",
        province: "Ontario",
        postalcode: "N4K5M2"
      },
      _id: "6747c6d91da69066e81839b3",
      date: "2024-11-28T01:26:49.019Z",
      status: "Delivered"
    },
    {
      productItems: [
        {
          image: "https://i.pinimg.com/736x/78/7e/10/787e1039ac03c715b3640eed85140787.jpg",
          description: "Price: $0.66/ea",
          title: "Fresh Tomatoes",
          count: 2
        },
        {
          image: "https://i.pinimg.com/736x/e6/36/06/e63606b2e990175629382514d338bcc3.jpg",
          description: "Price: $1.99/ea",
          title: "Green Lettuce",
          count: 1
        }
      ],
      address: {
        streetAddress: "123 Main Street",
        city: "Toronto",
        province: "Ontario",
        postalcode: "M5V 2T6"
      },
      _id: "6747c6d91da69066e81839b4",
      date: "2024-11-27T01:26:49.019Z",
      status: "Processing"
    }
  ]
};

const MyOrderScreen = () => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#4CAF50';
      case 'processing':
        return '#FFA500';
      case 'cancelled':
        return '#FF0000';
      default:
        return '#666666';
    }
  };

  const calculateOrderTotal = (products) => {
    return products.reduce((total, item) => {
      const price = parseFloat(item.description.match(/\$(\d+\.?\d*)/)[1]);
      return total + (price * item.count);
    }, 0).toFixed(2);
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
        // defaultSource={require('./assets/placeholder.png')} // Add a placeholder image
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
              day: 'numeric'
            })}
          </Text>
          <Text style={styles.orderId}>Order ID: {order._id}</Text>
        </View>
        <Text style={[styles.orderStatus, { color: getStatusColor(order.status) }]}>
          {order.status}
        </Text>
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
{/* 
      <TouchableOpacity style={styles.reorderButton}>
        <Text style={styles.reorderButtonText}>Reorder</Text>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      {orders.data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders found</Text>
        </View>
      ) : (
        <FlatList
          data={orders.data}
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
  reorderButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  }
});

export default MyOrderScreen;