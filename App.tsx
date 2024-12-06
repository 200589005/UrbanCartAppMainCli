import React, { useEffect, useState } from 'react';
import {Text, Alert, ActivityIndicator, View,  StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
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
import auth, { FirebaseAuthTypes }from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or any other icon library
import AboutUs from './src/views/main/settings/aboutus';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack for Authentication (Login, Signup, Forgot Password)
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Custom Drawer Component
function CustomDrawerContent(props: any) {

  const { navigation} = props;
  console.log(JSON.stringify(props));
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
            navigation.replace('Auth'); // Redirect to Login screen
          },
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Home" onPress={() => navigation.navigate('Home')} />
      <DrawerItem label="Cart" onPress={() => navigation.navigate('Cart')} />
      <DrawerItem label="Profile" onPress={() => navigation.navigate('Profile')} />
      <DrawerItem label="My Orders" onPress={() => navigation.navigate('My Orders')} />
      <DrawerItem label="Settings" onPress={() => navigation.navigate('Settings')} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        style={{ marginTop: 'auto' }}
      />
    </DrawerContentScrollView>
  );
}

// Drawer Navigation for the main app
function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="My Orders" component={MyOrderScreen} />
      <Drawer.Screen name="Settings" component={SettingScreen}  options={{ headerShown: false }}  />
    </Drawer.Navigator>
  );
}


const CustomDrawerHeader = ({ title, navigation }: {title: string; navigation: any}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={24} color="#488CF7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </SafeAreaView>

  );
};
const SettingsStack = createStackNavigator();
const SettingScreen = () => {
  return (
    <SettingsStack.Navigator >
      {/* Main Settings Screen */}
      <SettingsStack.Screen
        name="MainSettings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          header: () => <CustomDrawerHeader title="Settings" navigation={navigation} />,
        })}
      />

      {/* About Us Child Screen */}
      <SettingsStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={({ navigation }) => ({
          // headerTitle: 'Checkout',
          headerBackTitle: 'Back',
          headerLeft: () => (
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" size={24} color="#488CF7" />
            </TouchableOpacity>
          ),
        })}
      />

      <SettingsStack.Screen
        name="Terms&Conditions"
        component={AboutUs}
        options={({ navigation }) => ({
          headerTitle: 'Terms & Conditions',
          headerBackTitle: 'Back',
          headerLeft: () => (
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" size={24} color="#488CF7" />
            </TouchableOpacity>
          ),
        })}
      />
      <SettingsStack.Screen
        name="PrivacyPolicy"
        component={AboutUs}
        options={({ navigation }) => ({
          headerTitle: 'PrivacyPolicy',
          headerBackTitle: 'Back',
          headerLeft: () => (
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" size={24} color="#488CF7" />
            </TouchableOpacity>
          ),
        })}
      />

    </SettingsStack.Navigator>
  );
};

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null); // Explicit type


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          // Get the token
          const token = await user.getIdToken(true);
          console.log('Firebase ID Token:', token);

          // Get the decoded token result
          // const decodedToken = await user.getIdTokenResult();
          // console.log('Decoded Token Claims:', decodedToken.claims);

          // // Log user details
          // console.log('User UID:', user.uid);
          // console.log('User Email:', user.email);
          // console.log('User Phone:', user.phoneNumber);
          // console.log('User Display Name:', user.displayName);
        } catch (error) {
          console.error('Error getting token:', error);
        }
      }
      setInitializing(false);
    });
    return subscriber;
  }, []);

  // Optional: Refresh token periodically
  useEffect(() => {
    if (user) {
      const tokenRefreshInterval = setInterval(async () => {
        try {
          const newToken = await user.getIdToken(true);
          console.log('Refreshed Token:', newToken);
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      }, 3600000); // Refresh every hour

      return () => clearInterval(tokenRefreshInterval);
    }
  }, [user]);


  if (initializing) {
    // Show a loading indicator while checking auth state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  const idToken = user?.getIdToken();
  console.log('user: ', user);
  console.log('idToken: ', idToken);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? 'AppDrawer' : 'Auth'}>
          {/* Splash Screen */}
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />

          {/* Authentication Stack */}
          <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />

          {/* Drawer Navigation */}
          <Stack.Screen name="AppDrawer" component={AppDrawer} options={{ headerShown: false }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen}
            options={({ navigation }) => ({
              headerTitle: 'Checkout',
              headerBackTitle: 'Back',
              headerLeft: () => (
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back-ios" size={24} color="#488CF7" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Success" component={CheckoutSuccessScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 45,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  heder_button: {
    padding: 8,
  },
});

