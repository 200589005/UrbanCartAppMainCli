import React from 'react';
import { Alert } from 'react-native';
import './gesture-handler';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/views/auth/splash/index';
import LoginScreen from './src/views/auth/login/index';
import SignupScreen from './src/views/auth/signup/index';
import ForgotPasswordScreen from './src/views/auth/forgotpassword/index';
import HomeScreen from './src/views/main/home/index';
import CartScreen from './src/views/main/cart/index';
import ProfileScreen from './src/views/main/profile/index';
import MyOrderScreen from './src/views/main/myorder/index';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import SettingsScreen from './src/views/main/settings/index';
import CheckoutScreen from './src/views/checkout/index';
import CheckoutSuccessScreen from './src/views/checkout/success';
import { logout } from './src/utils/firbase';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack for Authentication (Login, Signup, Forgot Password)
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Custom Drawer Component
function CustomDrawerContent(props: any) {
  const { navigation } = props;

  // Logout function with confirmation
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // Add your logout logic here, e.g. clearing AsyncStorage or Redux store
            navigation.replace('Auth'); // Redirect to Login screen
          },
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Default drawer items */}
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        label="Cart"
        onPress={() => navigation.navigate('Cart')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <DrawerItem
        label="My Orders"
        onPress={() => navigation.navigate('My Orders')}
      />
      <DrawerItem
        label="Settings"
        onPress={() => navigation.navigate('Settings')}
      />

      {/* Add a Logout button */}
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        style={{ marginTop: 'auto' }} // Move the button to the bottom
      />
    </DrawerContentScrollView>
  );
}

// Drawer Navigation for the main app
function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="My Orders" component={MyOrderScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />

                {/* Authentication Stack */}
                <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />

                {/* Drawer Navigation */}
                <Stack.Screen name="AppDrawer" component={AppDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="Checkout" component={CheckoutScreen}  />
                <Stack.Screen name="Success" component={CheckoutSuccessScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}
