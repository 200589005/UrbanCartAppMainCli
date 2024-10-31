import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import CardComponent from '../../../components/card-componenet/index';
// import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const initialData = [
    {
      id: '1',
      image:
        'https://m.media-amazon.com/images/I/4109t2-iaPL._AC_UF1000,1000_QL80_.jpg',
      title: 'Price: $1.5/lb',
      description: 'Tomato',
    },
    {
      id: '2',
      image:
        'https://www.crimsoncoward.com/wp-content/uploads/2023/05/potatoes-scaled.jpg',
      title: 'Price: $0.75/lb',
      description: 'Potato',
    },
    {
      id: '3',
      image:
        'https://assets.shop.loblaws.ca/products/20768660/b2/en/front/20768660_front_a06_@2.png',
      title: 'Price: $20/lb',
      description: 'Vegetable Oil',
    },
    {
      id: '4',
      image: 'https://m.media-amazon.com/images/I/61uOR7f-7kL.jpg',
      title: 'Price: $4/lb',
      description: 'Vegetable Oil',
    },
  ];

  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadMoreData = useCallback(() => {
    if (isLoading) {return;}

    setIsLoading(true);

    setTimeout(() => {
      const moreData = [
        {
          id: `${data.length + 1}`,
          image:
            'https://m.media-amazon.com/images/I/4109t2-iaPL._AC_UF1000,1000_QL80_.jpg',
          title: 'Price: $1.5/lb',
          description: 'Tomato',
        },
        {
          id: `${data.length + 2}`,
          image:
            'https://www.crimsoncoward.com/wp-content/uploads/2023/05/potatoes-scaled.jpg',
          title: 'Price: $0.75/lb',
          description: 'Potato',
        },
        {
          id: `${data.length + 3}`,
          image:
            'https://assets.shop.loblaws.ca/products/20768660/b2/en/front/20768660_front_a06_@2.png',
          title: 'Price: $20/lb',
          description: 'Vegetable Oil',
        },
        {
          id: `${data.length + 4}`,
          image: 'https://m.media-amazon.com/images/I/61uOR7f-7kL.jpg',
          title: 'Price: $4/lb',
          description: 'Vegetable Oil',
        },
      ];
      setData([...data, ...moreData]);
      setIsLoading(false);
    }, 1500);
  }, [data, isLoading]);

  const addToCartAction = (item) => {
    setCart([...cart, item]);
    dispatch(addToCart(item));
    console.log('Item added to cart:', item);
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  console.log(cartItems);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>UrbanCart</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-cart" size={30} color="black" />
            {/* <Ionicons name="cart" size={30} color="black" /> */}
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TextInput style={styles.searchBar} placeholder="Search products..." />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CardComponent item={item} addToCart={addToCartAction} />
          // <TouchableOpacity
          //   style={styles.productItem}
          //   // onPress={() => navigation.navigate('ProductDetail', { product: item })}
          // >
          //   <Image source={{ uri: item.image }} style={styles.productImage} />
          //   <Text style={styles.productName}>{item.title}</Text>
          // </TouchableOpacity>
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading && <ActivityIndicator size="large" color="#0000ff" />
        }
      />
    </View>
  );
};

export default HomePage;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 14,
    color: '#666',
  },
  icons: {
    flexDirection: 'row',
  },
  searchBar: {
    margin: 16,
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
  },
  productItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    borderRadius: 4,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
  },
});
