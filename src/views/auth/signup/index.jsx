import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { signup } from '../../../utils/firbase';

const SignUp = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignUp = async () => {
    // if (!fullName || !mobileNumber || !email || !password || !confirmPassword) {
    //   Alert.alert('Error', 'All fields are required');
    //   return;
    // }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters long');
      return;
    }
    const res = await signup(email, password);
    if(!res.status) {
      Alert.alert('Error',res.message);
    } else {
      navigation.replace('Auth');
    }

  };

  const handleSignIn = () => {
    // router.push("/");
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/appIcon.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#ccc"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#ccc"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          /> */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c669f',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 25,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  signUpButtonText: {
    color: '#4c669f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
